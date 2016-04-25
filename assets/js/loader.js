function AssetManager(){
  this.successCount = 0;
  this.errorCount = 0;
  this.cache = {};
  this.downloadQueue = [];
}

// Add asset to qthe queue.
AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

// Loop through the queue to download everything, then callback.
AssetManager.prototype.downloadAll = function(callback) {
  if (this.downloadQueue.length === 0) {
    callback();
  }

  for (var i = 0; i < this.downloadQueue.length; i++) {
    var path = this.downloadQueue[i];
    var ext = path.split('.')[1];
    var asset;
    if(ext == 'jpg' || ext == 'png'){
      this.downloadImg(path, callback);
    }else if(ext == 'mp4' || ext == 'webm'){
      this.downloadVideo(path, callback);
    }else if(ext == 'mp3' || ext == 'ogg'){
      this.downloadSound(path, callback);
    }
  }
}


AssetManager.prototype.downloadImg = function(path, callback){
    var img = new Image();
    var that = this;
    img.addEventListener("load", function() {
      that.successCount += 1;
      console.log('SUCCESS', path);
      if(that.isDone()) callback();
    }, false);
    img.addEventListener("error", function() {
      that.errorCount += 1;
      console.log('ERROR', path);
      if(that.isDone()) callback();
    }, false);

    img.src = path;
    // Cache element to get it later.
    that.cache[path] = img;
}


AssetManager.prototype.downloadVideo = function(path, callback){

}


AssetManager.prototype.downloadSound = function(path, callback){
  // TO DO
}


// Check if everything is dowloaded.
AssetManager.prototype.isDone = function() {
  return (this.downloadQueue.length == this.successCount + this.errorCount);
}

// Access to an element through the cache.
AssetManager.prototype.get = function(path) {
  return this.cache[path];
}
