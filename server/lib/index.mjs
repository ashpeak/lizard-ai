import ffmpegPath from "ffmpeg-static";
import { path as ffprobePath } from "ffprobe-static";
import ffmpeg from "fluent-ffmpeg";
import videoshow from "videoshow";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const files = [
  { path: 'sm.png', loop: 10 },
  { path: 'an.png', loop: 3 },
  { path: 'az.png', loop: 3 },
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
  .subtitles('subtitle.srt')
  .input('first.mp3')
  .save('output.mp4')
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