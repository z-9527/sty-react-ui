import asyncComponent from './asyncComponent';
import Home from './Home';

const ButtonPage = asyncComponent(() => import('./Button'));
const LoadingPage = asyncComponent(() => import('./Loading'));
const TabsPage = asyncComponent(() => import('./Tabs'));
const IconPage = asyncComponent(() => import('./Icon'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/button',
    component: ButtonPage
  },
  {
    path: '/loading',
    component: LoadingPage
  },
  {
    path: '/tabs',
    component: TabsPage
  },
  {
    path: '/icon',
    component: IconPage
  }

];

export default routes;
