# Chrome Extension File System Access API Crash Reproducer

Minimal Chrome Manifest V3 extension to reproduce a crash when calling `window.showDirectoryPicker()` from extension contexts on macOS.

## Issue

When calling the File System Access API's `window.showDirectoryPicker()` from a Chrome extension's **popup** or **side panel** on macOS, Chrome reliably crashes.

## Environment

- **OS**: macOS (tested on macOS Sonoma/Sequoia)
- **Chrome**: Version 131+ (likely affects earlier versions too)
- **Extension**: Manifest V3

## Reproduction Steps

### Test via Popup

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select this directory
5. Click the extension icon in the toolbar to open the **popup**
6. Click the "Call window.showDirectoryPicker()" button
7. **Chrome crashes immediately on macOS**

### Test via Side Panel

1. Follow steps 1-4 above
2. In the popup, click "Open Side Panel Test" button
3. Click the "Call window.showDirectoryPicker()" button in the side panel
4. **Chrome crashes immediately on macOS**

## Expected Behavior

The native directory picker dialog should appear, allowing the user to select a directory.

## Actual Behavior

Chrome crashes without showing the directory picker dialog.

## Files

- `manifest.json` - Minimal MV3 manifest with sidePanel permission and popup
- `background.js` - Service worker that opens side panel on icon click
- `popup.html` - Popup UI with crash trigger button
- `popup.js` - Calls `window.showDirectoryPicker()` from popup, can also open side panel
- `sidepanel.html` - Side panel UI with crash trigger button
- `sidepanel.js` - Calls `window.showDirectoryPicker()` from side panel

## Notes

This is the simplest possible reproduction case. The crash occurs in both popup and side panel contexts regardless of:
- Whether the call is in a try-catch block
- User interaction (button click triggers the call)
- Other extension permissions or features

The File System Access API works correctly in regular web pages, but crashes when called from Chrome extension contexts (popup, side panel) on macOS.
