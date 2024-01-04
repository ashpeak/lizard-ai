const transporter = require('../configs/nodemailer');

module.exports = async (name, email, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Ashish Singh 👻" <cs1.coursely@gmail.com>', // sender address
                to: email, // list of receivers
                subject: `Video ready to download`, // Subject line
                html: `
                    <div style="background-color: #f3f4f6; padding: 2rem; border-radius: 1rem;">
                        <div style="background-color: #fff; padding: 2rem; border-radius: 1rem;">
                            <h1 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem;">${process.env.BRAND_NAME}</h1>
                            <p style="font-size: 1.2rem; margin-bottom: 1rem;">Hi ${name},</p>
                            <p style="font-size: 1.2rem; margin-bottom: 2rem;">Your video is ready. Click on the button below to download it.</p>
                            <a href="${url}" style="background-color: #f87171; color: #fff; padding: 1rem; border-radius: 2rem; text-decoration: none;">Download Video</a>
                            <p style="font-size: 1.2rem; margin-top: 3rem;">Thanks,</p>
                            <p style="font-size: 1.2rem; margin-bottom: 1rem;">${process.env.BRAND_NAME}</p>
                        </div>
                    </div>
                `, // html body
            });

            resolve(info);

        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}