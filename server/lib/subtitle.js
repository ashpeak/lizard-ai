const fs = require('fs/promises');
const { join } = require('path');

const subtitle = {};

subtitle.createSubtitle = async (dialogue, name) => {
    return new Promise(async (resolve, reject) => {
        
        let data = '[Script Info]\n; This is an Advanced Sub Station Alpha v4+ script.\nTitle: \nScriptType: v4.00+\nPlayDepth: 0\nScaledBorderAndShadow: Yes\nPlayResX: 720\nPlayResY: 1280\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,88.9,&H00FFFFFF,&H0000FFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,1,2,10,10,10,1\nStyle: ffmpeg,Nunito,80.0,&H00FEFEFE,&H00FFFFFF,&HFF010101,&H00010101,-1,0,0,0,87.0,94.0,0,0.0,1,0.0,0.0,5,0,0,62,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n';

        const length = dialogue.split(' ').length;
        const path = join(process.cwd(), 'temp', name + '.ass');
        // Dialogue: 0,0:00:03.90,0:00:05.90,ffmpeg,,0,0,0,,{\bord3.9\blur1\shad0.2}glider.
        for(let i = 0; i < length/5; i++) {
            const line = length - i*5 > 5 ? dialogue.split(' ').slice(i*5, i*5 + 5).join(' ') : dialogue.split(' ').slice(i*5, length).join(' ');
            data += `Dialogue: 0,0:00:0${i}.${i*2}9,0:00:0${i+1}.${i*2+2}0,ffmpeg,,0,0,0,,{\\bord3.9\\blur1\\shad0.2}${line}\n`;
        }
        
        try {
            await fs.writeFile(path, data, { encoding: 'utf-8' });
            resolve(`./temp/${name}.ass`);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = subtitle;