"use client";

import {
  BrainCircuit,
  Clapperboard,
  DatabaseZap,
  Languages,
  Mail,
  Phone,
  ScanLine,
  Store,
  Target,
  UserRound,
  Workflow,
  X,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import BorderGlow from "./components/BorderGlow";
import SoftAurora from "./components/SoftAurora";

const HERO_VIDEO_URL = "/videos/home/hero.mp4";
const featuredVideos = Array.from({ length: 12 }, (_, index) => ({
  title: `${index + 1}`,
  src: ["/videos/kjx/183-set-1.mp4", "/videos/kjx/183-set-2.mp4", "/videos/kjx/183-set-3.mp4", "/videos/home/hero.mp4"][index % 4],
}));

type Locale = "zh" | "en";

const copy = {
  zh: {
    brand: "黄伊阳",
    role: "兴趣电商资深运营",
    nav: [
      ["首页", "#home"],
      ["个人履历", "#profile"],
      ["项目经历", "#projects"],
      ["个人作品", "#works"],
      ["联系", "#contact"],
    ],
    lang: "EN",
    heroTitle: "兴趣电商资深运营",
    heroText:
      "8年抖音电商 / 3年微信小店运营 / 1年快手电商经验。擅长品牌自播、达人种草、短视频内容、千川投放、商城运营、团队管理，并将AI用于内容生产、数据复盘和经营决策。",
    heroPrimary: "查看项目",
    heroSecondary: "联系沟通",
    profileTitle: "个人履历",
    profileBody:
      "我更像一个经营型运营：既能拆GMV、ROI、货盘和人群，也能落到直播间脚本、素材生产、投放模型和团队执行。现在重点补强AI工具能力，用自动化、内容生成和数据分析提高运营效率。",
    contact: ["13424243016", "844387279@qq.com", "深圳"],
    metrics: [
      ["11年", "总工作经验"],
      ["1亿+", "酒水项目年度GMV"],
      ["64.71%", "PEPA品牌GSV增长"],
      ["16人", "跨职能团队管理"],
    ],
    profileTags: ["抖音电商", "视频号", "快手", "千川投放", "达人种草", "AI辅助运营"],
    timelineTitle: "年份经历",
    timelineLead: "用横向滚动方式呈现从设计教育、直播运营、兴趣电商操盘到AI辅助运营的成长路径。",
    timeline: [
      ["2013-2015", "动漫设计与制作", "广东省技师学院，全日制学习，建立视觉表达和内容审美基础。"],
      ["2020-2022", "酒水直播运营", "完成直播间冷启动、排品、投放、主播培训与复盘，年度GMV超1亿。"],
      ["2022-2024", "3C品牌抖音运营", "从0搭建抖音与视频号运营体系，全年销售额1000万+。"],
      ["2024-2025", "内容运营升级", "参与隔壁刘奶奶话题策划，累计播放量1亿+，推动内容与商业转化联动。"],
      ["2025-至今", "兴趣电商运营总监", "操盘PEPA品牌，GSV从170万稳定到280万+，综合ROI提升至2.3。"],
      ["NOW", "AI辅助运营", "用AI工具辅助选题、脚本、素材变体、数据复盘与经营决策。"],
    ],
    projectsTitle: "项目经历",
    projectsLead: "用大卡片先搭好项目陈列方式，后续可替换为真实截图、视频封面、后台数据图和案例复盘。",
    projects: [
      {
        title: "PEPA品牌兴趣电商",
        meta: "2025-至今 / 兴趣电商运营总监",
        result: "GSV 170万 → 280万+，ROI 1.89 → 2.3",
        body: "统筹抖音自播、短视频、达人种草、商城运营和节点活动，管理品牌、直播、内容、BD等16人团队。",
        visual: "GSV +64.71%",
      },
      {
        title: "开放式耳机3C项目",
        meta: "2022-2024 / 抖音运营总监",
        result: "年销售额1000万+，客单价约1199元",
        body: "从0搭建抖音及视频号运营体系，形成内容生产、直播转化、投放复盘和达人种草闭环。",
        visual: "3C / AOV 1199",
      },
      {
        title: "酒水品牌直播冷启动",
        meta: "2020-2022 / 直播运营",
        result: "年度GMV超1亿，酒水爆款榜TOP 5",
        body: "代运营国台、百年糊涂、钓鱼台、金沙古酒等品牌，完成冷启动、排品、投放、主播培训与复盘。",
        visual: "GMV 100M+",
      },
      {
        title: "客家米粉工厂",
        meta: "2025-至今 / 自主创业项目",
        result: "年销售额400万+，单月峰值100万+",
        body: "负责店铺定位、内容选题、直播/短视频运营、货盘设计和商业变现，沉淀个人账号内容资产。",
        visual: "Founder Project",
      },
    ],
    worksTitle: "个人作品",
    worksLead: "这里先展示我的能力模块，后续可以接入真实作品卡、AI工作流截图、短视频案例和数据面板。",
    works: [
      ["AI内容工作流", "用AI辅助选题、脚本、标题、卖点拆解和批量素材变体，提高短视频内容迭代速度。"],
      ["数据复盘系统", "围绕GMV、GSV、ROI、CTR、CVR、停留、互动等指标搭建复盘逻辑和经营看板。"],
      ["直播间增长模型", "从人货场、话术、排品、投放和复购设计直播间诊断与增长方案。"],
      ["达人种草策略", "输出达人brief、脚本建议、内容方向与效果追踪，联动自然流和付费流量。"],
      ["投放与素材测试", "使用千川、DOU+、小店随心推、种草通、星图热推等工具做预算和素材优化。"],
      ["团队协同机制", "建立主播、内容、BD、品牌等岗位职责、培训机制、绩效指标和复盘节奏。"],
    ],
    contactTitle: "LET'S BUILD BETTER GROWTH SYSTEMS",
    contactLead: "联系我，一起把内容、数据和 AI 变成增长系统。",
    qr: "微信二维码待上传",
  },
  en: {
    brand: "Eayon Wong",
    role: "Senior Interest E-commerce Operator",
    nav: [
      ["Home", "#home"],
      ["Profile", "#profile"],
      ["Projects", "#projects"],
      ["Works", "#works"],
      ["Contact", "#contact"],
    ],
    lang: "中",
    heroTitle: "Senior Interest E-commerce Operator",
    heroText:
      "8 years in Douyin e-commerce / 3 years in WeChat Shop operations / 1 year in Kuaishou e-commerce. I connect brand livestreaming, creator seeding, short video content, paid traffic, store operations, team management, and AI-assisted workflows.",
    heroPrimary: "View projects",
    heroSecondary: "Contact",
    profileTitle: "Profile",
    profileBody:
      "I operate as a business-minded growth operator: breaking down GMV, ROI, product structure, and audience strategy while staying close to livestream scripts, content production, ad models, and team execution. My current focus is applying AI tools to content, analysis, and decisions.",
    contact: ["13424243016", "844387279@qq.com", "Shenzhen"],
    metrics: [
      ["11 yrs", "Work experience"],
      ["100M+", "Annual liquor GMV"],
      ["64.71%", "PEPA GSV growth"],
      ["16", "Team members"],
    ],
    profileTags: ["Douyin", "WeChat Channels", "Kuaishou", "Qianchuan Ads", "Creator Seeding", "AI Ops"],
    timelineTitle: "Timeline",
    timelineLead: "A horizontal career path from visual design education to livestream operations, interest e-commerce, and AI-assisted operations.",
    timeline: [
      ["2013-2015", "Animation Design", "Full-time study at Guangdong Technician College, building a foundation in visual expression."],
      ["2020-2022", "Liquor Livestream Ops", "Led cold starts, product planning, paid traffic, host training, and reviews; annual GMV exceeded RMB 100M."],
      ["2022-2024", "3C Douyin Operations", "Built Douyin and WeChat Channels operations from scratch; annual sales exceeded RMB 10M."],
      ["2024-2025", "Content Operations", "Worked on Gebiliunainai topic planning with 100M+ cumulative views and commercial conversion."],
      ["2025-Present", "Operations Director", "Led PEPA operations, growing GSV from RMB 1.7M to 2.8M+ and ROI to 2.3."],
      ["NOW", "AI-assisted Ops", "Apply AI tools to topics, scripts, creative variants, data review, and operating decisions."],
    ],
    projectsTitle: "Project Experience",
    projectsLead: "Large cards establish the project gallery. Later we can replace these with real screenshots, covers, dashboards, and case studies.",
    projects: [
      {
        title: "PEPA Interest E-commerce",
        meta: "2025-Present / Operations Director",
        result: "GSV RMB 1.7M → 2.8M+, ROI 1.89 → 2.3",
        body: "Led Douyin livestreaming, short videos, creator seeding, store operations, campaigns, and a 16-person cross-functional team.",
        visual: "GSV +64.71%",
      },
      {
        title: "Open-ear Headphone 3C Project",
        meta: "2022-2024 / Douyin Operations Director",
        result: "RMB 10M+ annual sales, AOV around RMB 1,199",
        body: "Built Douyin and WeChat Channels operations from scratch, connecting content, livestream conversion, ads, and creators.",
        visual: "3C / AOV 1199",
      },
      {
        title: "Liquor Brand Livestream Launches",
        meta: "2020-2022 / Livestream Operations",
        result: "RMB 100M+ annual GMV, TOP 5 liquor product list",
        body: "Operated brands including Guotai, Bainian Hututu, Diaoyutai, and Jinsha Gujiu across launch, product planning, ads, training, and review.",
        visual: "GMV 100M+",
      },
      {
        title: "Kejia Rice Noodle Factory",
        meta: "2025-Present / Founder Project",
        result: "RMB 4M+ annual sales, RMB 1M+ monthly peak",
        body: "Owned positioning, content planning, livestream and short video operations, product structure, and commercial conversion.",
        visual: "Founder Project",
      },
    ],
    worksTitle: "Selected Capabilities",
    worksLead: "Capability cards first; later we can plug in real work cards, AI workflow screenshots, video cases, and dashboards.",
    works: [
      ["AI Content Workflow", "Use AI for topics, scripts, titles, selling points, and content variants to accelerate iteration."],
      ["Data Review System", "Build review logic around GMV, GSV, ROI, CTR, CVR, retention, engagement, and operating dashboards."],
      ["Livestream Growth Model", "Diagnose and improve livestream rooms through people, products, scenes, scripts, pricing, ads, and retention."],
      ["Creator Seeding Strategy", "Create briefs, script suggestions, creative directions, and performance tracking across creators."],
      ["Ads and Creative Testing", "Optimize budgets, targeting, creative assets, and plans across Qianchuan, DOU+, and related tools."],
      ["Team Collaboration", "Set up roles, training, performance indicators, and review rhythms across host, content, BD, and brand teams."],
    ],
    contactTitle: "LET'S BUILD BETTER GROWTH SYSTEMS",
    contactLead: "Let content, data, and AI become a stronger growth system.",
    qr: "WeChat QR to upload",
  },
} as const;

const workIcons = [BrainCircuit, DatabaseZap, Store, Target, Clapperboard, Workflow];

function playQuietly(video: HTMLVideoElement) {
  void video.play().catch(() => {});
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [loadProgress, setLoadProgress] = useState(50);
  const [introDone, setIntroDone] = useState(false);
  const [activeVideo, setActiveVideo] = useState<(typeof featuredVideos)[number] | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const t = copy[locale];
  const timelineImages = ["/images/avatar.jpg", "/og.png", "/og.png", "/images/avatar.jpg", "/og.png", "/images/avatar.jpg"];

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
    const revealTargets = document.querySelectorAll(
      ".heroInner, .sectionHead, .profileGrid, .metricCard, .projectCard, .abilityCard, .contactInner",
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

      <main>
      <section className="hero" id="home">
        <video ref={videoRef} className="heroVideo" src={HERO_VIDEO_URL} muted autoPlay loop playsInline preload="auto" />
        <div className="heroShade" />

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

        <div className="heroInner">
          <h1>{t.heroTitle}</h1>
          <p className="heroText">{locale === "zh" ? "8年抖音电商 / 3年微信小店" : "8 years Douyin / 3 years WeChat Shop"}</p>
        </div>

        <div className="featuredVideoRail" aria-label="代表作视频">
          {[...featuredVideos, ...featuredVideos].map((video, index) => (
            <button className="featuredVideoCard" type="button" key={`${video.title}-${index}`} onClick={() => setActiveVideo(video)}>
              <strong>{video.title}</strong>
            </button>
          ))}
        </div>
      </section>

      {activeVideo ? (
        <div className="videoModal" role="dialog" aria-modal="true" aria-label={activeVideo.title}>
          <button className="videoModalClose" type="button" onClick={() => setActiveVideo(null)} aria-label="关闭视频">
            <X size={28} aria-hidden="true" />
          </button>
          <div className="videoModalFrame">
            <video src={activeVideo.src} controls autoPlay playsInline />
          </div>
        </div>
      ) : null}

      <section className="section profileSection" id="profile">
        <div className="sectionHead">
          <span>01 / Profile</span>
          <h2>{t.profileTitle}</h2>
        </div>

        <div className="profileGrid">
          <BorderGlow className="portraitCard" animated={false}>
            <img src="/images/avatar.jpg" alt={t.brand} />
            <div>
              <strong>{t.brand}</strong>
              <span>{t.role}</span>
            </div>
          </BorderGlow>

          <BorderGlow className="profileCopy" animated={false}>
            <p>{t.profileBody}</p>
            <div className="tagCloud">
              {t.profileTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </BorderGlow>

          <BorderGlow className="contactPanel" animated={false}>
            <a href="tel:13424243016">
              <Phone size={18} aria-hidden="true" />
              {t.contact[0]}
            </a>
            <a href="mailto:844387279@qq.com">
              <Mail size={18} aria-hidden="true" />
              {t.contact[1]}
            </a>
            <span>
              <UserRound size={18} aria-hidden="true" />
              {t.contact[2]}
            </span>
          </BorderGlow>
        </div>

        <div className="metricGrid">
          {t.metrics.map(([value, label]) => (
            <BorderGlow className="metricCard" key={label} animated={false}>
              <strong>{value}</strong>
              <span>{label}</span>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="timelineSection" id="timeline">
        <div className="sectionHead wide timelineHead">
          <span>02 / Timeline</span>
          <h2>{t.timelineTitle}</h2>
          <p>{t.timelineLead}</p>
        </div>
        <div className="careerScroller" aria-label={t.timelineTitle}>
          <div className="careerTrack">
            {t.timeline.map(([year, title, body], index) => (
              <article className="careerCard" key={`${year}-${title}`}>
                <strong>{year}</strong>
                <img src={timelineImages[index]} alt={title} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="sectionHead wide">
          <span>03 / Projects</span>
          <h2>{t.projectsTitle}</h2>
          <p>{t.projectsLead}</p>
        </div>

        <div className="projectGrid">
          {t.projects.map((project, index) => (
            <BorderGlow className="projectCard" key={project.title} animated={false}>
              <div className={`projectVisual visual${index + 1}`}>
                <span>{project.visual}</span>
              </div>
              <div className="projectContent">
                <p>{project.meta}</p>
                <h3>{project.title}</h3>
                <strong>{project.result}</strong>
                <span>{project.body}</span>
              </div>
            </BorderGlow>
          ))}
        </div>
      </section>

      <section className="section worksSection" id="works">
        <div className="sectionHead wide">
          <span>04 / Works</span>
          <h2>{t.worksTitle}</h2>
          <p>{t.worksLead}</p>
        </div>

        <div className="worksGrid">
          {t.works.map(([title, body], index) => {
            const Icon = workIcons[index];
            return (
              <BorderGlow className="abilityCard" key={title} animated={false}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </BorderGlow>
            );
          })}
        </div>
      </section>

      <section className="contactPage" id="contact">
        <BorderGlow className="contactInner" animated={false}>
          <p className="signal">
            <ScanLine size={16} aria-hidden="true" />
            Contact
          </p>
          <h2>{t.contactTitle}</h2>

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
              <img src="/images/wechat-qr.jpg" alt={locale === "zh" ? "微信二维码" : "WeChat QR code"} />
            </div>
          </div>
        </BorderGlow>
      </section>
      </main>
    </>
  );
}
