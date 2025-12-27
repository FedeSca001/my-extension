let isKeepingAwake = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'requestKeepAwake') {
    if (!isKeepingAwake) {
      chrome.power.requestKeepAwake('display');  // 'display' mantiene pantalla y sistema despierto; usa 'system' solo para CPU
      isKeepingAwake = true;
      console.log('Keep awake activado');
    }
    sendResponse({ status: 'activado' });
  } else if (message.action === 'releaseKeepAwake') {
    if (isKeepingAwake) {
      chrome.power.releaseKeepAwake();
      isKeepingAwake = false;
      console.log('Keep awake desactivado');
    }
    sendResponse({ status: 'desactivado' });
  } else if (message.action === 'toggleKeepAwake') {
    if (isKeepingAwake) {
      chrome.power.releaseKeepAwake();
      isKeepingAwake = false;
      console.log('Keep awake desactivado');
    } else {
      chrome.power.requestKeepAwake('display');
      isKeepingAwake = true;
      console.log('Keep awake activado');
    }
    sendResponse({ status: isKeepingAwake ? 'activado' : 'desactivado' });
  }
});