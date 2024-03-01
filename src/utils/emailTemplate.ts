const supportEmail = process.env.SUPPORT_EMAIL;

export const getPasswordResetMail = ({
  name,
  resetLink,
}: {
  name: string;
  resetLink: string;
}) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Reset Password</title>
  </head>
  <body>
    <h2>Password Reset Instructions</h2>
    <p>Dear ${name},</p>
    <p>We have received a request to reset your password for your account at ProductFeedback. To proceed with the password reset, please click on below link:</p>
    <a href="${resetLink}">Click to Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Please note that this link is valid for a 10 minutes and can only be used once. If the link has expired, you can initiate a new password reset request on our website.</p>
    <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>ProductFeedback</p>
    <p>Email: ${supportEmail}</p>
  </body>
  </html>
    `;
};

export const getVerficationEmail = ({
  name,
  verificationURL,
}: {
  name: string;
  verificationURL: string;
}) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Account Verification</title>
  </head>
  <body>
    <h2>Account Verification</h2>
    <p>Dear ${name},</p>
    <p>Thank you for creating an account at ProductFeedback. To activate your account, please click on the link below:</p>
    <p><a href=${verificationURL}>Verify Account</a></p>
    <p>If you did not create an account, please ignore this email.</p>
    <p>By verifying your account, you will gain access to all the features and benefits of our platform.</p>
    <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>ProductFeedback</p>
    <p>Email: ${supportEmail}</p>
  </body>
  </html>
  `;
};

export const getTwoFactorEmail = ({
  name,
  twoFactorCode,
}: {
  name: string;
  twoFactorCode: string;
}) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Two Factor Authentication</title>
  </head>
  <body>
    <h2>Two Factor Authentication</h2>
    <p>Dear ${name},</p>
    <p>For added security, we use two-factor authentication for your ProductFeedback account. Please enter the following code to complete your login:</p>
    <p><strong>${twoFactorCode}</strong></p>
    <p>If you did not attempt to log in to your account, please ignore this email or contact our support team immediately.</p>
    <p>By using two-factor authentication, you add an extra layer of security to your account.</p>
    <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>ProductFeedback</p>
    <p>Email: ${supportEmail}</p>
  </body>
  </html>`;
};
