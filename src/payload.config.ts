import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import { buildConfig } from 'payload/config';
import Posts from './collections/Posts';
import Users from './collections/Users';
import Documents from './collections/Documents';
import OpenGraphImages from './collections/OpenGraphImages';
import PrivacyPolicy from './globals/PrivacyPolicy';
import CookiePolicy from './globals/CookiePolicy';
import seo from '@payloadcms/plugin-seo';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Posts, OpenGraphImages, Documents, Users],
  globals: [PrivacyPolicy, CookiePolicy],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
    // schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    seo({
      collections: ['posts'],
      uploadsCollection: 'og-img',
    }),
  ],
});
