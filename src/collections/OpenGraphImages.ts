import { CollectionConfig } from 'payload/types';
import path from 'path';
import { loggedIn } from '../util/loggedIn';
import { publishedOrLoggedIn } from '../util/publishedOrLoggedIn';

const OpenGraphImages: CollectionConfig = {
  slug: 'og-img',
  labels: {
    singular: 'Open Graph Image',
    plural: 'Open Graph Images',
  },
  access: {
    read: () => true,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename'],
    description: '1200x630 pixels',
  },
  upload: {
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(__dirname, '../../og-img'),
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 252,
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Not shown to end users',
      },
    },
  ],
};

export default OpenGraphImages;
