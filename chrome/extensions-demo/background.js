console.log("background.js");

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.action.onClicked.addListener(async (tab) => {
  console.log("onClicked", tab);
  // 设置标签文案
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  }
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  console.log("onInstalled", reason);
  chrome.action.setBadgeText({
    text: "OKKO",
  });

  if (reason === "install") {
    // 注意权限
    chrome.storage.local.set({
      apiSuggestions: ["tabs", "storage", "scripting"],
    });
  } else {
    console.log(
      chrome.storage.local.get(["apiSuggestions"], (result) => {
        console.log(result);
      })
    );
  }
});
