const scrollInput = document.querySelector(".scroll-value");
const currentValue = document.querySelector(".current-value");

chrome.storage.local.get(["scrollIntensity"], (result) => {
  const value = result.scrollIntensity | 1;
  scrollInput.value = value;
  currentValue.textContent = value;
});

scrollInput.addEventListener("change", async (e) => {
  const value = e.target.value;
  currentValue.textContent = value;

  chrome.storage.local.set({ scrollIntensity: value });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "updateThreshold",
        value: value,
      });
    }
  });
});
