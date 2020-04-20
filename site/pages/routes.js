import asyncComponent from './asyncComponent';
import Home from './Home';

const Button = asyncComponent(() => import('./Button'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/button',
    component: Button
  }
];

export default routes;
