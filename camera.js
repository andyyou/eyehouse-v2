var MjpegCamera = require('mjpeg-camera');
var fs = require('fs');

var camera = new MjpegCamera({ url: 'http://172.16.1.204:5000/video_feed' });

camera.getScreenshot(function(err, frame) {
  console.log('getscreenshot');
  fs.writeFileSync('camera-screenshot.jpg', frame);
});
