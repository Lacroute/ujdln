var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('img/test.jpg');

ASSET_MANAGER.downloadAll(function() {
    var img = ASSET_MANAGER.get('img/test.jpg');
    document.getElementById('app').appendChild(img);
});
