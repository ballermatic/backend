import type { CollectionConfig } from 'payload/types';

import { SlugField } from '@nouance/payload-better-fields-plugin';
import { loggedIn } from '../util/loggedIn';
import { publishedOrLoggedIn } from '../util/publishedOrLoggedIn';
import { formatAppURL, revalidateEntity } from '../util/revalidateEntity';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${encodeURIComponent(
        formatAppURL({
          doc,
        }),
      )}&collection=posts&slug=${doc.slug}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrLoggedIn,
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  hooks: {
    afterChange: [revalidateEntity],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...SlugField(['title'], undefined, {
      admin: {
        position: 'sidebar',
      },
    }),
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Brief overview of the content',
      },
    },
  ],
};

export default Posts;
