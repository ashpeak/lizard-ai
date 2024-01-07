const transporter = require('../configs/nodemailer');

module.exports = async (email, url) => {
    return new Promise(async (resolve, reject) => {
        try {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Ashish Singh 👻" <cs1.coursely@gmail.com>', // sender address
                to: email, // list of receivers
                subject: `Login to ${process.env.BRAND_NAME}`, // Subject line
                html: `
                    <div style="background-color: #f3f4f6; padding: 2rem; border-radius: 1rem;">
                        <div style="background-color: #fff; padding: 2rem; border-radius: 1rem;">
                            <h1 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem;">Login to ${process.env.BRAND_NAME}</h1>
                            <p style="font-size: 1.2rem; font-weight: 400; margin-bottom: 2rem;">Click the button below to login to your ${process.env.BRAND_NAME} account.</p>
                            <a href="${url}" style="background-color: #f87171; font-weight: 600; color: #fff; padding: 0.75rem 1.5rem; border-radius: 2rem; text-decoration: none;">Login</a>
                            <p style="font-size: 1.2rem; font-weight: 400; margin-top: 2rem;">Or copy and paste the following link in your browser:</p>
                            <a href="${url}" style="font-size: 1.2rem; font-weight: 400;">${url}</a>
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
