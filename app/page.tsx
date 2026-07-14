"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Clapperboard,
  FileText,
  Globe2,
  Image,
  Languages,
  Mail,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HERO_VIDEO_URL = "/videos/home/hero.mp4";

type Locale = "zh" | "en";

const copy = {
  zh: {
    brand: "黄伊阳",
    role: "兴趣电商运营总监 / 资深运营8年",
    nav: [
      { label: "首页", href: "#home" },
      { label: "项目经历", href: "#projects" },
      { label: "个人作品", href: "#works" },
      { label: "个人履历", href: "#resume" },
    ],
    langLabel: "EN",
    heroKicker: "E-commerce Portfolio",
    heroTitle: "把内容、货盘、投放和团队拧成可增长的兴趣电商系统。",
    heroBody:
      "8年抖音、3年视频号、1年快手电商经验，覆盖品牌自播、达人种草、短视频内容、千川投放、商城运营和团队管理。",
    heroCta: "查看作品",
    heroSecondary: "项目经历",
    reelLabel: "兴趣电商运营作品集",
    reelMeta: "Douyin / WeChat Channels / Kuaishou",
    stats: [
      ["8年", "抖音电商经验"],
      ["1亿+", "酒水项目年度GMV"],
      ["16人", "跨职能团队管理"],
    ],
    projectsTitle: "项目经历",
    projectsIntro: "先填入简历中可以确定的代表项目，后续再补充真实视频、图片、数据截图和案例详情。",
    projects: [
      {
        year: "2025-至今",
        title: "PEPA品牌兴趣电商运营",
        role: "兴趣电商运营总监 / 深圳三多堂科技有限公司",
        body: "全权操盘品牌兴趣电商，统筹抖音自播、短视频内容、达人种草、商城运营与平台活动，带领16人团队将GSV从170万稳定到280万+，综合ROI从1.89提升至2.3。",
      },
      {
        year: "2022-2024",
        title: "开放式耳机3C项目",
        role: "抖音运营总监 / 深圳市一刻未来科技有限公司",
        body: "从0搭建抖音及视频号运营体系，统筹直播、短视频、BD团队，单月销售额130万+，全年销售额1000万+，客单价约1199元。",
      },
      {
        year: "2020-2022",
        title: "酒水品牌直播冷启动",
        role: "直播运营 / 广东微牛电子商务有限公司",
        body: "代运营国台、百年糊涂、钓鱼台、金沙古酒等酒水品牌，主导新号7天冷启动，首周GMV 50万+，年度GMV超1亿，进入酒水爆款榜单TOP 5。",
      },
    ],
    worksTitle: "个人作品",
    worksIntro: "先以简历中的作品和项目类型占位，后续可替换为真实视频、图片、账号截图与作品链接。",
    works: [
      ["Video", "客家小子账号内容", "客家米粉工厂 / 短视频作品"],
      ["Image", "客家米粉工厂置顶作品", "个人账号 / 图文与视频素材"],
      ["Video", "PEPA品牌短视频内容", "母婴品牌 / 内容运营"],
      ["Image", "隔壁刘奶奶话题策划", "累计播放量1亿+"],
      ["Video", "酒水直播投流素材", "直播间引流 / 脚本与剪辑"],
      ["Image", "兴趣电商经营看板", "GMV / GSV / ROI复盘"],
    ],
    resumeTitle: "个人履历",
    resumeIntro: "根据简历先填入教育经历、工作经历、核心能力和资格信息，后续可继续精修表达。",
    resumeItems: [
      ["教育背景", "深圳大学视觉传达艺术设计本科；广东开放大学电子商务大专；广东省技师学院动漫设计与制作。"],
      ["工作经历", "深圳三多堂科技、深圳青丛生物科技、深圳市一刻未来科技、广东微牛电子商务；累计11年工作经验。"],
      ["核心能力", "品牌自播、达人种草、短视频内容、千川投放、商城运营、货盘设计、数据复盘与团队管理。"],
      ["资格与标签", "驾驶证C1；国家地理摄影师；图虫网签约摄影师；期望城市深圳，求职意向兴趣电商运营总监。"],
    ],
    contactTitle: "更多作品素材待补充",
    contactBody: "下一步可以继续补充客家小子账号视频、置顶图片作品、BOSS直聘APP/微信小程序展示和项目数据截图。",
    contactCta: "联系我",
  },
  en: {
    brand: "Yiyang Huang",
    role: "Interest E-commerce Operations Director / 8 Years Senior Operator",
    nav: [
      { label: "Home", href: "#home" },
      { label: "Projects", href: "#projects" },
      { label: "Works", href: "#works" },
      { label: "Resume", href: "#resume" },
    ],
    langLabel: "中",
    heroKicker: "E-commerce Portfolio",
    heroTitle: "Building scalable interest e-commerce systems across content, products, media buying, and teams.",
    heroBody:
      "8 years of Douyin e-commerce, 3 years of WeChat Channels, and 1 year of Kuaishou experience across brand livestreaming, creator seeding, short video content, Qianchuan ads, store operations, and team management.",
    heroCta: "View works",
    heroSecondary: "Projects",
    reelLabel: "Interest e-commerce portfolio",
    reelMeta: "Douyin / WeChat Channels / Kuaishou",
    stats: [
      ["8 yrs", "Douyin e-commerce"],
      ["100M+", "Annual GMV in liquor projects"],
      ["16", "Cross-functional team members"],
    ],
    projectsTitle: "Project Experience",
    projectsIntro: "Representative resume projects are filled in first; videos, images, screenshots, and deeper case details can be added later.",
    projects: [
      {
        year: "2025-Present",
        title: "PEPA Interest E-commerce Operations",
        role: "Operations Director / Shenzhen Sanduotang Technology",
        body: "Led brand interest e-commerce operations across Douyin livestreaming, short videos, creator seeding, store operations, and campaign planning. Managed a 16-person team, growing GSV from RMB 1.7M to 2.8M+ and improving ROI from 1.89 to 2.3.",
      },
      {
        year: "2022-2024",
        title: "Open-ear Headphone 3C Project",
        role: "Douyin Operations Director / Shenzhen Yike Future Technology",
        body: "Built Douyin and WeChat Channels operations from scratch, leading livestreaming, short video, and BD teams. Achieved RMB 1.3M+ monthly sales and RMB 10M+ annual sales with an average order value around RMB 1,199.",
      },
      {
        year: "2020-2022",
        title: "Liquor Brand Livestream Launches",
        role: "Livestream Operations / Guangdong Weiniu E-commerce",
        body: "Operated livestream accounts for Guotai, Bainian Hututu, Diaoyutai, Jinsha Gujiu, and other liquor brands. Led 7-day cold starts, achieving RMB 500K+ first-week GMV and RMB 100M+ annual GMV with products entering the platform TOP 5 list.",
      },
    ],
    worksTitle: "Selected Works",
    worksIntro: "Resume-backed work placeholders are filled in first, ready to be replaced with real videos, images, account screenshots, and links.",
    works: [
      ["Video", "Kejia Xiaozi Account Content", "Kejia Rice Noodle Factory / Short videos"],
      ["Image", "Pinned Kejia Rice Noodle Works", "Personal account / Image and video assets"],
      ["Video", "PEPA Brand Short Videos", "Mother and baby brand / Content operations"],
      ["Image", "Gebiliunainai Topic Planning", "100M+ cumulative views"],
      ["Video", "Liquor Livestream Ad Creatives", "Traffic acquisition / Scripts and edits"],
      ["Image", "E-commerce Performance Dashboard", "GMV / GSV / ROI reviews"],
    ],
    resumeTitle: "Resume",
    resumeIntro: "Education, work experience, core strengths, and qualifications are filled in from the resume and can be refined later.",
    resumeItems: [
      ["Education", "Shenzhen University, Visual Communication Art Design; Guangdong Open University, E-commerce; Guangdong Technician College, Animation Design and Production."],
      ["Experience", "Shenzhen Sanduotang Technology, Shenzhen Qingcong Biotechnology, Shenzhen Yike Future Technology, and Guangdong Weiniu E-commerce; 11 years of total work experience."],
      ["Core Skills", "Brand livestreaming, creator seeding, short video content, Qianchuan ads, store operations, product planning, data review, and team management."],
      ["Certificates", "C1 driving license; National Geographic photographer; contracted photographer on Tuchong; target city: Shenzhen."],
    ],
    contactTitle: "More work materials to add",
    contactBody: "Next, we can add Kejia Xiaozi videos, pinned image works, BOSS Zhipin APP / WeChat mini program showcases, and project data screenshots.",
    contactCta: "Contact",
  },
} as const;

function playQuietly(video: HTMLVideoElement) {
  void video.play().catch(() => {
    // Some browsers pause background media to save power; the static poster frame still carries the hero.
  });
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);
  const restartTimeoutRef = useRef<number | null>(null);
  const t = copy[locale];

  const cancelFade = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const fadeVideoTo = useCallback(
    (targetOpacity: number) => {
      const video = videoRef.current;
      if (!video) return;

      cancelFade();

      const duration = 520;
      const startTime = performance.now();
      const startOpacity = Number.parseFloat(video.style.opacity || "0");

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        video.style.opacity = String(startOpacity + (targetOpacity - startOpacity) * progress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        video.style.opacity = String(targetOpacity);
        animationFrameRef.current = null;
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [cancelFade],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    const handleLoadedData = () => {
      fadingOutRef.current = false;
      playQuietly(video);
      fadeVideoTo(1);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;

      if (video.duration - video.currentTime <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeVideoTo(0);
      }
    };

    const handleEnded = () => {
      cancelFade();
      video.style.opacity = "0";

      if (restartTimeoutRef.current !== null) {
        window.clearTimeout(restartTimeoutRef.current);
      }

      restartTimeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        playQuietly(video);
        fadeVideoTo(1);
      }, 120);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelFade();
      if (restartTimeoutRef.current !== null) {
        window.clearTimeout(restartTimeoutRef.current);
      }
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [cancelFade, fadeVideoTo]);

  const workIcons = useMemo(() => ({ Video: Clapperboard, Image }), []);

  return (
    <main className="min-h-screen bg-[#090909] text-[#f7f1e8]">
      <section id="home" className="hero-shell relative flex min-h-screen flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_URL}
          muted
          autoPlay
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.88),rgba(6,6,6,0.48)_48%,rgba(6,6,6,0.72))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(67,210,190,0.18),transparent_34%),radial-gradient(circle_at_30%_75%,rgba(238,105,83,0.2),transparent_30%)]" />

        <nav className="relative z-20 px-4 py-4 sm:px-6 lg:px-8">
          <div className="glass-bar mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <a href="#home" className="flex min-w-0 items-center gap-3" aria-label={t.brand}>
              <img
                className="h-9 w-9 shrink-0 rounded-full border border-white/25 object-cover"
                src="/images/avatar.jpg"
                alt={t.brand}
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">{t.brand}</span>
                <span className="hidden text-xs text-white/58 sm:block">{t.role}</span>
              </span>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {t.nav.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </div>

            <button
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/18 px-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              type="button"
              onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
              aria-label="Switch language"
            >
              <Languages size={16} aria-hidden="true" />
              {t.langLabel}
            </button>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-8 pt-16 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#94f0dc]">
                <Play size={13} aria-hidden="true" />
                {t.heroKicker}
              </p>
              <h1 className="hero-title text-balance text-5xl font-medium leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">{t.heroBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="primary-action" href="#works">
                  {t.heroCta}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a className="secondary-action" href="#projects">
                  {t.heroSecondary}
                </a>
              </div>
            </div>

            <aside className="glass-panel p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{t.reelLabel}</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">{t.reelMeta}</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#43d2be] text-[#08211e]">
                  <Clapperboard size={18} aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {t.stats.map(([value, label]) => (
                  <div key={label} className="stat-cell">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="projects" className="content-band bg-[#f7f1e8] text-[#151515]">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <BriefcaseBusiness size={15} aria-hidden="true" />
              01
            </p>
            <h2>{t.projectsTitle}</h2>
          </div>
          <p>{t.projectsIntro}</p>
        </div>

        <div className="project-list">
          {t.projects.map((project) => (
            <article key={project.title} className="project-row">
              <span>{project.year}</span>
              <div>
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
              </div>
              <p>{project.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="works" className="content-band bg-[#101312] text-[#f7f1e8]">
        <div className="section-heading">
          <div>
            <p className="eyebrow text-[#94f0dc]">
              <Clapperboard size={15} aria-hidden="true" />
              02
            </p>
            <h2>{t.worksTitle}</h2>
          </div>
          <p className="text-white/62">{t.worksIntro}</p>
        </div>

        <div className="work-grid">
          {t.works.map(([type, title, meta], index) => {
            const Icon = workIcons[type as keyof typeof workIcons];

            return (
              <article key={title} className="work-tile">
                <div className={`work-visual work-visual-${index + 1}`}>
                  <span>
                    <Icon size={18} aria-hidden="true" />
                    {type}
                  </span>
                </div>
                <div className="work-copy">
                  <h3>{title}</h3>
                  <p>{meta}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="resume" className="content-band bg-[#f7f1e8] text-[#151515]">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <FileText size={15} aria-hidden="true" />
              03
            </p>
            <h2>{t.resumeTitle}</h2>
          </div>
          <p>{t.resumeIntro}</p>
        </div>

        <div className="resume-grid">
          {t.resumeItems.map(([title, body]) => (
            <article key={title} className="resume-item">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

        <div className="contact-strip">
          <div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
          </div>
          <a href="mailto:844387279@qq.com" className="primary-action dark">
            <Mail size={18} aria-hidden="true" />
            {t.contactCta}
          </a>
        </div>
      </section>
    </main>
  );
}
