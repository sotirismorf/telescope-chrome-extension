import type { IStorage } from 'src/types';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({ count: 0 } as IStorage, ({ count }: IStorage) => {
    console.log('background', count);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'query') {
    console.log(message.body);

    let queryOptions = { 
      title: `*${message.body}*`, 
      //url: 'thing' 
    };

    chrome.tabs.query(queryOptions, (tabs) => {
      console.log(tabs)
      sendResponse(tabs)
    });

  } else if (message === 'ping') {
    sendResponse('pong')
  }
  //return Promise.resolve("Dummy response to keep the console quiet");
  return true
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-popup') {
    console.log('i am toggling the popup');

    // @ts-expect-error
    chrome.action.openPopup()
  }
});
