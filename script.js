const prompts = [
  "What would feel a little lighter right now?",
  "Name one thing that is already going right.",
  "What can wait until tomorrow?",
  "Take one slow breath, then choose your next kind step."
];

const promptButton = document.querySelector("#prompt-button");
const promptText = document.querySelector("#prompt-text");
const promptCount = document.querySelector("#prompt-count");
const dateLabel = document.querySelector("#date-label");
let promptIndex = 0;

const today = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date());
dateLabel.textContent = today;

promptButton.addEventListener("click", () => {
  promptIndex = (promptIndex + 1) % prompts.length;
  promptText.animate(
    [{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 280, easing: "ease-out" }
  );
  promptText.textContent = prompts[promptIndex];
  promptCount.textContent = `0${promptIndex + 1} / 04`;
});
