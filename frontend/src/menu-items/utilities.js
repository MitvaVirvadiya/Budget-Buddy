// assets
import { IconLicense, IconClipboardData, IconFileExport, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconLicense,
  IconClipboardData,
  IconFileExport,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-expenses',
      title: 'Expenses',
      type: 'item',
      url: '/utils/expenses',
      icon: icons.IconLicense,
      breadcrumbs: false
    },
    {
      id: 'util-reports',
      title: 'Reports',
      type: 'item',
      url: '/utils/reports',
      icon: icons.IconClipboardData,
      breadcrumbs: false
    },
    {
      id: 'util-exports',
      title: 'Exports',
      type: 'item',
      url: '/utils/exports',
      icon: icons.IconFileExport,
      breadcrumbs: false
    }
  ]
};

export default utilities;
