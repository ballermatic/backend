import type { CollectionConfig } from 'payload/types';

import { SlugField } from '@nouance/payload-better-fields-plugin';
import { formatAppURL, revalidateEntity } from '../util/revalidateEntity';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrHasSiteAccessOrPublished } from '../access/isAdminHasSiteAccessOrPublished';
import { isAdminOrHasSiteAccess } from '../access/isAdminOrHasSiteAccess';
import { isLoggedIn } from '../access/isLoggedIn';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_FRONTEND}/api/preview?url=${encodeURIComponent(
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
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with site access can update
    update: isAdminOrHasSiteAccess(),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: isAdminOrHasSiteAccessOrPublished,
    // Only admins can delete
    delete: isAdmin,
  },
  hooks: {
    afterChange: [revalidateEntity],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
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
    {
      name: 'content',
      type: 'richText',
      admin: {
        // Enable and disable text editor options
        elements: ['h2', 'h3', 'h4', 'link', 'ul', 'ol', 'indent', 'blockquote', 'upload'],
        // leaves: ['bold', 'italic'],
        // todo: enable uploads
      },
    },
    {
      name: 'displayDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Publicly shown publish date',
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      // defaultValues can use functions to return data to populate the create form and also when making POST requests the server will use the value or function to fill in any undefined fields before validation occurs
      defaultValue: ({ user }) => user.id,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Posts;
