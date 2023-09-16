import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import express from 'express';
import payload from 'payload';
import nodemailerSendgrid from 'nodemailer-sendgrid';

const sendGridAPIKey = process.env.SENDGRID_API_KEY;

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET_KEY,
    mongoURL: process.env.MONGO_URL,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
    ...(sendGridAPIKey
      ? {
          email: {
            transportOptions: nodemailerSendgrid({
              apiKey: sendGridAPIKey,
            }),
            fromName: 'Admin',
            fromAddress: 'admin@gravybo.at',
          },
        }
      : {}),
  });

  // Custom express routes

  // Railway healthcheck
  // app.get('/health', (_, res) => {
  //   res.sendStatus(200);
  // });

  app.listen(3000);
};

start();
