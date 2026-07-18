import assert from "node:assert/strict";
import { access, open, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /黄伊阳/);
  assert.match(html, /个人简介/);
  assert.match(html, /个人技能/);
  assert.match(html, /项目经历/);
  assert.match(html, /取得联系/);
  assert.match(html, /炫迈妹子/);
  assert.match(html, /宁小雪/);
  assert.match(html, /隔壁刘奶奶/);
  assert.match(html, /客家小子/);
  assert.match(html, /AI内容工作流/);
  assert.match(html, /\/images\/timeline-covers\/2026\.png/);
  assert.match(html, /13424243016/);
  assert.doesNotMatch(html, /青衫渡/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("removes starter preview scaffolding from source", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("includes the featured video assets", async () => {
  await Promise.all([
    access(new URL("../public/videos/featured/01-xuanmai.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/02-rouwanzi.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/03-muyan.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/04-yinmumu.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/05-boerbao.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/06-linamumu.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/07-xiaoshiyi.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/08-duobao.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/09-xueqiu.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/10-qiuqiu.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/11-xiaohui.mp4", import.meta.url)),
    access(new URL("../public/videos/featured/12-ningxiaoxue.mp4", import.meta.url)),
  ]);
});

test("uses browser-compatible, user-started preview videos", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(page, /\.m4v/);
  assert.match(page, /className="videoStartButton"/);
  assert.match(page, /flushSync\(\(\) => \{[\s\S]{0,220}setActiveVideo\(\{ title, videos \}\)/);
  assert.match(page, /setActiveVideo\(\{ title, videos \}\)[\s\S]{0,220}playPreviewWithSound\(\)/);
  assert.doesNotMatch(page, /ref=\{previewVideoRef\}[\s\S]{0,220}\bmuted\b/);

  await Promise.all([
    access(new URL("../public/timeline-media/2026/pepa-01.mp4", import.meta.url)),
    access(new URL("../public/videos/projects/pepa/09.mp4", import.meta.url)),
  ]);
});

test("keeps timeline taps separate from horizontal drags", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const pointerDown = page.slice(page.indexOf("onPointerDown="), page.indexOf("onPointerMove="));
  const pointerMove = page.slice(page.indexOf("onPointerMove="), page.indexOf("onPointerUp="));

  assert.doesNotMatch(pointerDown, /setPointerCapture/);
  assert.match(pointerMove, /Math\.abs\(delta\) < 12/);
  assert.match(pointerMove, /setPointerCapture/);
});

test("keeps every timeline video web-streamable", async () => {
  const root = new URL("../public/timeline-media/", import.meta.url);
  const names = (await readdir(root, { recursive: true })).filter((name) => name.endsWith(".mp4"));

  for (const name of names) {
    const handle = await open(new URL(name, root), "r");
    const probe = Buffer.alloc(512 * 1024);
    const { bytesRead } = await handle.read(probe, 0, probe.length, 0);
    await handle.close();
    const head = probe.subarray(0, bytesRead);
    const moov = head.indexOf(Buffer.from("moov"));
    const mdat = head.indexOf(Buffer.from("mdat"));

    assert.ok(moov > 0 && mdat > moov, `${name} must place its moov index before media data`);
    assert.ok(head.indexOf(Buffer.from("avc1")) > 0, `${name} must use browser-compatible H.264 video`);
    assert.equal(head.indexOf(Buffer.from("hvc1")), -1, `${name} must not use HEVC video`);
  }
});

test("serves video byte ranges for reliable browser playback", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("range-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const source = Buffer.from("0123456789");

  const response = await worker.fetch(
    new Request("http://localhost/timeline-media/2026/pepa-01.mp4", {
      headers: { range: "bytes=2-5" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response(source, {
          headers: {
            "content-length": String(source.length),
            "content-type": "video/mp4",
          },
        }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 206);
  assert.equal(response.headers.get("accept-ranges"), "bytes");
  assert.equal(response.headers.get("content-range"), "bytes 2-5/10");
  assert.equal(response.headers.get("content-length"), "4");
  assert.equal(await response.text(), "2345");
});
