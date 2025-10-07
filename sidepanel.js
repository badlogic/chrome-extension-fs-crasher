const testBtn = document.getElementById('testBtn');
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
