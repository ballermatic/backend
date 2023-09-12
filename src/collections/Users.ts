import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};

export default Users;
