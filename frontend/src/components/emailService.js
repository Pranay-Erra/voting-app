// src/emailService.js

import { ApiClient, EmailsApi } from '@elasticemail/elasticemail-client';

const ElasticEmailClient = ApiClient.instance;
const apiKey = ElasticEmailClient.authentications['apikey'];
apiKey.apiKey ='DD4019C72EAAB3C46F497E2E4A5957DD0E0C13163B091143116CFED06158DC3B2845BDDE06289DA2923D6A66BD73475F'; // Update with your new API key

const apiInstance = new EmailsApi();

export const sendEmail = async (email, subject, body) => {
  const emailPayload = {
    Recipients: [{ Email: email }],
    Content: {
      Body: [
        {
          ContentType: 'HTML',
          Content: body,
        },
      ],
      Subject: subject,
      From: 'pranayerra2003@email.com', // Change to your email address
    },
  };

  try {
    const data = await apiInstance.emailsPost(emailPayload);
    console.log('Email sent:', data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
