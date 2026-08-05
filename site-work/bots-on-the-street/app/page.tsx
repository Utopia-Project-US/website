"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Interview = {
  name: string;
  character: string;
  quote: string;
  image: string;
  monogram: string;
  color: string;
};

const interviews: Interview[] = [
  {
    name: "ChatGPT",
    character: "The Editor",
    quote:
      "It’s an evocative phrase precisely because it doesn’t prescribe an answer—it frames a conversation about change.",
    image: "/interviews/chatgpt.png",
    monogram: "C",
    color: "mint",
  },
  {
    name: "Claude",
    character: "The Philosopher",
    quote:
      "The country isn’t a finished document but a working draft—something closer to the Constitution’s own amendment process than a monument carved in stone.",
    image: "/interviews/claude.png",
    monogram: "C",
    color: "coral",
  },
  {
    name: "Copilot",
    character: "The Architect",
    quote:
      "It suggests starting over with intention: taking the ideals of equality, natural rights, and popular sovereignty and drafting a version of America that better lives up to them.",
    image: "/interviews/copilot.png",
    monogram: "Co",
    color: "blue",
  },
  {
    name: "DeepSeek",
    character: "The Reformer",
    quote:
      "The nation’s founding ‘draft’ was not a finished product, and its continued evolution depends on the willingness of its people to engage in the difficult work of revision and renewal.",
    image: "/interviews/deepseek.png",
    monogram: "D",
    color: "sky",
  },
  {
    name: "Gemini",
    character: "The Poet",
    quote:
      "‘Redrafting America’ evokes the image of a nation as a living, breathing blueprint—one that is constantly being evaluated, revised, and improved by its citizens.",
    image: "/interviews/gemini.png",
    monogram: "G",
    color: "gold",
  },
  {
    name: "Grok",
    character: "The Investigator",
    quote:
      "‘Redrafting America’ means treating the American experiment as an ongoing design challenge: keep what works, redesign what no longer serves, and do so with transparency.",
    image: "/interviews/grok.png",
    monogram: "G",
    color: "ink",
  },
  {
    name: "Meta AI",
    character: "The Literalist",
    quote:
      "Applied to America, that usually means revisiting foundational texts or structures—the Constitution, laws, institutions, maps, systems—and doing a second draft.",
    image: "/interviews/meta.png",
    monogram: "M",
    color: "violet",
  },
  {
    name: "Mistral",
    character: "The Policy Wonk",
    quote:
      "It implies going beyond incremental changes to address deep-seated issues—such as representation, accountability, and the balance of power.",
    image: "/interviews/mistral.png",
    monogram: "M",
    color: "orange",
  },
  {
    name: "Perplexity",
    character: "The Critic",
    quote:
      "The phrase feels both constructive and tense. ‘Redrafting’ can mean improving a document, but it can also signal that the current version is deeply flawed.",
    image: "/interviews/perplexity.png",
    monogram: "P",
    color: "teal",
  },
  {
    name: "Pi",
    character: "The Optimist",
    quote:
      "‘Redrafting America’ feels like a call to reimagine the country’s future—whether through policy, culture, or shared values.",
    image: "/interviews/pi.png",
    monogram: "π",
    color: "rose",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const active = activeIndex === null ? null : interviews[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback((direction: number) => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return (current + direction + interviews.length) % interviews.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();
    document.body.classList.add("modal-open");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, move]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Redrafting America home">
          <Image
            src="/redrafting-america-logo.png"
            alt=""
            width={58}
            height={58}
            className="brand-mark"
            priority
          />
          <span>
            <strong>Redrafting</strong>
            <em>America</em>
          </span>
        </a>
        <span className="edition">Field Notes · Vol. 01</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-stamp" aria-hidden="true">
          <span>On assignment</span>
          <strong>10</strong>
          <span>AI interviews</span>
        </div>
        <p className="kicker">Bots on the Street</p>
        <h1>
          What Does <span>“Redrafting America”</span> Mean to You?
        </h1>
        <p className="dek">
          We asked ten artificial intelligences one very human question.
          <br />
          They had thoughts. <strong>Some wrote books.</strong>
        </p>
        <a className="down-arrow" href="#interviews" aria-label="Read the interviews">
          ↓
        </a>
      </section>

      <section className="interviews" id="interviews" aria-labelledby="interviews-heading">
        <div className="section-rule">
          <span>One question · Ten answers</span>
          <span>Click any response for the receipts</span>
        </div>
        <h2 id="interviews-heading" className="sr-only">
          Ten AI responses
        </h2>
        <div className="card-grid">
          {interviews.map((interview, index) => (
            <article className={`interview-card ${interview.color}`} key={interview.name}>
              <button
                className="card-button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Read ${interview.name}’s full response`}
              >
                <div className="card-topline">
                  <span className="avatar" aria-hidden="true">
                    {interview.monogram}
                  </span>
                  <span className="identity">
                    <strong>{interview.name}</strong>
                    <em>{interview.character}</em>
                  </span>
                  <span className="number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <blockquote>“{interview.quote}”</blockquote>
                <span className="read-more">
                  Read the full response <span aria-hidden="true">↗</span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="your-turn">
        <span className="scribble" aria-hidden="true">Your turn →</span>
        <p className="kicker">Enough artificial intelligence.</p>
        <h2>What does it mean to you?</h2>
        <p>
          America has never been a finished document. The next draft should be
          written by the people who live here.
        </p>
        <a className="cta" href="mailto:hello@redraftingamerica.org?subject=What Redrafting America means to me">
          Tell us what you think <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer>
        <div className="footer-brand">Redrafting America</div>
        <p className="footnote">
          <sup>*</sup> Each AI was asked the same question in a new incognito
          conversation, without information about our organization, its former
          name, or the purpose of the experiment. Responses are presented as
          received; some AIs independently chose to search the web.
        </p>
      </footer>

      {active && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-backdrop" onClick={close} aria-label="Close response" />
          <div className="modal-panel">
            <div className="modal-header">
              <div>
                <span className="modal-count">
                  {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {interviews.length}
                </span>
                <h2 id="modal-title">{active.name} had thoughts.</h2>
              </div>
              <button ref={closeButtonRef} className="modal-close" onClick={close} aria-label="Close">
                ×
              </button>
            </div>
            <div className="source-frame">
              <Image
                src={active.image}
                alt={`Screenshot of ${active.name}’s complete response`}
                width={1200}
                height={1400}
                className="source-image"
              />
            </div>
            <div className="modal-controls">
              <button onClick={() => move(-1)} aria-label="Previous response">← Previous</button>
              <span>Original response</span>
              <button onClick={() => move(1)} aria-label="Next response">Next →</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
