chrome.tabs.onUpdated.addListener((tabId, tab) => {
  const websites = [
    "reddit",
    "x",
    "facebook",
    "instagram",
    "tiktok",
    "linkedin",
  ];
  if (tab.url) {
    // websites.forEach((w) => {
    //   if (tab.url.includes(w)) {
    //     chrome.tabs.sendMessage(tabId, {
    //       type: "NEW",
    //       webId: w,
    //     });
    //   }
    // });
  }
});
