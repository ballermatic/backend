import { CollectionConfig } from 'payload/types';
import { isLoggedIn } from '../access/isLoggedIn';
import path from 'path';

export const Documents: CollectionConfig = {
  slug: 'documents',
  upload: {
    staticDir: path.resolve(__dirname, '../../documents'),
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
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
