// HYBRID TEST v4 (2026-11-25) — transparent character-only pass.
// node render-alpha.cjs [outdir] [w] [h] [fps] [f0] [f1]
// Renders window.frame(t) with ?ships=1&alpha=1 (see main.js ALPHA mode: alpha
// renderer, post chain bypassed, world hidden per frame, ShadowMaterial catcher)
// and writes one PNG per frame: alpha-f####.png. LOOK0=1 appends &look0=1
// (shot-10 camera re-aimed at Remotion v2's look x=0, see ships.js).
// Kept separate from render.cjs on purpose: render.cjs stays untouched.
const http = require('http'), fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const ROOT = __dirname, [, , OUT = 'out/alpha', w = '1080', h = '1920', fps = '30', f0 = '0', f1 = '1'] = process.argv;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' };
const CHROME = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(f => require('fs').existsSync(f));
(async () => {
  const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(0);
  const port = srv.address().port;
  const GL = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'];
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: GL });
  const page = await browser.newPage(); page.on('requestfailed', r => console.log('FAIL', r.url())); page.on('response', r => { if (r.status() >= 400) console.log('HTTP', r.status(), r.url()); }); page.on('pageerror', e => console.log('PAGE ERROR', e.message)); page.on('console', m => console.log('console:', m.text()));
  const xq = (process.env.XQ || '') + (process.env.LOOK0 ? '&look0=1' : '');
  await page.goto(`http://127.0.0.1:${port}/index.html?w=${w}&h=${h}&ships=1&alpha=1${xq}`); await page.waitForFunction('window.ready', { timeout: 180000 });
  fs.mkdirSync(path.join(ROOT, OUT), { recursive: true });
  const F0 = +f0, F1 = +f1, t0 = Date.now();
  for (let f = F0; f < F1; f++) {
    const d = await page.evaluate(t => window.frame(t), f / +fps);
    if (!d.startsWith('data:image/png')) { console.log(`frame ${f}: NOT PNG (${d.slice(0, 40)})`); continue; }
    fs.writeFileSync(path.join(ROOT, OUT, `alpha-f${String(f).padStart(4, '0')}.png`), Buffer.from(d.split(',')[1], 'base64'));
    if ((f - F0) % 10 === 0) process.stdout.write(`\r${f}/${F1} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  console.log(`\n${F1 - F0} frames (f ${F0}..${F1 - 1}) in ${((Date.now() - t0) / 1000).toFixed(0)}s -> ${OUT}`);
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
