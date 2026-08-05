(() => {
  const interviews = [
    ["ChatGPT", "assets/images/bots-on-the-street/chatgpt.png"],
    ["Claude", "assets/images/bots-on-the-street/claude.png"],
    ["Copilot", "assets/images/bots-on-the-street/copilot.png"],
    ["DeepSeek", "assets/images/bots-on-the-street/deepseek.png"],
    ["Gemini", "assets/images/bots-on-the-street/gemini.png"],
    ["Grok", "assets/images/bots-on-the-street/grok.png"],
    ["Meta AI", "assets/images/bots-on-the-street/meta.png"],
    ["Mistral", "assets/images/bots-on-the-street/mistral.png"],
    ["Perplexity", "assets/images/bots-on-the-street/perplexity.png"],
    ["Pi", "assets/images/bots-on-the-street/pi.png"]
  ];

  const modal = document.querySelector("#source-modal");
  if (!modal) return;

  const title = modal.querySelector("#modal-title");
  const count = modal.querySelector("#modal-count");
  const image = modal.querySelector("#source-image");
  const closeButton = modal.querySelector(".modal-close");
  const previousButton = modal.querySelector("#previous");
  const nextButton = modal.querySelector("#next");
  let active = 0;
  let returnFocus = null;

  function show(index, trigger) {
    active = (index + interviews.length) % interviews.length;
    const [name, source] = interviews[active];
    if (trigger) returnFocus = trigger;
    title.textContent = `${name} had thoughts.`;
    count.textContent = `${String(active + 1).padStart(2, "0")} / ${interviews.length}`;
    image.src = source;
    image.alt = `Screenshot of ${name}’s complete response`;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    image.src = "";
    document.body.classList.remove("modal-open");
    returnFocus?.focus();
  }

  document.querySelectorAll(".interview-button").forEach((button) => {
    button.addEventListener("click", () => show(Number(button.dataset.index), button));
  });
  modal.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
  previousButton.addEventListener("click", () => show(active - 1));
  nextButton.addEventListener("click", () => show(active + 1));

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") show(active - 1);
    if (event.key === "ArrowRight") show(active + 1);
  });
})();
