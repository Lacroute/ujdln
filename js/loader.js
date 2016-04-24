function AssetManager(){
  this.successCount = 0;
  this.errorCount = 0;
  this.cache = {};
  this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.downloadAll = function(callback) {
  if (this.downloadQueue.length === 0) {
    callback();
  }
  for (var i = 0; i < this.downloadQueue.length; i++) {
      var path = this.downloadQueue[i];
      var img = new Image();
      var that = this;
      img.addEventListener("load", function() {
          that.successCount += 1;
          console.log('SUCCESS', path);
          if(that.isDone()) callback();
      }, false);
      img.addEventListener("error", function() {
          that.errorCount += 1;
          console.log('SUCCESS', path);
          if(that.isDone()) callback();
      }, false);
      img.src = path;
      that.cache[path] = img;
  }
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

AssetManager.prototype.get = function(path) {
    return this.cache[path];
}
