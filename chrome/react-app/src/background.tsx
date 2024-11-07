console.log("background");

// enum ActionType {
//   CLICK = "click",
//   URL = "url",
// }

chrome.runtime.onInstalled.addListener(({ reason }) => {
  console.log("reason", reason);
  if (reason === "install" || reason === "update") {
    chrome.storage.local.set({ actions: [] });
  }
});

// const tempUrls: chrome.tabs.Tab[] = [];

chrome.webNavigation.onCompleted.addListener((details) => {
  console.log(details);
  if (details.frameType === "outermost_frame") {
    console.log("ok", details.url);
  }
});

// chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//   console.log(details);
//   console.log(`Navigation started for tab ${details.tabId}: ${details.url}`);
// });

// chrome.tabs.onUpdated.addListener(async (_tabId, _changeInfo, _tab) => {});

chrome.runtime.onMessage.addListener(async (message) => {
  console.log("onMessage", message);
  if (message.name === "action-start") {
    chrome.storage.local.set({ actions: [] });
  } else {
    const { actions = [] } = await chrome.storage.local.get("actions");
    console.log(actions);
  }
});
