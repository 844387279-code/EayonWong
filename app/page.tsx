"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const aboutDecor = [
  {
    className: "decor decorMoon",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    alt: "",
  },
  {
    className: "decor decorLeftObject",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    alt: "",
  },
  {
    className: "decor decorLego",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    alt: "",
  },
  {
    className: "decor decorGroup",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    alt: "",
  },
];

const services = [
  {
    title: "3D Modeling",
    body: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    title: "Rendering",
    body: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    title: "Motion Design",
    body: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    title: "Branding",
    body: "Crafting cohesive visual identities from logos to full brand systems that communicate a clear and memorable presence.",
  },
  {
    title: "Web Design",
    body: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

const projects = [
  {
    name: "Nextlevel Studio",
    category: "Client",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    ],
  },
  {
    name: "Aura Brand Identity",
    category: "Personal",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    ],
  },
  {
    name: "Solaris Digital",
    category: "Client",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    ],
  },
];

function useInViewClass() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px", threshold: 0.02 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ContactButton({ className = "" }: { className?: string }) {
  return (
    <a className={`contactButton ${className}`} href="mailto:hello@jack.studio">
      Contact Me
    </a>
  );
}

function LiveProjectButton() {
  return (
    <a className="liveButton" href="#contact" aria-label="Contact Jack about this project">
      Live Project
    </a>
  );
}

function Magnet({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const padding = 150;
      const inside =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!inside) {
        setStyle({
          transform: "translate3d(0, 0, 0)",
          transition: "transform 0.6s ease-in-out",
        });
        return;
      }

      const x = (event.clientX - (rect.left + rect.width / 2)) / 3;
      const y = (event.clientY - (rect.top + rect.height / 2)) / 3;
      setStyle({
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: "transform 0.3s ease-out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="magnet" style={style}>
      {children}
    </div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const firstRow = useMemo(() => marqueeImages.slice(0, 11), []);
  const secondRow = useMemo(() => marqueeImages.slice(11), []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const renderRow = (images: string[], reverse = false) => (
    <div
      className="marqueeTrack"
      style={{ transform: `translateX(${reverse ? -(offset - 200) : offset - 200}px)` }}
    >
      {[...images, ...images, ...images].map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="" loading="lazy" />
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="marqueeSection" aria-label="Animated 3D project previews">
      {renderRow(firstRow)}
      {renderRow(secondRow, true)}
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  return (
    <p className="animatedText" aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          style={{ animationDelay: `${Math.min(index * 0.012, 2.4)}s` }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className="projectCard" style={{ top: `calc(5rem + ${index * 28}px)` }} data-reveal>
      <div className="projectTop">
        <strong>{String(index + 1).padStart(2, "0")}</strong>
        <span>{project.category}</span>
        <h3>{project.name}</h3>
        <LiveProjectButton />
      </div>
      <div className="projectImages">
        <div>
          <img src={project.images[0]} alt={`${project.name} preview one`} loading="lazy" />
          <img src={project.images[1]} alt={`${project.name} preview two`} loading="lazy" />
        </div>
        <img src={project.images[2]} alt={`${project.name} hero preview`} loading="lazy" />
      </div>
    </article>
  );
}

export default function Home() {
  useInViewClass();

  return (
    <main className="siteShell">
      <section className="heroSection" id="top">
        <nav className="creatorNav" aria-label="Portfolio navigation" data-reveal>
          {["About", "Price", "Projects", "Contact"].map((item) => (
            <a href={item === "Price" ? "#services" : `#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="heroHeadingWrap" data-reveal>
          <h1 className="hero-heading">Hi, i&apos;m jack</h1>
        </div>

        <div className="heroPortrait" data-reveal>
          <Magnet>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack, 3D creator"
              loading="eager"
            />
          </Magnet>
        </div>

        <div className="heroBottom">
          <p data-reveal>a 3d creator driven by crafting striking and unforgettable projects</p>
          <ContactButton className="heroContact" />
        </div>
      </section>

      <MarqueeSection />

      <section className="aboutSection" id="about">
        {aboutDecor.map((item, index) => (
          <img
            className={item.className}
            src={item.src}
            alt={item.alt}
            key={item.className}
            loading="lazy"
            data-reveal
            style={{ transitionDelay: `${index * 0.08 + 0.1}s` }}
          />
        ))}
        <div className="aboutContent">
          <h2 className="hero-heading" data-reveal>
            About me
          </h2>
          <div className="aboutTextBlock" data-reveal>
            <AnimatedText text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
            <ContactButton />
          </div>
        </div>
      </section>

      <section className="servicesSection" id="services">
        <h2 data-reveal>Services</h2>
        <div className="serviceList">
          {services.map((service, index) => (
            <article className="serviceItem" key={service.title} data-reveal>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projectsSection" id="projects">
        <h2 className="hero-heading" data-reveal>
          Project
        </h2>
        <div className="projectStack">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>
      </section>

      <section className="contactSection" id="contact">
        <p data-reveal>Available for selected visual identity, 3D launch, and web experience work.</p>
        <h2 className="hero-heading" data-reveal>
          Let&apos;s build the next unforgettable thing.
        </h2>
        <ContactButton />
      </section>
    </main>
  );
}
