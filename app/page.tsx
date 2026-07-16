"use client";

import {
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  DatabaseZap,
  Languages,
  ScanLine,
  Store,
  Target,
  Workflow,
  X,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import BorderGlow from "./components/BorderGlow";
import LogoLoop from "./components/LogoLoop";
import ShinyText from "./components/ShinyText";
import SoftAurora from "./components/SoftAurora";
import SpecularButton from "./components/SpecularButton";
import TextType from "./components/TextType";
import TiltedCard from "./components/TiltedCard";

const HERO_VIDEO_URL = "/videos/home/hero.mp4";
type TimelineMediaItem = {
  type: "image" | "video";
  src: string;
  title: string;
};

type TimelineMedia = {
  items: TimelineMediaItem[];
};

type VideoPreview = {
  title: string;
  videos: readonly string[];
};

const featuredVideos = [
  { title: "@炫迈妹子", src: "/videos/featured/01-xuanmai.mp4", thumb: "/images/featured-thumbs/01-xuanmai.jpg" },
  { title: "@一颗肉丸子", src: "/videos/featured/02-rouwanzi.mp4", thumb: "/images/featured-thumbs/02-rouwanzi.jpg" },
  { title: "@沐言开心酱", src: "/videos/featured/03-muyan.mp4", thumb: "/images/featured-thumbs/03-muyan.jpg" },
  { title: "@尹木木", src: "/videos/featured/04-yinmumu.mp4", thumb: "/images/featured-thumbs/04-yinmumu.jpg" },
  { title: "@是啵儿宝啊", src: "/videos/featured/05-boerbao.mp4", thumb: "/images/featured-thumbs/05-boerbao.jpg" },
  { title: "@林阿木木", src: "/videos/featured/06-linamumu.mp4", thumb: "/images/featured-thumbs/06-linamumu.jpg" },
  { title: "@嗷嗷待哺小十一", src: "/videos/featured/07-xiaoshiyi.mp4", thumb: "/images/featured-thumbs/07-xiaoshiyi.jpg" },
  { title: "@多宝小圆子", src: "/videos/featured/08-duobao.mp4", thumb: "/images/featured-thumbs/08-duobao.jpg" },
  { title: "@雪球", src: "/videos/featured/09-xueqiu.mp4", thumb: "/images/featured-thumbs/09-xueqiu.jpg" },
  { title: "@吴允博-球球", src: "/videos/featured/10-qiuqiu.mp4", thumb: "/images/featured-thumbs/10-qiuqiu.jpg" },
  { title: "@营养师辣妈小惠", src: "/videos/featured/11-xiaohui.mp4", thumb: "/images/featured-thumbs/11-xiaohui.jpg" },
  { title: "@宁小雪", src: "/videos/featured/12-ningxiaoxue.mp4", thumb: "/images/featured-thumbs/12-ningxiaoxue.jpg" },
];

const projectShowcase = [
  {
    brand: { zh: "隔壁刘奶奶", en: "Gebiliunainai" },
    title: { zh: "抖音话题 #隔壁刘奶奶自然有答案", en: "Douyin Topic · Nature Has the Answer" },
    image: "/images/project-covers/gebiliunainai.jpg",
    videos: [
      "/videos/projects/gebiliunainai/01.mp4",
      "/videos/projects/gebiliunainai/02.mp4",
      "/videos/projects/gebiliunainai/03.mp4",
      "/videos/projects/gebiliunainai/04.mp4",
    ],
    layout: "projectMasonryCardTop",
  },
  {
    brand: { zh: "Pepa", en: "Pepa" },
    title: { zh: "抖音话题 #皮帕熊金银花面霜", en: "Douyin Topic · PEPA Honeysuckle Cream" },
    image: "/images/project-covers/pepa.jpg",
    videos: [
      "/videos/projects/pepa/09.mp4",
      "/videos/projects/pepa/10.mp4",
      "/videos/projects/pepa/11.mp4",
      "/videos/projects/pepa/12.mp4",
    ],
    layout: "projectMasonryCardBottom",
  },
  {
    brand: { zh: "客家小子", en: "Kejia Xiaozi" },
    title: { zh: "个人短视频ip账号", en: "Personal Short-video IP Account" },
    image: "/images/project-covers/kejiaxiaozi.jpg",
    videos: [
      "/videos/projects/kejiaxiaozi/01.mp4",
      "/videos/projects/kejiaxiaozi/02.mp4",
      "/videos/projects/kejiaxiaozi/03.mp4",
      "/videos/projects/kejiaxiaozi/04.mp4",
      "/videos/projects/kejiaxiaozi/05.mp4",
      "/videos/projects/kejiaxiaozi/06.mp4",
    ],
    layout: "projectMasonryCardTall",
  },
] as const;
const partnerBrands = [
  { title: "a2奶粉", src: "/images/partners/transparent/a2.png" },
  { title: "隔壁刘奶奶", src: "/images/partners/transparent/gebiliunainai.png" },
  { title: "荷兰乳牛", src: "/images/partners/transparent/holland-dairy.png" },
  { title: "卡士", src: "/images/partners/transparent/classykiss.png" },
  { title: "卡乐比", src: "/images/partners/transparent/calbee.png" },
  { title: "bebebus", src: "/images/partners/transparent/bebebus.png" },
  { title: "皮帕熊", src: "/images/partners/transparent/pepa.png" },
  { title: "穗丰", src: "/images/partners/transparent/suifeng.png" },
  { title: "国台酒", src: "/images/partners/transparent/guotai.png" },
  { title: "百年糊涂", src: "/images/partners/transparent/bainianhututu.png" },
  { title: "钓鱼台", src: "/images/partners/transparent/diaoyutai.png" },
  { title: "金沙古酒", src: "/images/partners/transparent/jinshagujiu.png" },
  { title: "图虫创意", src: "/images/partners/transparent/tuchong.png" },
  { title: "National Geographic", src: "/images/partners/transparent/national-geographic.png" },
].map((brand) => {
  const mark = <span className="partnerLogoFallback">{brand.title}</span>;
  return {
    node: (
      <span className="partnerLogoMark">
        {brand.src ? <img src={brand.src} alt={brand.title} loading="lazy" decoding="async" onError={(event) => event.currentTarget.classList.add("logoLoadFailed")} /> : null}
        {mark}
      </span>
    ),
    title: brand.title,
    ariaLabel: brand.title,
  };
});

type Locale = "zh" | "en";

const copy = {
  zh: {
    brand: "黄伊阳",
    role: "兴趣电商运营总监",
    nav: [
      ["首页", "#home"],
      ["个人简介", "#profile"],
      ["个人技能", "#works"],
      ["项目经历", "#projects"],
      ["取得联系", "#contact"],
    ],
    lang: "EN",
    heroTitle: "AI正在改变世界",
    profileTitle: "个人简介",
    profileBody:
      "个人擅长：创意内容创作+爆款素材跑量+ip人设账号起号，熟练使用Codex、Chat gpt、Gemini、即梦、可灵、小云雀等国内外ai工具；8年多平台直播运营(0-1起号，1-10经营放大)",
    contact: ["13424243016", "844387279@qq.com", "深圳"],
    metrics: [
      ["8年", "多平台运营经验"],
      ["1亿+", "隔壁刘奶奶话题曝光量"],
      ["64.71%", "PEPA品牌GSV增长"],
      ["17人", "跨职能团队管理"],
    ],
    profileTags: ["抖音电商", "微信小店", "快手电商", "千川投放", "达人种草", "内容策划", "AI成片"],
    timelineTitle: "年份经历",
    timeline: [
      ["2018", "摄影作品集", "2016-2018年摄影作品集锦，含盖人像、风景、纪实、美食等"],
      ["2019", "有毒的沙雕", "负责此账号的IP定位，内容策划，拍摄、剪辑、特效制作、商业合作等。"],
      ["2020", "深圳大学/本科", "视觉传达艺术设计-高等教育自学考试"],
      ["2021", "名酒中国行", "百年糊涂&名酒中国行纪录片总导演，负责统筹策划，协助拍摄等。"],
      ["2020-2022", "微牛电商/直播运营", "代运营国台、百年糊涂、金沙古酒等酒水品牌，主要负责直播间板块。"],
      ["2022-2024", "Xtour/抖音运营总监", "从 0-1 负责搭建品牌运营体系，统筹管理直播、短视频、BD 团队。"],
      ["2024-2025", "隔壁刘奶奶/内容运营", "负责官方账号、ip账号、koc达人挂车kol星图种草等内容输出。"],
      ["2025-2026", "Pepa/兴趣电商总监", "Pepa品牌兴趣电商操盘手，带领团队实现GSV从170w拉升到280W+"],
    ],
    projectsTitle: "项目经历",
    worksTitle: "个人技能",
    works: [
      ["AI内容工作流", "用AI辅助选题、脚本、标题、卖点拆解和批量素材变体，提高短视频内容迭代速度。"],
      ["数据复盘", "围绕GMV、GSV、ROI、CTR、CVR、停留、互动等指标搭建复盘逻辑和经营看板。"],
      ["直播间增长模型", "从人货场、话术、排品、投放和复购设计直播间诊断与增长方案。"],
      ["达人种草策略", "输出达人brief、脚本建议、内容方向与效果追踪，联动自然流和付费流量。"],
      ["投放与素材测试", "使用千川、DOU+、小店随心推、种草通、星图热推等工具做预算和素材优化。"],
      ["团队协同机制", "建立主播、内容、BD、品牌等岗位职责、培训机制、绩效指标和复盘节奏。"],
    ],
    contactTitle: "如果您欣赏我的作品集\n可以添加我的微信",
  },
  en: {
    brand: "Eayon Wong",
    role: "Interest E-commerce Operations Director",
    nav: [
      ["Home", "#home"],
      ["Intro", "#profile"],
      ["Skills", "#works"],
      ["Projects", "#projects"],
      ["Contact", "#contact"],
    ],
    lang: "中",
    heroTitle: "AI is changing the world",
    profileTitle: "Profile",
    profileBody:
      "I specialize in creative content, performance creatives, and launching personality-led IP accounts. I use Codex, ChatGPT, Gemini, Jimeng, Kling, Xiaoyunque, and other AI tools, backed by 8 years of multi-platform livestream operations from 0-to-1 launches to scaled growth.",
    contact: ["13424243016", "844387279@qq.com", "Shenzhen"],
    metrics: [
      ["8 yrs", "Multi-platform operations"],
      ["100M+", "Gebiliunainai topic views"],
      ["64.71%", "PEPA GSV growth"],
      ["17", "Team members"],
    ],
    profileTags: ["Douyin E-commerce", "WeChat Shop", "Kuaishou E-commerce", "Qianchuan Ads", "Creator Seeding", "Content Strategy", "AI Video"],
    timelineTitle: "Timeline",
    timeline: [
      ["2018", "Short Video Operations", "Entered short video content operations, covering topics, scripts, and traffic review."],
      ["2019", "Youdu Comedy IP", "Owned IP positioning, content planning, shooting, editing, effects, and commercial partnerships."],
      ["2020", "Shenzhen University Education", "Explored course products, user conversion, and private traffic operations."],
      ["2021", "Famous Wine China Tour", "Directed the Bainian Hutu & Famous Wine China Tour documentary, leading planning and coordination while assisting filming."],
      ["2020-2022", "Liquor Livestream Ops", "Operated Guotai, Bainian Hutu, Jinsha Gujiu, and other liquor brands, focusing on livestream operations."],
      ["2022-2024", "3C Douyin Operations", "Built the brand operations system from 0 to 1 and led livestream, short-video, and BD teams."],
      ["2024-2025", "Content Operations", "Produced content for official and IP accounts, KOC commerce creators, and KOL Xingtu seeding."],
      ["2025-2026", "Operations Director", "Led PEPA interest e-commerce operations and grew GSV from RMB 1.7M to 2.8M+."],
    ],
    projectsTitle: "Project Experience",
    worksTitle: "Selected Capabilities",
    works: [
      ["AI Content Workflow", "Use AI for topics, scripts, titles, selling points, and content variants to accelerate iteration."],
      ["Data Review", "Build review logic around GMV, GSV, ROI, CTR, CVR, retention, engagement, and operating dashboards."],
      ["Livestream Growth Model", "Diagnose and improve livestream rooms through people, products, scenes, scripts, pricing, ads, and retention."],
      ["Creator Seeding Strategy", "Create briefs, script suggestions, creative directions, and performance tracking across creators."],
      ["Ads and Creative Testing", "Optimize budgets, targeting, creative assets, and plans across Qianchuan, DOU+, and related tools."],
      ["Team Collaboration", "Set up roles, training, performance indicators, and review rhythms across host, content, BD, and brand teams."],
    ],
    contactTitle: "IF YOU ENJOY MY PORTFOLIO\nADD ME ON WECHAT",
  },
} as const;

const workIcons = [BrainCircuit, DatabaseZap, Store, Target, Clapperboard, Workflow];

const timelineMediaByYear: Record<string, TimelineMedia> = {
  "2018": {
    items: [
      { type: "image", src: "/timeline-media/2018/weijunrong.jpg", title: "摄影作品" },
      { type: "image", src: "/timeline-media/2018/fengjing.jpg", title: "风景摄影" },
      { type: "image", src: "/timeline-media/2018/fangdichan.jpg", title: "地产摄影" },
      { type: "image", src: "/timeline-media/2018/meishi-01.jpg", title: "美食摄影" },
      { type: "image", src: "/timeline-media/2018/meishi-02.jpg", title: "美食摄影" },
      { type: "image", src: "/timeline-media/2018/jishi.jpg", title: "纪实摄影" },
    ],
  },
  "2019": {
    items: [
      { type: "video", src: "/timeline-media/2019-toxic/youdu-01.mp4", title: "摆地摊" },
      { type: "video", src: "/timeline-media/2019-toxic/youdu-02.mp4", title: "天台决斗面膜" },
      { type: "video", src: "/timeline-media/2019-toxic/youdu-03.mp4", title: "工地战场" },
      { type: "video", src: "/timeline-media/2019-toxic/youdu-04.mp4", title: "烈日追杀" },
    ],
  },
  "2021": {
    items: [{ type: "video", src: "/timeline-media/2019/mingjiu-china-tour.mp4", title: "名酒中国行" }],
  },
  "2022": {
    items: Array.from({ length: 4 }, (_, index) => ({
      type: "video" as const,
      src: `/timeline-media/2022/guotai-${String(index + 1).padStart(2, "0")}.mp4`,
      title: `国台酒直播运营 ${index + 1}`,
    })),
  },
  "2024": {
    items: Array.from({ length: 3 }, (_, index) => ({
      type: "video" as const,
      src: `/timeline-media/2024/xtour-${String(index + 1).padStart(2, "0")}.mp4`,
      title: `Xtour 短视频 ${index + 1}`,
    })),
  },
  "2025": {
    items: Array.from({ length: 8 }, (_, index) => ({
      type: "video" as const,
      src: `/timeline-media/2025/gebiliunainai-${String(index + 1).padStart(2, "0")}.mp4`,
      title: `隔壁刘奶奶 ${index + 1}`,
    })),
  },
  "2026": {
    items: [
      { type: "video", src: "/timeline-media/2026/pepa-01.mp4", title: "尹木木" },
      { type: "video", src: "/timeline-media/2026/pepa-02.mp4", title: "是啵儿宝啊" },
      { type: "video", src: "/timeline-media/2026/pepa-03.mp4", title: "多宝小圆子" },
      { type: "video", src: "/timeline-media/2026/pepa-04.mp4", title: "雪球" },
      { type: "video", src: "/timeline-media/2026/pepa-05.mp4", title: "营养师辣妈小惠" },
      { type: "video", src: "/timeline-media/2026/pepa-06.mp4", title: "小满奶奶带娃记" },
    ],
  },
};

function playQuietly(video: HTMLVideoElement) {
  void video.play().catch(() => {});
}

function displayTimelineYear(year: string) {
  if (year.includes("-")) return year.split("-").at(-1) ?? year;
  return year;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [loadProgress, setLoadProgress] = useState(50);
  const [introDone, setIntroDone] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoPreview | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videoNeedsPlay, setVideoNeedsPlay] = useState(false);
  const [videoHover, setVideoHover] = useState<{ title: string; x: number; y: number } | null>(null);
  const [projectHover, setProjectHover] = useState<{ x: number; y: number } | null>(null);
  const [activeTimeline, setActiveTimeline] = useState<{
    year: string;
    title: string;
    body: string;
    image: string;
    media: TimelineMedia;
  } | null>(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [timelineMediaShape, setTimelineMediaShape] = useState<"portrait" | "landscape" | "square">("portrait");
  const [timelineHover, setTimelineHover] = useState<{ x: number; y: number } | null>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const timelineScrollerRef = useRef<HTMLDivElement | null>(null);
  const timelineDragRef = useRef({ active: false, moved: false, pointerId: -1, startX: 0, scrollLeft: 0 });
  const t = copy[locale];
  const timelineImages = [
    "/images/timeline-covers/2018.png",
    "/images/timeline-covers/2019.png",
    "/images/timeline-covers/2020.png",
    "/images/timeline-covers/2021.png",
    "/images/timeline-covers/2022.png",
    "/images/timeline-covers/2024.png",
    "/images/timeline-covers/2025.png",
    "/images/timeline-covers/2026.png",
  ];
  const activeTimelineItem = activeTimeline?.media.items[activeTimelineIndex];
  const activeTimelineCount = activeTimeline?.media.items.length ?? 0;
  const activeVideoSrc = activeVideo?.videos[activeVideoIndex];
  const activeVideoCount = activeVideo?.videos.length ?? 0;

  const playPreviewWithSound = () => {
    const video = previewVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setVideoNeedsPlay(false);
    void video.play().catch((error: DOMException) => {
      console.error("[video-preview]", error.name, error.message);
      setVideoNeedsPlay(true);
    });
  };

  const openVideoPreview = (title: string, videos: readonly string[]) => {
    setActiveVideoIndex(0);
    setActiveVideo({ title, videos });
    setVideoNeedsPlay(true);
  };

  const shiftActiveVideo = (step: number) => {
    if (!activeVideoCount) return;
    setActiveVideoIndex((current) => (current + step + activeVideoCount) % activeVideoCount);
    setVideoNeedsPlay(true);
  };

  const shiftTimelineItem = (step: number) => {
    if (!activeTimelineCount) return;
    setTimelineMediaShape("portrait");
    setActiveTimelineIndex((current) => (current + step + activeTimelineCount) % activeTimelineCount);
  };

  const updateTimelineMediaShape = (width: number, height: number) => {
    if (!width || !height) return;
    if (Math.abs(width - height) < Math.max(width, height) * 0.08) {
      setTimelineMediaShape("square");
      return;
    }
    setTimelineMediaShape(width > height ? "landscape" : "portrait");
  };

  useEffect(() => {
    let progress = 50;
    let doneTimer: ReturnType<typeof window.setTimeout> | undefined;

    const progressTimer = window.setInterval(() => {
      progress = Math.min(100, progress + (progress < 86 ? 7 : 5));
      setLoadProgress(progress);

      if (progress >= 100) {
        window.clearInterval(progressTimer);
        doneTimer = window.setTimeout(() => setIntroDone(true), 260);
      }
    }, 22);

    return () => {
      window.clearInterval(progressTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => playQuietly(video);
    video.addEventListener("loadeddata", play);
    play();

    return () => video.removeEventListener("loadeddata", play);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scroller = timelineScrollerRef.current;
      if (!scroller) return;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      setTimelineProgress(maxScroll > 0 ? scroller.scrollLeft / maxScroll : 0);
    };
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      ".heroInner, .sectionHead, .profileGrid, .projectMasonryCard, .abilityCard, .careerCard, .contactInner",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    revealTargets.forEach((target, index) => {
      target.classList.add("reveal");
      (target as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`introLoader${introDone ? " introLoaderDone" : ""}`}
        role="status"
        aria-label="页面载入进度"
        style={{ "--intro-progress": `${loadProgress}%` } as CSSProperties}
      >
        <div className="introAurora" aria-hidden="true">
          <SoftAurora
            speed={0.45}
            scale={1.45}
            brightness={0.78}
            color1="#eef5f2"
            color2="#42d8c4"
            noiseFrequency={2.4}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={0.9}
            octaveDecay={0.12}
            layerOffset={0.08}
            colorSpeed={0.7}
            enableMouseInteraction={false}
            mouseInfluence={0}
          />
        </div>
        <div className="introLoaderInner">
          <span className="introLoaderLabel">Loading Portfolio</span>
          <strong>{loadProgress}%</strong>
        </div>
      </div>

      <nav className="topNav" aria-label="主导航">
          <a className="identity" href="#home" aria-label={t.brand}>
            <img src="/images/avatar.jpg" alt={t.brand} />
            <span>
              <strong>{t.brand}</strong>
              <small>{t.role}</small>
            </span>
          </a>

          <div className="navLinks">
            {t.nav.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>

          <button className="langButton" type="button" onClick={() => setLocale(locale === "zh" ? "en" : "zh")}>
            <Languages size={17} aria-hidden="true" />
            {t.lang}
          </button>
      </nav>

      <main>
      <section className="hero" id="home">
        <video ref={videoRef} className="heroVideo" src={HERO_VIDEO_URL} muted autoPlay loop playsInline preload="auto" />
        <div className="heroShade" />

        <div className="heroInner">
          <h1>
            <TextType
              key={t.heroTitle}
              text={t.heroTitle}
              typingSpeed={70}
              initialDelay={280}
              pauseDuration={3600}
              deletingSpeed={36}
              loop={false}
              showCursor
              cursorCharacter="|"
              className="heroShinyTitle"
              as="span"
            />
          </h1>
          <p className="heroText">
            <ShinyText
              text={locale === "zh" ? "你也在悄悄改变" : "You are changing quietly too"}
              speed={3}
              delay={0.2}
              color="rgba(238, 245, 242, 0.62)"
              shineColor="#ffffff"
              spread={115}
            />
          </p>
        </div>

        <div className="featuredVideoRail" aria-label="代表作视频">
          {[...featuredVideos, ...featuredVideos].map((video, index) => (
            <button
              className="featuredVideoCard"
              type="button"
              key={`${video.title}-${index}`}
              onClick={() => {
                openVideoPreview(video.title, [video.src]);
              }}
              onMouseMove={(event) => setVideoHover({ title: video.title, x: event.clientX, y: event.clientY })}
              onMouseLeave={() => setVideoHover(null)}
              onFocus={() => setVideoHover(null)}
              aria-label={`播放${video.title}`}
            >
              <img src={video.thumb} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
        {videoHover ? (
          <div className="featuredVideoTooltip" style={{ "--tooltip-x": `${videoHover.x}px`, "--tooltip-y": `${videoHover.y}px` } as CSSProperties}>
            {videoHover.title}
          </div>
        ) : null}
      </section>

      {activeVideo && activeVideoSrc ? (
        <div className="videoModal" role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <button className="videoModalClose" type="button" onClick={() => setActiveVideo(null)} aria-label="关闭视频">
            <X size={28} aria-hidden="true" />
          </button>
          <div className="videoModalFrame">
            <video
              ref={previewVideoRef}
              key={activeVideoSrc}
              src={activeVideoSrc}
              controls
              playsInline
              preload="auto"
              onPlay={() => setVideoNeedsPlay(false)}
              onEnded={() => {
                if (activeVideoCount > 1) shiftActiveVideo(1);
              }}
            />
            {videoNeedsPlay ? (
              <button className="videoStartButton" type="button" onClick={playPreviewWithSound}>
                {locale === "zh" ? "播放视频" : "Play video"}
              </button>
            ) : null}
            {activeVideoCount > 1 ? (
              <>
                <button className="timelineNavButton timelineNavButtonPrev" type="button" onClick={() => shiftActiveVideo(-1)} aria-label={locale === "zh" ? "上一个视频" : "Previous video"}>
                  <ChevronLeft size={30} aria-hidden="true" />
                </button>
                <button className="timelineNavButton timelineNavButtonNext" type="button" onClick={() => shiftActiveVideo(1)} aria-label={locale === "zh" ? "下一个视频" : "Next video"}>
                  <ChevronRight size={30} aria-hidden="true" />
                </button>
                <span className="videoModalCounter">{activeVideoIndex + 1} / {activeVideoCount}</span>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      <section className="section profileSection" id="profile">
        <div className="sectionHead">
          <span>{locale === "zh" ? "01/个人简介" : "01/Intro"}</span>
          <h2 className="srOnly">{t.profileTitle}</h2>
        </div>

        <div className="profileGrid">
          <BorderGlow className="portraitCard" animated={false}>
            <TiltedCard
              imageSrc="/images/profile-suit-gray.png"
              hoverImageSrc="/images/life-photo.jpg"
              altText={t.brand}
              captionText={t.brand}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={7}
              scaleOnHover={1.035}
              showTooltip={false}
              hoverLabel={locale === "zh" ? "生活照" : "Life Photo"}
              className="portraitTilt"
            />
          </BorderGlow>

          <TiltedCard containerHeight="auto" containerWidth="100%" imageHeight="auto" imageWidth="100%" rotateAmplitude={5} scaleOnHover={1.025} className="contentTilt">
              <BorderGlow className="profileCopy" animated={false}>
                <span className="profileEyebrow">{locale === "zh" ? "关于我" : "ABOUT ME"}</span>
              <h3>{locale === "zh" ? "您好，我是黄伊阳" : "Hello, I am Eayon"}</h3>
              <p>{t.profileBody}</p>
              <div className="profileInfoGrid">
                <span>
                  <small>{locale === "zh" ? "当前方向" : "Focus"}</small>
                  <strong>{t.role}</strong>
                </span>
                <span>
                  <small>{locale === "zh" ? "所在城市" : "Location"}</small>
                  <strong>{t.contact[2]}</strong>
                </span>
                <a href="tel:13424243016">
                  <small>{locale === "zh" ? "手机" : "Phone"}</small>
                  <strong>{t.contact[0]}</strong>
                </a>
                <a href="mailto:844387279@qq.com">
                  <small>{locale === "zh" ? "邮箱" : "Email"}</small>
                  <strong>{t.contact[1]}</strong>
                </a>
              </div>
              <div className="tagCloud">
                {t.profileTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </BorderGlow>
          </TiltedCard>
        </div>

        <div className="metricGrid">
          {t.metrics.map(([value, label]) => (
            <TiltedCard containerHeight="auto" containerWidth="100%" imageHeight="auto" imageWidth="100%" rotateAmplitude={7} scaleOnHover={1.04} className="metricTilt" key={label}>
              <SpecularButton
                as="div"
                size="lg"
                radius={8}
                tint="#ffffff"
                tintOpacity={0.015}
                textColor="#eef5f2"
                lineColor="#42d8c4"
                baseColor="#394348"
                intensity={1.1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="metricCard metricSpecular"
              >
                <strong>{value}</strong>
                <span>{label}</span>
              </SpecularButton>
            </TiltedCard>
          ))}
        </div>

      </section>

      <section className="timelineSection" id="timeline">
        <div className="sectionHead wide timelineHead">
          <span>{locale === "zh" ? "02/年份总结" : "02/Timeline"}</span>
          <h2 className="srOnly">{t.timelineTitle}</h2>
        </div>
        <div
          ref={timelineScrollerRef}
          className="careerScroller"
          aria-label={t.timelineTitle}
          onScroll={(event) => {
            const scroller = event.currentTarget;
            const maxScroll = scroller.scrollWidth - scroller.clientWidth;
            setTimelineProgress(maxScroll > 0 ? scroller.scrollLeft / maxScroll : 0);
          }}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            timelineDragRef.current = {
              active: true,
              moved: false,
              pointerId: event.pointerId,
              startX: event.clientX,
              scrollLeft: event.currentTarget.scrollLeft,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.classList.add("isDragging");
          }}
          onPointerMove={(event) => {
            const drag = timelineDragRef.current;
            if (!drag.active || drag.pointerId !== event.pointerId) return;
            const delta = event.clientX - drag.startX;
            if (Math.abs(delta) > 5) drag.moved = true;
            event.currentTarget.scrollLeft = drag.scrollLeft - delta;
          }}
          onPointerUp={(event) => {
            const drag = timelineDragRef.current;
            if (drag.pointerId === event.pointerId) {
              drag.active = false;
              event.currentTarget.classList.remove("isDragging");
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={(event) => {
            timelineDragRef.current.active = false;
            timelineDragRef.current.moved = false;
            event.currentTarget.classList.remove("isDragging");
          }}
          onClickCapture={(event) => {
            if (timelineDragRef.current.moved) {
              event.preventDefault();
              event.stopPropagation();
              timelineDragRef.current.moved = false;
            }
          }}
        >
          <div className="careerTrack">
            {t.timeline.map(([year, title, body], index) => {
              const image = timelineImages[index % timelineImages.length];
              const displayYear = displayTimelineYear(year);
              const media = timelineMediaByYear[displayYear];
              const canPreview = Boolean(media?.items.length);
              return (
                <button
                  className={`careerCard ${canPreview ? "isInteractive" : "isStatic"}`}
                  type="button"
                  key={`${year}-${title}-${index}`}
                  onClick={() => {
                    if (media) {
                      const videos = media.items.filter((item) => item.type === "video").map((item) => item.src);
                      if (videos.length === media.items.length) {
                        setTimelineHover(null);
                        openVideoPreview(`${displayYear} · ${title}`, videos);
                        return;
                      }
                      setTimelineMediaShape("portrait");
                      setActiveTimelineIndex(0);
                      setActiveTimeline({ year: displayYear, title, body, image, media });
                    }
                  }}
                  onMouseMove={(event) => {
                    if (canPreview) setTimelineHover({ x: event.clientX, y: event.clientY });
                  }}
                  onMouseLeave={() => setTimelineHover(null)}
                  onFocus={() => setTimelineHover(null)}
                  aria-label={canPreview ? `${locale === "zh" ? "查看" : "View"} ${title}` : title}
                >
                  <strong>{displayYear}</strong>
                  <img src={image} alt={title} draggable={false} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="timelineScrollProgress" aria-hidden="true">
          <span style={{ width: `${12 + timelineProgress * 88}%` }} />
        </div>
        {timelineHover ? (
          <div className="featuredVideoTooltip" style={{ "--tooltip-x": `${timelineHover.x}px`, "--tooltip-y": `${timelineHover.y}px` } as CSSProperties}>
            {locale === "zh" ? "点击查看" : "Click to view"}
          </div>
        ) : null}
      </section>

      {activeTimeline && activeTimelineItem ? (
        <div className="videoModal" role="dialog" aria-modal="true" aria-label={activeTimeline.title}>
          <button className="videoModalClose" type="button" onClick={() => setActiveTimeline(null)} aria-label={locale === "zh" ? "关闭预览" : "Close preview"}>
            <X size={28} aria-hidden="true" />
          </button>
          <div className={`timelineModalFrame timelineModalFrameSingle is-${timelineMediaShape}`}>
            <div className="timelineSingleStage">
              {activeTimelineItem.type === "video" ? (
                <video
                  key={activeTimelineItem.src}
                  src={activeTimelineItem.src}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => updateTimelineMediaShape(event.currentTarget.videoWidth, event.currentTarget.videoHeight)}
                />
              ) : (
                <img
                  key={activeTimelineItem.src}
                  src={activeTimelineItem.src}
                  alt={activeTimelineItem.title}
                  onLoad={(event) => updateTimelineMediaShape(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)}
                />
              )}
              {activeTimelineCount > 1 ? (
                <>
                  <button className="timelineNavButton timelineNavButtonPrev" type="button" onClick={() => shiftTimelineItem(-1)} aria-label={locale === "zh" ? "上一个" : "Previous"}>
                    <ChevronLeft size={30} aria-hidden="true" />
                  </button>
                  <button className="timelineNavButton timelineNavButtonNext" type="button" onClick={() => shiftTimelineItem(1)} aria-label={locale === "zh" ? "下一个" : "Next"}>
                    <ChevronRight size={30} aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <section className="section worksSection" id="works">
        <div className="sectionHead wide worksHead">
          <span>{locale === "zh" ? "03/个人技能" : "03/Skills"}</span>
          <h2 className="srOnly">{t.worksTitle}</h2>
        </div>

        <div className="skillShowcase">
          {t.works.slice(0, 2).map(([title, body], index) => {
            const Icon = workIcons[index];
            return (
              <BorderGlow className={`skillPanel ${index === 1 ? "isActive" : ""}`} key={title} animated={false}>
                <div className="skillPanelTop">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div className="skillGlowOrb" aria-hidden="true" />
                <div className="skillPanelCopy">
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <div className="skillTags">
                    {(index === 0
                      ? locale === "zh"
                        ? ["选题", "脚本", "标题", "素材变体"]
                        : ["Topics", "Scripts", "Hooks", "Variants"]
                      : locale === "zh"
                        ? ["GMV", "ROI", "CTR", "复盘看板"]
                        : ["GMV", "ROI", "CTR", "Review Board"]
                    ).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>

        <div className="skillMiniGrid">
          {t.works.slice(2).map(([title, body], index) => {
            const Icon = workIcons[index + 2];
            return (
              <BorderGlow className="skillMiniCard" key={title} animated={false}>
                <div className="skillMiniIcon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </BorderGlow>
            );
          })}
        </div>
      </section>

      <section className="section projectsSection" id="projects">
        <div className="sectionHead wide">
          <span>{locale === "zh" ? "04/项目经历" : "04/Projects"}</span>
          <h2 className="srOnly">{t.projectsTitle}</h2>
        </div>

        <div className="projectMasonry" aria-label={t.projectsTitle}>
          {projectShowcase.map((project, index) => {
            const brand = project.brand[locale];
            const title = project.title[locale];
            return (
              <button
                className={`projectMasonryCard ${project.layout}`}
                type="button"
                key={brand}
                onClick={() => {
                  setProjectHover(null);
                  openVideoPreview(`${brand} · ${title}`, project.videos);
                }}
                onMouseMove={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
                  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
                  event.currentTarget.style.setProperty("--project-image-x", `${x}px`);
                  event.currentTarget.style.setProperty("--project-image-y", `${y}px`);
                  setProjectHover({ x: event.clientX, y: event.clientY });
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--project-image-x", "0px");
                  event.currentTarget.style.setProperty("--project-image-y", "0px");
                  setProjectHover(null);
                }}
                onFocus={() => setProjectHover(null)}
                aria-label={`${locale === "zh" ? "点击查看" : "Click to view"} ${brand} ${title}`}
                style={{ "--project-order": index } as CSSProperties}
              >
                <img src={project.image} alt="" loading="lazy" decoding="async" />
                <span className="projectMasonryShade" aria-hidden="true" />
                <span className="projectMasonryCopy">
                  <small>{brand}</small>
                  <strong>{title}</strong>
                </span>
                <span className="projectMasonryNumber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        {projectHover ? (
          <div className="projectPointerTooltip" style={{ "--tooltip-x": `${projectHover.x}px`, "--tooltip-y": `${projectHover.y}px` } as CSSProperties}>
            {locale === "zh" ? "点击查看" : "Click to view"}
          </div>
        ) : null}
      </section>

      <section className="contactPage" id="contact">
        <BorderGlow className="contactInner noGlow" animated={false}>
          <p className="signal">
            <ScanLine size={16} aria-hidden="true" />
            {locale === "zh" ? "取得联系" : "Contact"}
          </p>
          <h2>
            {t.contactTitle.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <div className="finalContact">
            <div className="finalLinks">
              <a href="tel:13424243016">
                <span>{locale === "zh" ? "手机" : "Phone"}</span>
                <strong>13424243016</strong>
              </a>
              <a href="mailto:844387279@qq.com">
                <span>{locale === "zh" ? "邮箱" : "Email"}</span>
                <strong>844387279@qq.com</strong>
              </a>
              <a href="#contact">
                <span>{locale === "zh" ? "微信号" : "WeChat"}</span>
                <strong>Eayon-Wong</strong>
              </a>
            </div>
            <div className="qrBox">
              <img src="/images/wechat-qr-green.png" alt={locale === "zh" ? "微信二维码" : "WeChat QR code"} />
            </div>
          </div>
        </BorderGlow>
      </section>

      <section className="partnerLogoSection" aria-label={locale === "zh" ? "历史合作品牌" : "Brand partners"}>
        <LogoLoop
          logos={partnerBrands}
          speed={66}
          direction="left"
          logoHeight={64}
          gap={28}
          hoverSpeed={18}
          scaleOnHover
          fadeOut
          fadeOutColor="#050607"
          ariaLabel={locale === "zh" ? "历史合作品牌 Logo" : "Brand partner logos"}
        />
      </section>
      </main>
    </>
  );
}
