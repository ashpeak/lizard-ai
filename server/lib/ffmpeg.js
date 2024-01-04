const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const ffmpeg = require('fluent-ffmpeg');
const { join } = require("path");
const { unlink } = require("fs").promises;
const connectDB = require('../configs/db');
const Project = require('../models/Project');
const User = require('../models/User');
const exportEmail = require('./exportEmail');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const myFFmpeg = {};

const changeStatus = async (id, projectId) => {
    await connectDB();

    const project = await Project.findOneAndUpdate(
        { _id: projectId, user: id },
        {
            $set: {
                status: 'ready',
                isGenerated: true,
                generatedUrl: `http://${process.env.SERVER_URL}:${process.env.PORT}/user/video/download/${projectId}`
            }
        },
        { new: true }
    );

    const user = await User.findOneAndUpdate(
        { _id: id },
        {
            $inc: { credit: -10 },
        },
        { new: true }
    );

    exportEmail(`${user.firstName} ${user.lastName}`, user.email, project.generatedUrl);
}

myFFmpeg.mergeAudio = (audio1, audio2, name) => {
    return new Promise((resolve, reject) => {
        try {
            const volume1 = 1;
            const volume2 = 0.2;
            const startFrom = 5;
            const output = join(process.cwd(), "audioGenerated", `${name.split('.')[0]}_merged.mp3`);

            ffmpeg()
                .input(audio1)
                .input(audio2)
                .audioCodec('libmp3lame') // or choose the codec you prefer
                .outputOptions(`-filter_complex`, `[0:a]volume=${volume1}[a0];[1:a]atrim=start=${startFrom},volume=${volume2}[a1];[a0][a1]amix=inputs=2:duration=shortest[outa]`)
                .outputOptions('-map', '[outa]')
                .output(output)
                .on('end', () => {
                    resolve(output);

                    unlink(audio1);
                    unlink(audio2);
                })
                .on('error', (err) => {
                    reject(err);
                })
                .run();
        } catch (error) {
            reject(error);
        }
    });
};

myFFmpeg.createVideo = (script, id, projectId, musicPath, volumeMix, outputPath) => {
    try {
        const command = ffmpeg();
        const prefix = id + projectId;

        const length = script.length;
        let streams = '';   // [0:v:0][0:a:0][1:v:0][1:a:0]...
        let sar = '';       // setsar=sar=1/1
        script.forEach((scene, index) => {
            let name = null;
            if (scene.type === 'utube') {
                name = scene.media;
            } else {
                name = prefix + (index + 1);
            }

            command.input(join(process.cwd(), 'temp', `${name}.mp4`));
            sar += `[${index}:v:0]setsar=sar=1/1[v${index}];`;
            streams += `[v${index}][${index}:a:0]`;
        });

        // Add the background music
        command.input(musicPath);

        command
            .inputOptions('-filter_complex', `${sar}${streams}concat=n=${length}:v=1:a=1[vou][aou];[aou]volume=${volumeMix.speech}[a0];[${length}:a:0]atrim=start=10,volume=${volumeMix.bgMusic}[a1];[a0][a1]amix=inputs=2:duration=shortest[aout]`)
            .outputOptions('-map', '[vou]', '-map', '[aout]', '-r', '27', '-strict', 'experimental', '-c:v', 'libx264', '-b:v', '4000k', '-b:a', '128k', '-pix_fmt', 'yuv420p')
            .output(outputPath)
            .on('start', () => {
                console.log('Final video creation started.....');
            })
            .on('end', () => {
                console.log('Video created successfully');
                unlink(musicPath);
                script.forEach((scene, index) => {
                    let name = null;
                    if (scene.type === 'utube') {
                        name = scene.media;
                    } else {
                        name = prefix + (index + 1);
                    }
                    unlink(join(process.cwd(), 'temp', `${name}.mp4`));
                });
                changeStatus(id, projectId);
            })
            .on('error', (err, stdout, stderr) => {
                console.error('Error:', err);
                console.error('ffmpeg stdout:', stdout);
                console.error('ffmpeg stderr:', stderr);
            })
            .run();
    } catch (error) {
        console.log(error);
    }
}

myFFmpeg.trimVideo = (filename, path, start, end) => {
    return new Promise((resolve, reject) => {
        const filePath = path + '.webm';
        try {
            if (start > 0 && end > 0 && start > end) {
                reject('Start time should be less than end time');
            } else if (start > 0 && end > 0 && start === end) {
                reject('Start time and end time should not be same');
            }

            const command = ffmpeg();

            command.input(filePath);

            if (start) {
                command.inputOptions('-ss', start);
            }
            if (end) {
                command.inputOptions('-to', end);
            }

            command
                .outputOptions('-c', 'copy', '-an')
                .output(path + '_trimmed.mp4')
                .on('end', () => {
                    generateThumbnail(filename, filePath, start)
                        .then(() => resolve())
                        .catch(err => console.log(err));
                })
                .on('error', (err) => {
                    console.error('Error:', err);
                    reject(err);
                })
                .run();

        } catch (error) {
            reject(error);
        }
    });
};

function generateThumbnail(filename, videoPath, time) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                console.log('Error', err);
                reject(err);
            })
            .takeScreenshots({
                count: 1,
                filename: `${filename}_thumbnail.png`,
                timemarks: [time]
            }, join(process.cwd(), 'uploads'));
    });
}

module.exports = myFFmpeg;