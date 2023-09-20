import { Access } from 'payload/config';

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles.includes('admin')) return true;

    // If user has role of 'editor'
    if (user.roles.includes('editor')) return true;
  }
};
