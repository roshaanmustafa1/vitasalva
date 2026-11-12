const fs = require('fs');
const path = require('path');

const nitroRollupPath = path.join(__dirname, '..', 'node_modules', 'nitropack', 'dist', 'rollup', 'index.mjs');

if (fs.existsSync(nitroRollupPath)) {
  let content = fs.readFileSync(nitroRollupPath, 'utf8');
  let changed = false;

  // Fix 1: handlers import
  const h1 = "import ${getImportId(handler)} from '${handler}';";
  const h1Fix = "import ${getImportId(handler)} from ${JSON.stringify(handler)};";
  if (content.includes(h1)) {
    content = content.replace(h1, h1Fix);
    changed = true;
  }

  // Fix 2: lazy handlers import
  const h2 = "const ${getImportId(handler, true)} = () => import('${handler}');";
  const h2Fix = "const ${getImportId(handler, true)} = () => import(${JSON.stringify(handler)});";
  if (content.includes(h2)) {
    content = content.replace(h2, h2Fix);
    changed = true;
  }

  // Fix 3: plugins import
  const p1 = "(plugin) => `import _${hash(plugin).replace(/-/g, \"\")} from '${plugin}';`";
  const p1Fix = "(plugin) => `import _${hash(plugin).replace(/-/g, \"\")} from ${JSON.stringify(plugin)};`";
  if (content.includes(p1)) {
    content = content.replace(p1, p1Fix);
    changed = true;
  }

  // Fix 4: polyfills import
  const p2 = "env.polyfill.map((p) => `import '${p}';`).join(\"\\n\")";
  const p2Fix = "env.polyfill.map((p) => `import ${JSON.stringify(p)};`).join(\"\\n\")";
  if (content.includes(p2)) {
    content = content.replace(p2, p2Fix);
    changed = true;
  }

  // Fix 5: chunks inline
  const c1 = "`${chunks.map((i) => `import * as ${i.name} from '${i.src}'`).join(\"\\n\")}";
  const c1Fix = "`${chunks.map((i) => `import * as ${i.name} from ${JSON.stringify(i.src)}`).join(\"\\n\")}";
  if (content.includes(c1)) {
    content = content.replace(c1, c1Fix);
    changed = true;
  }

  // Fix 6: chunks lazy
  const c2 = "${chunks.map((i) => ` ['${i.id}']: () => import('${i.src}')`).join(\",\\n\")}";
  const c2Fix = "${chunks.map((i) => ` [${JSON.stringify(i.id)}]: () => import(${JSON.stringify(i.src)})`).join(\",\\n\")}";
  if (content.includes(c2)) {
    content = content.replace(c2, c2Fix);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(nitroRollupPath, content, 'utf8');
    console.log('[patch-nitro] Successfully patched nitropack to support Windows paths with apostrophes.');
  }
}

