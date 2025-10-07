const testBtn = document.getElementById('testBtn');
const openSidePanelBtn = document.getElementById('openSidePanelBtn');
const resultDiv = document.getElementById('result');

testBtn.addEventListener('click', async () => {
  resultDiv.textContent = 'Calling window.showDirectoryPicker()...\n';

  try {
    const directoryHandle = await window.showDirectoryPicker();
    resultDiv.textContent += `Success! Selected directory: ${directoryHandle.name}\n`;
  } catch (error) {
    resultDiv.textContent += `Error: ${error.message}\n`;
    console.error('Error calling showDirectoryPicker:', error);
  }
});

openSidePanelBtn.addEventListener('click', async () => {
  // Get current window
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.sidePanel.open({ windowId: tab.windowId });
  window.close();
});
