import { app } from 'electron';
import serve from 'electron-serve';
import Store from 'electron-store';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

const store = new Store();

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {


    if (store.get("bridge") && store.get("token")) {
      await mainWindow.loadURL('app://./home.html');
    } else {
      await mainWindow.loadURL('app://./setup.html');
    }

  } else {
    const port = process.argv[2];

    if (store.get("bridge") && store.get("token")) {
      await mainWindow.loadURL(`http://localhost:${port}/home`);
    } else {
      await mainWindow.loadURL(`http://localhost:${port}/setup`);
    }

    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
