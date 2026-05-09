// scripts/bump-version.js
// Uso: node scripts/bump-version.js patch|minor|major

const fs = require('fs');
const path = require('path');

const VALID_TYPES = ['patch', 'minor', 'major'];

// Tipo de bump (patch, minor, major)
const bumpType = process.argv[2];

if (!VALID_TYPES.includes(bumpType)) {
  console.error(
    'Uso inválido. Use: node scripts/bump-version.js patch|minor|major'
  );
  process.exit(1);
}

const packageJsonPath = path.join(__dirname, '..', 'package.json');

function bumpVersion(version, type) {
  const parts = version.split('.');
  if (parts.length !== 3) {
    throw new Error(`Versão inválida em package.json: ${version}`);
  }

  let [major, minor, patch] = parts.map((n) => parseInt(n, 10));

  if (type === 'patch') {
    patch += 1;
  } else if (type === 'minor') {
    minor += 1;
    patch = 0;
  } else if (type === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  }

  return `${major}.${minor}.${patch}`;
}

function main() {
  if (!fs.existsSync(packageJsonPath)) {
    console.error('Arquivo package.json não encontrado.');
    process.exit(1);
  }

  const raw = fs.readFileSync(packageJsonPath, 'utf8');
  const pkg = JSON.parse(raw);

  if (!pkg.version) {
    console.error('Campo "version" não encontrado em package.json.');
    process.exit(1);
  }

  const oldVersion = pkg.version;
  const newVersion = bumpVersion(oldVersion, bumpType);

  pkg.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  console.log(`Versão atualizada: ${oldVersion} → ${newVersion}`);
}

main();
