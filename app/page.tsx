const highlights = [
  { value: "8年+", label: "抖音电商实操经验" },
  { value: "1亿+", label: "酒水项目年度 GMV" },
  { value: "16人", label: "跨职能团队管理" },
  { value: "64.71%", label: "近期品牌 GSV 增长" },
];

const cases = [
  {
    name: "PEPA 品牌兴趣电商经营",
    tag: "母婴个护 / 全盘操盘",
    metric: "GSV 170w -> 280w+",
    details:
      "负责品牌兴趣电商经营策略，统筹自播、短视频、达人种草、商城与活动节点，推动 ROI 从 1.89 提升至 2.3。",
  },
  {
    name: "酒水品牌冷启动与爆品增长",
    tag: "酒水 / 代运营",
    metric: "年度 GMV 1亿+",
    details:
      "主导新号 7 天冷启动，首周 GMV 50万+，首月 GMV 100万+，后续单月最高 GMV 1000万，进入酒水爆款榜单 TOP 5。",
  },
  {
    name: "高客单 3C 数码增长体系",
    tag: "3C 数码 / 抖音 + 视频号",
    metric: "全年销售额 1000万+",
    details:
      "从 0 搭建内容、直播、BD 与投放团队，围绕客单价约 1199 元的开放式耳机建立内容种草和直播收割模型。",
  },
  {
    name: "隔壁刘奶奶内容话题策划",
    tag: "乳制品 / 内容运营",
    metric: "话题播放 1亿+",
    details:
      "输出达人 brief、脚本方向与短视频切片策略，带动账号粉丝增长与销售转化，单月曝光量达 2亿+。",
  },
];

const capabilities = [
  "品牌自播与直播间诊断",
  "短视频内容策略与素材测试",
  "达人种草与星图协同",
  "千川 / DOU+ / 随心推投放",
  "货盘设计与客单价提升",
  "商城运营与节点活动规划",
  "团队搭建、培训与绩效机制",
  "数据复盘与经营分析",
];

const timeline = [
  {
    period: "2025.10 - 至今",
    company: "深圳三多堂科技有限公司",
    role: "兴趣电商运营总监",
  },
  {
    period: "2024.04 - 2025.09",
    company: "深圳青丛生物科技有限公司",
    role: "内容运营",
  },
  {
    period: "2022.08 - 2024.02",
    company: "深圳市一刻未来科技有限公司",
    role: "抖音运营总监",
  },
  {
    period: "2020.07 - 2022.07",
    company: "广东微牛电子商务有限公司",
    role: "直播运营",
  },
  {
    period: "2025.03 - 至今",
    company: "客家米粉工厂",
    role: "自主创业项目",
  },
];

const kejiaVideos = [
  {
    title: "183 套装短视频 01",
    src: "/videos/kjx/183-set-1.mp4",
    note: "客家小子账号内容成片",
  },
  {
    title: "183 套装短视频 02",
    src: "/videos/kjx/183-set-2.mp4",
    note: "产品卖点表达与场景展示",
  },
  {
    title: "183 套装短视频 03",
    src: "/videos/kjx/183-set-3.mp4",
    note: "短视频内容素材沉淀",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="作品集导航">
          <a className="brand" href="#top" aria-label="回到首页">
            黄伊阳
          </a>
          <div className="navLinks">
            <a href="#cases">项目</a>
            <a href="#method">能力</a>
            <a href="#experience">经历</a>
            <a href="#works">视频</a>
            <a href="#contact">联系</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">兴趣电商运营总监 / 资深运营 8 年</p>
            <h1>把内容、货盘、投放和团队拧成可增长的经营系统。</h1>
            <p className="lead">
              我专注抖音、视频号、快手等兴趣电商场景，擅长从 0-1
              搭建品牌自播、达人种草、短视频内容、千川投放和商城运营闭环。
            </p>
            <div className="heroActions">
              <a className="primaryAction" href="#cases">
                查看代表项目
              </a>
              <a className="secondaryAction" href="#contact">
                合作沟通
              </a>
            </div>
          </div>

          <div className="growthBoard" aria-label="核心增长指标看板">
            <div className="boardHeader">
              <span>Growth Portfolio</span>
              <strong>GMV / ROI / Team</strong>
            </div>
            <div className="chartBars" aria-hidden="true">
              <span style={{ height: "42%" }} />
              <span style={{ height: "78%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "92%" }} />
              <span style={{ height: "68%" }} />
            </div>
            <div className="boardMetric">
              <span>近期品牌增长</span>
              <strong>+64.71%</strong>
            </div>
            <div className="boardPills">
              <span>直播诊断</span>
              <span>内容种草</span>
              <span>投放优化</span>
            </div>
          </div>
        </div>

        <div className="highlightGrid">
          {highlights.map((item) => (
            <div className="highlight" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="sectionLabel">Portfolio Structure</p>
          <h2>首版架构先围绕“能证明增长能力”的内容展开。</h2>
        </div>
        <p>
          后续可以继续加入真实直播间截图、短视频作品、达人合作案例、账号数据看板、摄影作品和个人账号内容，让这个网站逐步从简历型页面升级成完整个人品牌站。
        </p>
      </section>

      <section className="section" id="cases">
        <div className="sectionHead">
          <p className="sectionLabel">Selected Work</p>
          <h2>代表项目</h2>
        </div>
        <div className="caseGrid">
          {cases.map((item) => (
            <article className="caseCard" key={item.name}>
              <p>{item.tag}</p>
              <h3>{item.name}</h3>
              <strong>{item.metric}</strong>
              <span>{item.details}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="methodSection" id="method">
        <div className="methodCopy">
          <p className="sectionLabel">Operating Method</p>
          <h2>我的操盘方法</h2>
          <p>
            先判断品类、客单价和决策链路，再匹配内容打法、直播承接、投放模型和组织节奏。增长不是单点技巧，而是每周复盘、持续测试和跨团队协同的结果。
          </p>
        </div>
        <div className="capabilityGrid">
          {capabilities.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section" id="experience">
        <div className="sectionHead">
          <p className="sectionLabel">Experience</p>
          <h2>经历路径</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timelineItem" key={`${item.company}-${item.role}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="worksPreview" id="works">
        <div>
          <p className="sectionLabel">Personal Account</p>
          <h2>个人账号“客家小子”视频作品</h2>
          <p className="worksIntro">
            围绕客家米粉工厂项目沉淀的短视频成片，用于展示店铺定位、内容选题、产品表达和商业转化能力。
          </p>
        </div>
        <div className="videoGrid">
          {kejiaVideos.map((video) => (
            <article className="videoCard" key={video.src}>
              <video controls preload="metadata" playsInline>
                <source src={video.src} type="video/mp4" />
                你的浏览器暂不支持视频播放。
              </video>
              <div>
                <h3>{video.title}</h3>
                <p>{video.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="sectionLabel">Contact</p>
        <h2>深圳 / 兴趣电商运营总监</h2>
        <div className="contactLinks">
          <a href="tel:13424243016">13424243016</a>
          <a href="mailto:844387279@qq.com">844387279@qq.com</a>
        </div>
      </section>
    </main>
  );
}
