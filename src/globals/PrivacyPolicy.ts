import { GlobalConfig } from 'payload/types';

const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Legal',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      admin: {
        elements: ['h2', 'h3', 'h4', 'link', 'ul', 'ol', 'indent'],
        leaves: ['bold', 'italic'],
      },
    },
    {
      name: 'displayDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => new Date(),
    },
  ],
};

export default PrivacyPolicy;
