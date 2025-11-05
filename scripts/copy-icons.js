const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '..', 'nodes');
const DEST_DIR = path.resolve(__dirname, '..', 'dist', 'nodes');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function copyIcons() {
  const stack = [SRC_DIR];

  while (stack.length) {
    const dir = stack.pop();
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (/\.(png|svg)$/i.test(entry.name)) {
        const rel = path.relative(SRC_DIR, fullPath);
        const destPath = path.join(DEST_DIR, rel);
        await ensureDir(path.dirname(destPath));
        await fs.promises.copyFile(fullPath, destPath);
        console.log(`Copied ${rel}`);
      }
    }
  }
}

copyIcons().catch((err) => {
  console.error('Error copying icons:', err);
  process.exitCode = 1;
});
