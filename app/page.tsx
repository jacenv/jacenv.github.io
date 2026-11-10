import { contact, explorations, featuredProjects, lastUpdated } from "@/lib/data";
import type { Project } from "@/lib/data";

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" />
      <circle cx="16" cy="16" r="9" />
      <path d="M16 1.5v29M1.5 16h29M5.8 5.8l20.4 20.4M26.2 5.8L5.8 26.2" />
    </svg>
  );
}

function HeroObject() {
  return (
    <div className="hero-object" aria-hidden="true">
      <div className="device">
        <div className="device-notch" />
        <div className="device-screen">
          <div className="bubble bubble-in">how do i even start this</div>
          <div className="bubble bubble-out">try the honest version first</div>
          <div className="bubble bubble-in typing">
            <i /><i /><i />
          </div>
        </div>
      </div>
      <div className="device-shadow" />
    </div>
  );
}

function Thumb({ id }: { id: string }) {
  if (id === "yearning") {
    return (
      <div className="thumb thumb-yearning" aria-hidden="true">
        <div className="thumb-bubble a">i never knew you felt like that</div>
        <div className="thumb-bubble b">you never asked.</div>
        <div className="thumb-bubble c"><i /><i /><i /></div>
        <div className="thumb-guide">
          <span>GUIDE</span>
          there&rsquo;s an edge in that — ask the question you actually came for.
        </div>
      </div>
    );
  }
  if (id === "studio-avenue") {
    return (
      <div className="thumb thumb-studio" aria-hidden="true">
        <div className="frames">
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className="scrub"><b /></div>
        <div className="thumb-caption">STUDIO AVENUE — HOME REEL</div>
      </div>
    );
  }
  return null;
}

function LabThumb({ kind }: { kind: "terminal" | "wave" | "gauge" }) {
  if (kind === "terminal") {
    return (
      <div className="lab-thumb lab-terminal" aria-hidden="true">
        <div className="dots"><i /><i /><i /></div>
        <p><span>$</span> kubectl get pods</p>
        <p className="dim">web-7f9c Running</p>
        <p className="dim">nfs-0 Running</p>
      </div>
    );
  }
  if (kind === "wave") {
    return (
      <div className="lab-thumb lab-wave" aria-hidden="true">
        {[34, 62, 28, 88, 52, 70, 40, 96, 44, 66, 24, 58].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="lab-thumb lab-gauge" aria-hidden="true">
      <svg viewBox="0 0 120 70">
        <path className="track" d="M12 62a48 48 0 0 1 96 0" />
        <path className="fill" d="M12 62a48 48 0 0 1 96 0" />
      </svg>
      <span className="reading">100°C</span>
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="work-card" aria-labelledby={`${project.id}-title`}>
      <Thumb id={project.id} />
      <div className="card-body">
        <div className="card-meta">
          <span className="org">
            <span className="org-dot" aria-hidden="true" />
            {project.org}
          </span>
          <span className={`pill pill-${project.status.tone}`}>
            <span className="pill-dot" aria-hidden="true" />
            {project.status.label}
          </span>
        </div>

        <h3 id={`${project.id}-title`} className="card-title">
          {project.title}
        </h3>
        <p className="card-deck">{project.deck}</p>

        <dl className="notes">
          {project.notes.map((note) => (
            <div key={note.title}>
              <dt>{note.title}</dt>
              <dd>{note.detail}</dd>
            </div>
          ))}
        </dl>

        {project.proof ? (
          <div className="proof">
            <span className="proof-mark">{project.proof.mark}</span>
            <p>{project.proof.text}</p>
          </div>
        ) : null}

        <div className="card-foot">
          <ul className="stack" aria-label={`${project.title} stack`}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          {project.url ? (
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkLabel} <Arrow />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grid-bg" aria-hidden="true" />

      <div className="page-shell">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Jacen Salvador, home">
            <Mark />
            Jacen Salvador
          </a>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.resume} target="_blank" rel="noopener noreferrer">Resume</a>
          </nav>
        </header>

        <main id="main">
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-side hero-left">
              <p className="greeting">hey, i&rsquo;m jacen</p>
              <h1 id="hero-title">I build for</h1>
              <p className="hero-sub">software engineer</p>
            </div>

            <HeroObject />

            <div className="hero-side hero-right">
              <p className="hero-serif" aria-hidden="true">curiosity.</p>
              <p className="hero-sub">
                recently: b.s. computer science{" "}
                <a href="https://www.sdsu.edu" target="_blank" rel="noopener noreferrer">@sdsu</a>
              </p>
            </div>
            <span className="sr-only">I build for curiosity.</span>
          </section>

          <section id="work" className="section" aria-labelledby="work-title">
            <div className="section-head">
              <h2 id="work-title">Selected work</h2>
              <span>PRODUCTS &amp; CLIENT WORK · 2025—2026</span>
            </div>
            <div className="work-grid">
              {featuredProjects.map((project) => (
                <FeaturedCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section id="lab" className="section" aria-labelledby="lab-title">
            <div className="section-head">
              <h2 id="lab-title">Explorations</h2>
              <span>SYSTEMS, MACHINE LEARNING &amp; HARDWARE</span>
            </div>
            <div className="lab-grid">
              {explorations.map((item) => (
                <article className="lab-card" key={item.name}>
                  <LabThumb kind={item.kind} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="lab-stack">{item.stack}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="about" className="section about" aria-labelledby="about-title">
            <div className="section-head">
              <h2 id="about-title">About</h2>
              <span>A BIT MORE CONTEXT</span>
            </div>
            <div className="about-grid">
              <p className="about-lead">
                Curious by default.<br />
                <em>Engineer by practice.</em>
              </p>
              <div className="about-copy">
                <p>
                  I graduated from San Diego State in May 2026 with a degree in Computer
                  Science. I like taking an idea through the whole process: figuring out
                  how it should work, building it, and making the details hold up once
                  people actually use it.
                </p>
                <p>
                  My projects have run from mobile interfaces and AI backends to Linux
                  systems and a Wi-Fi temperature sensor. I&rsquo;m looking for a software
                  engineering role where I can keep learning on a team that cares about
                  the craft.
                </p>
                <p>
                  Outside of code you&rsquo;ll find me bouldering, playing volleyball, or
                  getting a few games in with friends.
                </p>
                <div className="currently">
                  <span className="label">Currently exploring</span>
                  <p>
                    League of Legends match analysis tools
                    <span className="wip">in progress</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="contact" aria-labelledby="contact-title">
            <div>
              <span className="label">Have something in mind?</span>
              <h2 id="contact-title">Let&rsquo;s build something good.</h2>
            </div>
            <a className="contact-email" href={`mailto:${contact.email}`}>
              {contact.email} <Arrow />
            </a>
          </section>
        </main>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Jacen Salvador</p>
          <div className="footer-links">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={contact.resume} target="_blank" rel="noopener noreferrer">Resume</a>
            <a href="#top">Back to top ↑</a>
          </div>
          <p className="updated">LAST UPDATED {lastUpdated}</p>
        </footer>
      </div>
    </>
  );
}
