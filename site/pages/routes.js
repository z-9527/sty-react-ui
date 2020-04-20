import asyncComponent from './asyncComponent';
import Home from './Home';

const ButtonPage = asyncComponent(() => import('./Button'));
const LoadingPage = asyncComponent(() => import('./Loading'));

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
  }

];

export default routes;
