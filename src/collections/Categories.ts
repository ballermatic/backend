import { CollectionConfig } from 'payload/types';
import { isLoggedIn } from '../access/isLoggedIn';
import CategorySummary from '../components/CategorySummary';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'id', 'archived'],
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: false,
    },
    {
      name: 'archived',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Archiving filters it from being an option in the posts collection',
      },
    },
    {
      name: 'summary',
      // ui fields do not impact the database or api, and serve as placeholders for custom components in the admin panel
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          // this custom component will fetch the posts count for how many posts have this category
          Field: CategorySummary,
        },
      },
    },
  ],
};

export default Categories;
