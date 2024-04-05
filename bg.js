const generatePreview = async (tabId) => {
  console.log("🔥 ~ generatePreview :")
  await chrome.scripting.executeScript({
    files: ["popup.js"],
    target: { tabId },
  })
  console.log("script injected")
}


chrome.action.onClicked.addListener(async (tab) => {
  chrome.action.setBadgeText({ text: "WAIT", tabId: tab.id });
  await generatePreview(tab.id)
  chrome.action.setBadgeText({ text: "ON", tabId: tab.id });

});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON"
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#171717"
  });
});

