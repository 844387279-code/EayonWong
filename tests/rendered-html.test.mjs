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
  assert.match(html, /兴趣电商运营作品集/);
  assert.match(html, /代表项目/);
  assert.match(html, /PEPA 品牌兴趣电商经营/);
  assert.match(html, /酒水品牌冷启动与爆品增长/);
  assert.match(html, /个人账号“客家小子”视频作品/);
  assert.match(html, /\/videos\/kjx\/183-set-1\.mp4/);
  assert.match(html, /\/videos\/kjx\/183-set-2\.mp4/);
  assert.match(html, /\/videos\/kjx\/183-set-3\.mp4/);
  assert.match(html, /13424243016/);
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

test("includes the kejiaxiaozi video assets", async () => {
  await Promise.all([
    access(new URL("../public/videos/kjx/183-set-1.mp4", import.meta.url)),
    access(new URL("../public/videos/kjx/183-set-2.mp4", import.meta.url)),
    access(new URL("../public/videos/kjx/183-set-3.mp4", import.meta.url)),
  ]);
});
