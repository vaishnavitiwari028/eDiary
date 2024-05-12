import { listen, select } from "./DOMhelpers.js";

let notificationEl = select(".notification_modal");
let isChanged = false;

function enableNotification() {
  listen(notificationEl, "animationend", () => {
    notificationEl.classList.remove("notify_state");
    notificationEl.textContent = "";
    if (isChanged) {
      notificationEl.style.setProperty("--clr-notification", "var(--clr-good)");
      isChanged = false;
    }
  });
}
export const notifyUser = (message, type = "good") => {
  if (type === "bad") {
    notificationEl.style.setProperty("--clr-notification", "var(--clr-bad)");
    isChanged = true;
  }
  if (type === "normal") {
    notificationEl.style.setProperty(
      "--clr-notification",
      "var(--clr-neutral)"
    );
    isChanged = true;
  }
  notificationEl.textContent = message;
  notificationEl.classList.add("notify_state");
};
export default enableNotification;
