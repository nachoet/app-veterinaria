const {app, BrowserWindow} = require ('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let appWindow;

function crearVentana() {
    //configuracion de la ventana
    appWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        resizable: true,
        minWidth: 800,
        minHeight: 600,
        center: true,
        show: false,
        icon: 'icon.png'
    });

    appWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${ path.join(__dirname , '../build/index.html' )}`
    )

    appWindow.once('ready-to-show', () => {
        appWindow.show();
    })
}

app.on('ready', crearVentana);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

//codigo de mac especifico
app.on('activate', () => {
    if (appWindow === null) {
        crearVentana()
    }
})

