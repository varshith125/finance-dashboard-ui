const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// 1. Update root and light-mode tokens
css = css.replace(
  /:root\s*\{[\s\S]*?--shadow-glow: 0 0 24px rgba\([^)]+\);\n\}/,
`:root {
  --bg-primary: #090b10;
  --bg-secondary: #12151e;
  --bg-secondary-glass: rgba(18, 21, 30, 0.7);
  --bg-card: #191d29;
  --bg-card-glass: rgba(25, 29, 41, 0.5);
  --bg-card-hover: #222736;
  --border: #262c3d;
  --border-glass: rgba(255, 255, 255, 0.04);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-blue: #6366f1;
  --accent-blue-glow: rgba(99,102,241,0.2);
  --accent-green: #22d3a8;
  --accent-red: #f43f5e;
  --accent-amber: #f59e0b;
  --accent-purple: #a855f7;
  --accent-cyan: #06b6d4;
  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 8px 32px rgba(0,0,0,0.4);
  --shadow-glow: 0 0 32px rgba(99,102,241,0.2);
}`
);

css = css.replace(
  /\.light-mode\s*\{[\s\S]*?--shadow: 0 4px 24px rgba\([^)]+\);\n\}/,
`.light-mode {
  --bg-primary: #eff2f6;
  --bg-secondary: #ffffff;
  --bg-secondary-glass: rgba(255, 255, 255, 0.85);
  --bg-card: #ffffff;
  --bg-card-glass: rgba(255, 255, 255, 0.75);
  --bg-card-hover: #f8fafc;
  --border: #e2e8f0;
  --border-glass: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --shadow: 0 8px 32px rgba(0,0,0,0.06);
}`
);

// 2. Body glow
css = css.replace(
  /body\s*\{[^}]+\}/,
`body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  position: relative;
  z-index: 1;
}

body::before {
  content: '';
  position: fixed;
  top: -20vh;
  left: -20vw;
  width: 140vw;
  height: 140vh;
  background: radial-gradient(circle at 50% -10%, var(--accent-blue-glow) 0%, transparent 40%),
              radial-gradient(circle at 10% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 35%);
  z-index: -1;
  pointer-events: none;
}`
);

// 3. Update backgrounds and borders to use glass versions
const glassReplace = (clsPattern) => {
  css = css.replace(clsPattern, (match) => {
    return match
      .replace('background: var(--bg-card);', 'background: var(--bg-card-glass);\n  backdrop-filter: blur(24px);\n  -webkit-backdrop-filter: blur(24px);')
      .replace('border: 1px solid var(--border);', 'border: 1px solid var(--border-glass);\n  box-shadow: 0 4px 6px rgba(0,0,0,0.02);')
      .replace('background: var(--bg-secondary);', 'background: var(--bg-secondary-glass);\n  backdrop-filter: blur(24px);\n  -webkit-backdrop-filter: blur(24px);');
  });
};

glassReplace(/\.card\s*\{[^}]+\}/);
glassReplace(/\.summary-card\s*\{[^}]+\}/);
glassReplace(/\.chart-card\s*\{[^}]+\}/);
glassReplace(/\.filters-bar\s*\{[^}]+\}/);
glassReplace(/\.table-card\s*\{[^}]+\}/);
glassReplace(/\.insight-card\s*\{[^}]+\}/);
glassReplace(/\.modal\s*\{[^}]+\}/);
glassReplace(/\.sidebar[^\{]*\{[^}]+\}/);
glassReplace(/\.header\s*\{[^}]+\}/);

// Custom tweak for input hover and button shadows
css = css.replace(/\.btn-primary\s*\{[^}]+\}/, 
`.btn-primary {
  background: linear-gradient(135deg, var(--accent-blue), #818cf8);
  color: #fff;
  box-shadow: 0 4px 12px rgba(99,102,241,0.3);
  border: 1px solid rgba(255,255,255,0.1);
}`);

fs.writeFileSync('src/index.css', css);
console.log('CSS elegantly updated');
