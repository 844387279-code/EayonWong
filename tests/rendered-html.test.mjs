import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
