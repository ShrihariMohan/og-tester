const generatePreview = async (tabId) => {
  console.log("🔥 ~ generatePreview :")
  chrome.scripting.executeScript({
    files: ["popup.js"],
    target: { tabId },
  })
    .then(() => console.log("script injected"));

  chrome.action.setBadgeBackgroundColor({
    color: "#0e7490",
    tabId
  });
}

const changeActionItem = async (tabId) => {
  console.log("🔥 ~ changeActionItem :")
  chrome.action.setBadgeBackgroundColor({
    color: "#171717",
    tabId
  });
}


chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  if (nextState == 'ON') {
    await generatePreview(tab.id)
  }
  else {
    await changeActionItem(tab.id)
  }
  chrome.action.setBadgeText({ text: nextState, tabId: tab.id });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF"
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#171717"
  });
});

