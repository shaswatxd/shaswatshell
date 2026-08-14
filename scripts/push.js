import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Load .env.local to get GITHUB_TOKEN if not set in system env
function loadEnv() {
  try {
    const envPath = resolve(rootDir, '.env.local');
    if (!existsSync(envPath)) return;
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val.trim();
      }
    }
  } catch {
    // .env.local not found, continue without it
  }
}

loadEnv();

// Automatic semantic patch version bumper
function bumpVersion() {
  try {
    const pkgPath = resolve(rootDir, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const currentVersion = pkg.version || '0.0.0';
    const parts = currentVersion.split('.').map(num => parseInt(num, 10) || 0);
    
    while (parts.length < 3) parts.push(0);
    parts[2] += 1; // Increment patch version
    
    const newVersion = parts.join('.');
    pkg.version = newVersion;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');

    // Also update package-lock.json version if present
    try {
      const pkgLockPath = resolve(rootDir, 'package-lock.json');
      if (existsSync(pkgLockPath)) {
        const pkgLock = JSON.parse(readFileSync(pkgLockPath, 'utf-8'));
        pkgLock.version = newVersion;
        if (pkgLock.packages && pkgLock.packages['']) {
          pkgLock.packages[''].version = newVersion;
        }
        writeFileSync(pkgLockPath, JSON.stringify(pkgLock, null, 2) + '\n', 'utf-8');
      }
    } catch {
      // Ignore package-lock errors
    }

    console.log(`🏷️ Bumped version: v${currentVersion} ➔ v${newVersion}`);
    return newVersion;
  } catch (err) {
    console.warn(`⚠️ Could not bump version: ${err.message}`);
    return null;
  }
}

const newVersion = bumpVersion();

// Get commit message from command line arguments, default to 'auto update'
const userArgs = process.argv.slice(2).join(' ').trim();
const commitMessage = userArgs 
  ? `${userArgs}${newVersion ? ` (v${newVersion})` : ''}` 
  : (newVersion ? `update: release v${newVersion}` : 'auto update');

try {
  console.log('📦 Staging changes...');
  execSync('git add .', { stdio: 'inherit', cwd: rootDir });

  try {
    console.log(`💾 Committing with message: "${commitMessage}"...`);
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit', cwd: rootDir });
  } catch (commitError) {
    console.log('ℹ️ Nothing to commit (or commit failed). Continuing...');
  }

  try {
    console.log('🚀 Pushing to Git...');
    const token = (process.env.GITHUB_TOKEN || process.env.GH_TOKEN)?.trim();
    if (token) {
      // Get remote URL, strip any existing credentials, then inject token
      let remoteUrl = execSync('git remote get-url origin', { cwd: rootDir }).toString().trim();
      // Remove any existing user:token@ from the URL
      remoteUrl = remoteUrl.replace(/https:\/\/[^@]+@/, 'https://');
      const authedUrl = remoteUrl.replace('https://', `https://shaswatxd:${token}@`);
      execSync(`git push "${authedUrl}"`, { stdio: 'inherit', cwd: rootDir });
    } else {
      console.log('⚠️ No GITHUB_TOKEN found — trying default push...');
      execSync('git push', { stdio: 'inherit', cwd: rootDir });
    }
  } catch (pushError) {
    console.log('ℹ️ Push failed or nothing to push. Continuing...');
  }

  console.log('☁️ Deploying to Vercel...');
  const vercelToken = process.env.VERCEL_TOKEN;
  if (vercelToken) {
    execSync(`npx vercel --prod --yes --token ${vercelToken}`, { stdio: 'inherit', cwd: rootDir });
  } else {
    execSync('npx vercel --prod --yes', { stdio: 'inherit', cwd: rootDir });
  }

  console.log(`✨ All done! Project (v${newVersion || 'latest'}) is updated and deployed.`);
} catch (error) {
  console.error('❌ An error occurred:', error.message);
  process.exit(1);
}
