const promptButton = document.querySelector("#prompt-button");
const promptText = document.querySelector("#prompt-text");
const promptCount = document.querySelector("#prompt-count");
const dateLabel = document.querySelector("#date-label");
let prompts = [];
let promptIndex = 0;

const today = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
dateLabel.textContent = today;

async function loadPrompts() {
  try {
    const response = await fetch("/api/prompts");
    if (!response.ok) throw new Error("Prompt request failed");
    const data = await response.json();
    prompts = data.prompts;
    promptText.textContent = prompts[0];
  } catch (error) {
    promptButton.disabled = true;
    promptButton.querySelector("span").textContent = "Start the server to begin";
  }
}

promptButton.addEventListener("click", () => {
  if (prompts.length === 0) return;
  promptIndex = (promptIndex + 1) % prompts.length;
  promptText.animate(
    [{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 280, easing: "ease-out" }
  );
  promptText.textContent = prompts[promptIndex];
  promptCount.textContent = `0${promptIndex + 1} / 0${prompts.length}`;
});

loadPrompts();
