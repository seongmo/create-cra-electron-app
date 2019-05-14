const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

const ELECTRON_START_URL =
  process.env.PORT && `http://localhost:${process.env.PORT}`;

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600, show: false });

  const startUrl =
    ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  win.loadURL(startUrl);
  win.once("ready-to-show", () => {
    win.show();
  });

  if (ELECTRON_START_URL) {
    win.webContents.openDevTools();
  }

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
