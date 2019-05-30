// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const chokidar = require('chokidar');
const $ = require('jQuery');

// One-liner for current directory, ignores .dotfiles
var watcher = chokidar.watch('/home/renatofilizzola/tmp/', {
    ignored: /(^|[\/\\])\../,
    persistent: false
});

function onWatcherReady(){
    console.info('From here can you check for real changes, the initial scan has been completed.');
}
      
// Declare the listeners of the watcher
watcher
.on('add', function(path) {
    $('#file-list').append('<li id="'+ path + '" style="color: green">' + path + '</li>');
    console.log('File', path, 'has been added');
})
.on('addDir', function(path) {
      console.log('Directory', path, 'has been added');
})
.on('change', function(path) {
     console.log('File', path, 'has been changed');
})
.on('unlink', function(path) {
    $('#' + path).remove();
     $('#file-list').append('<li id="'+ path + '" style="color: red">' + path + '</li>');
})
.on('unlinkDir', function(path) {
     console.log('Directory', path, 'has been removed');
})
.on('error', function(error) {
     console.log('Error happened', error);
})
.on('ready', onWatcherReady)
.on('raw', function(event, path, details) {
     // This event should be triggered everytime something happens.
     console.log('Raw event info:', event, path, details);
});
