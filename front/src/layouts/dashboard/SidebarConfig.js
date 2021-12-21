import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import settingsFill from '@iconify/icons-eva/settings-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

import peopleFill from '@iconify/icons-eva/people-fill';
import jwtDecode from 'jwt-decode';


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
let  sidebarConfig;
if(localStorage.getItem('token')&&jwtDecode(localStorage.getItem('token')).role==='admin'){
sidebarConfig= [
 
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'orders',
    path: '/dashboard/order',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: getIcon(settingsFill)
  },



];
}

else{
  sidebarConfig= [
 

    {
      title: 'settings',
      path: '/dashboard/settings',
      icon: getIcon(settingsFill)
    },
  
  
  
  ];



}

export default sidebarConfig;
