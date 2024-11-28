import { promises as fs } from 'fs';
import { join } from 'path';

export async function createElectronFiles(projectPath: string) {
  const mainContent = `
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load the Angular app
  win.loadFile('dist/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});`;

  const preloadContent = `
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(\`\${type}-version\`, process.versions[type]);
  }
});`;

  await fs.writeFile(join(projectPath, 'main.js'), mainContent);
  await fs.writeFile(join(projectPath, 'preload.js'), preloadContent);
} 