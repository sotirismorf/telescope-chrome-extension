import type { IStorage } from 'src/types';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log('background', count);
  });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'mounted') {
    //let queryoptions: chrome.tabs.queryinfo = { 
    //  title: `*${message.body}*`, 
    //};

    chrome.tabs.query({}, (tabs) => {
      sendResponse(tabs)
    });
  }
  return true
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-popup') {

    // @ts-expect-error
    chrome.action.openPopup()
  }
});
