// import ffmpegPath from "ffmpeg-static";
// import { path as ffprobePath } from "ffprobe-static";
// import ffmpeg from "fluent-ffmpeg";
// import videoshow from "videoshow";
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const ffmpeg = require('fluent-ffmpeg');
const videoshow = require('videoshow');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// const files = [
//   { path: 'aa.jpg', loop: 10 },
//   { path: 'ak.jpg', loop: 3 },
//   { path: 'as.jpg', loop: 3 },
// ];
const files = [
  {
    path: 'D:\\lizard-ai\\server\\uploads\\ashishTONY1700838104413.jpg',
    loop: 4
  },
  {
    path: 'D:\\lizard-ai\\server\\uploads\\ashishTONY1700838131246.jpg',
    loop: 4
  },
  {
    path: 'D:\\lizard-ai\\server\\uploads\\ashishTONY1700838175297.jpg',
    loop: 4
  }
];

// setup videoshow options
var videoOptions = {
  fps: 24,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  captionDelay: 350,
  transition: true,
  transitionDuration: 0.2,
  size: '1080x1920',
  audioBitrate: '128k',
  audioChannels: 2,
  pixelFormat: 'yuv420p',
  format: 'mp4'
}

videoshow(files, videoOptions)
  .subtitles('sb.ass')
  .input('first.mp3')
  .save('out.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })