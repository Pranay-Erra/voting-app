import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendEmail = async () => {
    try {
      const response = await axios.post('https://api.elasticemail.com/v2/email/send', {
        apiKey: 'DD4019C72EAAB3C46F497E2E4A5957DD0E0C13163B091143116CFED06158DC3B2845BDDE06289DA2923D6A66BD73475F',
        to: email,
        subject: subject,
        bodyHtml: body,
        from: 'pranayerra2003@email.com', // Change to your email address
        fromName: 'Pranay', // Change to your name
      });

      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Recipient Email" />
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Email Body"></textarea>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailForm;
