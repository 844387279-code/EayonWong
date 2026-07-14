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
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4";

type Locale = "zh" | "en";

const copy = {
  zh: {
    brand: "Yiyang Huang",
    role: "影像 / 视觉 / 创意作品集",
    nav: [
      { label: "首页", href: "#home" },
      { label: "项目经历", href: "#projects" },
      { label: "个人作品", href: "#works" },
      { label: "个人履历", href: "#resume" },
    ],
    langLabel: "EN",
    heroKicker: "Portfolio 2026",
    heroTitle: "用影像、图片和叙事，把想法变成可感知的作品。",
    heroBody:
      "这里会集中展示我的个人项目、视频作品、摄影图像和履历。当前是第一版网站架构，内容会随着后续素材逐步更新。",
    heroCta: "查看作品",
    heroSecondary: "项目经历",
    reelLabel: "主页视频背景",
    reelMeta: "Showreel / Short film / Visual study",
    stats: [
      ["12+", "待整理作品"],
      ["04", "核心栏目"],
      ["ZH/EN", "双语切换"],
    ],
    projectsTitle: "项目经历",
    projectsIntro: "先用清晰的条目承载项目背景、我的角色、产出形式和后续可补充链接。",
    projects: [
      {
        year: "2026",
        title: "沉浸式短片项目",
        role: "导演 / 剪辑 / 视觉统筹",
        body: "以视频为主的叙事项目区域，后续可加入预告片、幕后照、项目说明和合作名单。",
      },
      {
        year: "2025",
        title: "品牌视觉内容",
        role: "影像策划 / 摄影 / 后期",
        body: "适合展示商业拍摄、活动纪录、社交媒体视觉资产，以及成片效果对比。",
      },
      {
        year: "2024",
        title: "个人视觉实验",
        role: "创意概念 / 影像实验",
        body: "用于收纳风格探索、影像练习、图像系列和正在发展的长期主题。",
      },
    ],
    worksTitle: "个人作品",
    worksIntro: "视频和图片作品会以可筛选的网格呈现；现在先建立视觉节奏和信息层级。",
    works: [
      ["Video", "城市夜行", "短片 / 01:42"],
      ["Image", "光线练习", "摄影系列 / 12张"],
      ["Video", "人物切片", "纪录片段 / 03:18"],
      ["Image", "静物与空间", "图像研究 / 8张"],
      ["Video", "动态海报", "Motion / 00:24"],
      ["Image", "色彩档案", "视觉实验 / 16张"],
    ],
    resumeTitle: "个人履历",
    resumeIntro: "这一栏会放教育经历、工作经历、奖项、技能和联系方式，方便访客快速了解你。",
    resumeItems: [
      ["教育背景", "填写学校、专业、交换项目或相关课程。"],
      ["工作 / 实习", "填写团队、职位、负责内容与代表项目。"],
      ["技能工具", "剪辑、调色、摄影、设计、动效、策划等。"],
      ["奖项 / 展映", "填写展映、奖项、发表、合作机构或媒体报道。"],
    ],
    contactTitle: "准备替换成真实内容",
    contactBody: "下一步可以把首页视频、作品图片、项目文案和履历信息逐一换成你的真实素材。",
    contactCta: "联系我",
  },
  en: {
    brand: "Yiyang Huang",
    role: "Film / Visual / Creative Portfolio",
    nav: [
      { label: "Home", href: "#home" },
      { label: "Projects", href: "#projects" },
      { label: "Works", href: "#works" },
      { label: "Resume", href: "#resume" },
    ],
    langLabel: "中",
    heroKicker: "Portfolio 2026",
    heroTitle: "Turning ideas into felt experiences through video, images, and narrative.",
    heroBody:
      "A home for my personal projects, video work, photography, and resume. This first version sets up the structure so real materials can be added piece by piece.",
    heroCta: "View works",
    heroSecondary: "Projects",
    reelLabel: "Homepage video background",
    reelMeta: "Showreel / Short film / Visual study",
    stats: [
      ["12+", "Works to curate"],
      ["04", "Core sections"],
      ["ZH/EN", "Language switch"],
    ],
    projectsTitle: "Project Experience",
    projectsIntro: "A clear structure for project context, your role, deliverables, and future links.",
    projects: [
      {
        year: "2026",
        title: "Immersive Short Film",
        role: "Director / Editor / Visual Lead",
        body: "A video-led narrative project area for trailers, stills, notes, credits, and process material.",
      },
      {
        year: "2025",
        title: "Brand Visual Content",
        role: "Creative Planning / Photography / Post",
        body: "For commercial shoots, event documentation, social visuals, and before-after presentation.",
      },
      {
        year: "2024",
        title: "Personal Visual Studies",
        role: "Concept / Moving Image Experiment",
        body: "A home for style tests, visual exercises, image series, and developing long-term themes.",
      },
    ],
    worksTitle: "Selected Works",
    worksIntro: "Video and image pieces will live in a scannable grid. For now, the page establishes rhythm and hierarchy.",
    works: [
      ["Video", "Night Walks", "Short film / 01:42"],
      ["Image", "Light Study", "Photo series / 12 images"],
      ["Video", "Portrait Cuts", "Documentary fragment / 03:18"],
      ["Image", "Objects and Rooms", "Image study / 8 images"],
      ["Video", "Motion Poster", "Motion / 00:24"],
      ["Image", "Color Archive", "Visual experiment / 16 images"],
    ],
    resumeTitle: "Resume",
    resumeIntro: "A compact area for education, experience, awards, skills, and contact details.",
    resumeItems: [
      ["Education", "Add school, major, exchange programs, or relevant coursework."],
      ["Work / Internship", "Add teams, roles, responsibilities, and representative projects."],
      ["Skills", "Editing, color, photography, design, motion, planning, and more."],
      ["Awards / Screenings", "Add screenings, awards, publications, partners, or press."],
    ],
    contactTitle: "Ready for your real materials",
    contactBody: "Next, we can replace the video, images, project copy, and resume entries with your actual content.",
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
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7f1e8] text-[#111]">
                <Sparkles size={18} aria-hidden="true" />
              </span>
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
          <a href="mailto:hello@example.com" className="primary-action dark">
            <Mail size={18} aria-hidden="true" />
            {t.contactCta}
          </a>
        </div>
      </section>
    </main>
  );
}
