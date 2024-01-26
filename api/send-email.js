const postmark = require('postmark');

const sendEmailHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed.',
    });
  }

  try {
    const { email, name, message } = req.body;
    const client = new postmark.ServerClient(
      process.env['POSTMARK_SERVER_CLIENTID'],
    );

    await client.sendEmail({
      From: 'mail@jerrynavi.me',
      To: 'mail@jerrynavi.me',
      Subject: `Message from ${name} (${email})`,
      HtmlBody: message,
      TextBody: message,
      MessageStream: 'website-contact-form',
    });
    return res.status(200).json({
      success: true,
      message: 'Email sent!',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
};

module.exports = sendEmailHandler;
