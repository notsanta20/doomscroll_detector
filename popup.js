import { getActiveTabURL } from "./utils.js";

const scrollInput = document.querySelector(".scroll-input");

scrollInput.addEventListener("change", async (e) => {
  const activeTab = await getActiveTabURL();
  const scrollValue = e.target.value;
  scrollInput.value = scrollValue;

  chrome.tabs.sendMessage(activeTab.id, {
    type: "SCROLL",
    value: scrollValue,
  });
});
