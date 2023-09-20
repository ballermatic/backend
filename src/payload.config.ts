import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import { buildConfig } from 'payload/config';
import Posts from './collections/Posts';
import Users from './collections/Users';
import Documents from './collections/Documents';
import Categories from './collections/Categories';
import OpenGraphImages from './collections/OpenGraphImages';
import PrivacyPolicy from './globals/PrivacyPolicy';
import CookiePolicy from './globals/CookiePolicy';
import seo from '@payloadcms/plugin-seo';

// Toggle cors and csrf settings for local development
let localOrLive: string[];
if (process.env.NODE_ENV === 'production') {
  localOrLive = [process.env.PAYLOAD_PUBLIC_BACKEND, process.env.PAYLOAD_PUBLIC_FRONTEND];
} else {
  localOrLive = ['*'];
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  serverURL: process.env.PAYLOAD_PUBLIC_BACKEND,
  cors: localOrLive,
  csrf: localOrLive,
  collections: [Posts, Categories, OpenGraphImages, Documents, Users],
  globals: [PrivacyPolicy, CookiePolicy],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    seo({
      collections: ['posts'],
      uploadsCollection: 'og-img',
    }),
  ],
});
