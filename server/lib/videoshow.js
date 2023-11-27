const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const ffmpeg = require('fluent-ffmpeg');
const videoshow = require('videoshow');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const createVideo = async (images, music, subtitle, outputPath) => {

    // setup videoshow options
    var videoOptions = {
        fps: 24,
        videoBitrate: 1024,
        videoCodec: 'libx264',
        captionDelay: 350,
        transition: true,
        transitionDuration: 0.1,
        size: '1080x1920',
        audioBitrate: '128k',
        audioChannels: 2,
        pixelFormat: 'yuv420p',
        format: 'mp4'
    }

    videoshow(images, videoOptions)
        // .subtitles(subtitle)
        .input(music)
        .save(outputPath)
        .on('start', function (command) {
            console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
        })
        .on('end', function (output) {
            console.error('Video created in:', output)
        })

}

module.exports = createVideo;