const remoteFileWatcher = require('remote-file-watcher');
const ipcRenderer = require('electron').ipcRenderer;

var objConfig = {
    host: '10.0.5.14',
    port: 23,
    username: 'foo',
    password: 'pass',
    folders: {
        0: '/',
        1: '/upload',
        // 2: '/upload/',
    },
    
    //debug: console.log
}

const objRemoteFileWatcher = new remoteFileWatcher('my_server_name', objConfig);

objRemoteFileWatcher.on('uploading', function (objFile) {

    console.log('FILE UPLOADING:');
    console.log(objFile);
});

objRemoteFileWatcher.on('uploaded', function (objFile) {

    console.log('FILE UPLOADED:');
    document.getElementById('file-list').innerHTML += '<li id="'+ objFile.folder + '/' +objFile.fileName + '" style="color: green">FTP: ' + objFile.folder + '/' +objFile.fileName + '</li>';
    console.log(objFile);
    printFile()
});

objRemoteFileWatcher.on('deleted', function (objFile) {
    document.getElementById('file-list').innerHTML += '<li id="'+ objFile.folder + '/' +objFile.fileName + '" style="color: red">FTP: ' + objFile.folder + '/' +objFile.fileName + '</li>';
    console.log('FILE DELETED:');
    console.log(objFile);
});

objRemoteFileWatcher.on('error', function (strServername, error) {

    console.log('ERROR: ' + strServername);
    console.log(error);
});

function printFile () {
    ipcRenderer.send('print', 'https://raw.githubusercontent.com/rt3norio/baratona-electron/master/README.md');
    htmlContent = document.getElementById(path).innerHTML;
    document.getElementById(path).innerHTML = htmlContent + ' <span>printed</span>';
}