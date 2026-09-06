import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const {site, name, email, tel, text, message} = body;

        if (site === 'tiffanystudio') {
            // Create transporter (using Gmail SMTP)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER_TIFFANYSTUDIO, // your Gmail address
                    pass: process.env.SMTP_PASS_TIFFANYSTUDIO  // app password or OAuth token
                }
            });

            // Send mail
            await transporter.sendMail({
                from: `Magnólia Tiffanystudió <${email}>`,
                to: process.env.SMTP_USER_TIFFANYSTUDIO,
                replyTo: `"${name}" <${email}>`,
                subject: text || 'Contant form submission',
                text: `
Name: ${name}
Email: ${email}
Phone: ${tel || ''}

Message:

${message}
`,
            });
        } else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER_GLASSARTISTA, // your Gmail address
                    pass: process.env.SMTP_PASS_GLASSARTISTA  // app password or OAuth token
                }
            });

            // Send mail
            await transporter.sendMail({
                from: `GlassArtista <${email}>`,
                to: process.env.SMTP_USER_GLASSARTISTA,
                replyTo: `"${name}" <${email}>`,
                subject: text || 'Contant form submission',
                text: `
Name: ${name}
Email: ${email}
Phone: ${tel || ''}

Message:

${message}
`,
            });
        }

        return new Response(JSON.stringify({success: true}), {status: 200});
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({success: false, error: err.message}), {status: 500});
    }
}
