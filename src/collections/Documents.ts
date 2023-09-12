import { CollectionConfig } from 'payload/types';
import path from 'path';
import { publishedOrLoggedIn } from '../util/publishedOrLoggedIn';
import { loggedIn } from '../util/loggedIn';

export const Documents: CollectionConfig = {
  slug: 'documents',
  upload: {
    staticDir: path.resolve(__dirname, '../../documents'),
  },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publicTitle', 'filename'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'For internal management of documents, not shown to end users',
      },
    },
    {
      name: 'publicTitle',
      type: 'text',
      admin: {
        description: 'Shown to end users',
      },
    },
  ],
};
export default Documents;
