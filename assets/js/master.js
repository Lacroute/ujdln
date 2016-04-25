var queue = new createjs.LoadQueue(true);
var progress_value = document.getElementById('progress-value');

queue.on('progress', function(e){
    progress_value.innerText = e.progress * 100;
  }, this);

queue.on('fileload', function(e){;
  var item = e.item; // A reference to the item that was passed in to the LoadQueue
  var type = item.type;

  // Add any images to the page body.
  if (type == createjs.LoadQueue.IMAGE) {
    document.body.appendChild(e.result);
  }else if(type == createjs.LoadQueue.VIDEO){
    document.body.appendChild(e.result);
  }
}, this);

queue.on('complete', function(e){
  console.log('COMPLETE');
});

queue.on('error', function(e){
  console.log('ERROR');
  console.log(e.data);
}, this)

queue.loadManifest({src:"assets/manifest.json", type:"manifest"});
