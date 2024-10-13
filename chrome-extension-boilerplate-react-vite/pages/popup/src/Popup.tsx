import '@src/Popup.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useState } from 'react';
// import { exampleThemeStorage } from '@extension/storage';
// import type { ComponentPropsWithoutRef } from 'react';

// const notificationOptions = {
//   type: 'basic',
//   iconUrl: chrome.runtime.getURL('icon-34.png'),
//   title: 'Injecting content script error',
//   message: 'You cannot inject script here!',
// } as const;

const Popup = () => {
  // const theme = useStorage(exampleThemeStorage);
  const isLight = true;
  // const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';
  // const goGithubSite = () =>
  //   chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  // const injectContentScript = async () => {
  //   const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

  //   if (tab.url!.startsWith('about:') || tab.url!.startsWith('chrome:')) {
  //     chrome.notifications.create('inject-error', notificationOptions);
  //   }

  //   await chrome.scripting
  //     .executeScript({
  //       target: { tabId: tab.id! },
  //       files: ['/content-runtime/index.iife.js'],
  //     })
  //     .catch(err => {
  //       // Handling errors related to other paths
  //       if (err.message.includes('Cannot access a chrome:// URL')) {
  //         chrome.notifications.create('inject-error', notificationOptions);
  //       }
  //     });
  // };

  const extractTextFromHtml = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const fetchUserCode = async () => {
    // alert('Fetching User Code');
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
    // alert('Tab ID: ' + tab.id);
    const code = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const codeDiv = document.getElementsByClassName('view-lines')[0];
        const code = codeDiv.innerHTML;
        return code;
      },
    });
    const codeText = extractTextFromHtml(code[0].result ?? '');
    // alert('User Code: ' + codeText);
    console.log('USER SOURCE CODE', codeText);

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const resultContainer = document.getElementById('submission-detail_tab');
        const result = resultContainer?.children[1].children[0].textContent;
        return result;
      },
    });
    const resultText = extractTextFromHtml(result[0].result ?? '');

    const problemId = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const problemId = document.getElementsByClassName(
          'no-underline hover:text-blue-s dark:hover:text-dark-blue-s truncate cursor-text whitespace-normal hover:!text-[inherit]',
        )[0].textContent;
        return problemId;
      },
    });
    const problemIdText = extractTextFromHtml(problemId[0].result ?? '').match(/(\d+)\./)?.[1];
    // alert('User Result: ' + resultText);
    // console.log('USER RESULT', resultText);

    alert('User Code: ' + codeText + '\nUser Result: ' + resultText + '\nProblem ID: ' + problemIdText);

    // send the info to background worker
    chrome.runtime.sendMessage(
      {
        type: 'user-code',
        code: codeText,
        result: resultText,
        problemId: problemIdText,
      },
      response => {
        console.log('Response from backgroundf', response);
        setLlmResponse(response.data.response);
      },
    );
    return { code: codeText, result: resultText };
  };
  // useEffect(() => {
  //   const messageListener = (message: unknown, sender: unknown) => {
  //     console.log('Message received in popup', message, sender);
  //   };
  //   chrome.runtime.onMessage.addListener(messageListener);
  //   return () => {
  //     chrome.runtime.onMessage.removeListener(messageListener);
  //   };
  // }, []);

  const [llmResponse, setLlmResponse] = useState('');

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <h1 className="text-2xl font-semibold italic">pickle.ai</h1>
      <img width={32} height={32} alt="as" src="/image-2.png" className="mx-auto" />
      <button
        className="rounded-lg border-2 border-green-400 bg-green-400 px-2 transition-all duration-300 ease-in-out hover:border-green-700 hover:bg-green-600"
        onClick={fetchUserCode}>
        Analyze User Code
      </button>
      {llmResponse && <pre className="text-xs">{llmResponse}</pre>}
      {/* <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}> */}
      {/* <button onClick={goGithubSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button> */}
      {/*<p>
          Edit <code>pages/popup/src/Popup.tsx</code>
        </p>
        <button
          className={
            'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
            (isLight ? 'bg-blue-200 text-black' : 'bg-gray-700 text-white')
          }
          onClick={injectContentScript}>
          Click to inject Content Script
        </button>
      {/* </header> */}
      {/* <ToggleButton>Toggle theme</ToggleButton> */}
    </div>
  );
};

// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorage(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black shadow-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occured </div>);
