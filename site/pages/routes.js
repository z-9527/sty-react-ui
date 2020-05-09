import React from 'react';
import asyncComponent from './asyncComponent';
import Home from './Home';

const ButtonPage = asyncComponent(() => import('./Button'));
const LoadingPage = asyncComponent(() => import('./Loading'));
const TabsPage = asyncComponent(() => import('./Tabs'));
const IconPage = asyncComponent(() => import('./Icon'));
const IndexListPage = asyncComponent(() => import('./IndexList'));
const NavBarPage = asyncComponent(() => import('./NavBar'));
const TimeLinePage = asyncComponent(() => import('./TimeLine'));
const TreeSelectPage = asyncComponent(() => import('./TreeSelect'));
const PopupPage = asyncComponent(() => import('./Popup'));
const CellPage = asyncComponent(() => import('./Cell'));
const SwitchPage = asyncComponent(() => import('./Switch'));
const RadioPage = asyncComponent(() => import('./Radio'));
const CheckboxPage = asyncComponent(() => import('./Checkbox'));
const SwipePage = asyncComponent(() => import('./Swipe'));
const ToastPage = asyncComponent(() => import('./Toast'));
const ActionSheetPage = asyncComponent(() => import('./ActionSheet'));

let routes = [
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
  },
  {
    path: '/index-list',
    component: IndexListPage
  },
  {
    path: '/nav-bar',
    component: NavBarPage
  },
  {
    path: '/timeline',
    component: TimeLinePage
  },
  {
    path: '/tree-select',
    component: TreeSelectPage
  },
  {
    path: '/popup',
    component: PopupPage
  },
  {
    path: '/cell',
    component: CellPage
  },
  {
    path: '/switch',
    component: SwitchPage
  },
  {
    path: '/radio',
    component: RadioPage
  },
  {
    path: '/checkbox',
    component: CheckboxPage
  },
  {
    path: '/swipe',
    component: SwipePage
  },
  {
    path: '/toast',
    component: ToastPage
  },
  {
    path: '/action-sheet',
    component: ActionSheetPage
  }
];

routes = routes.map(i => ({
  ...i,
  component: () => <div className='page-box'><i.component /></div> // 用div将懒加载的代码包裹起来，防止路由动画不起作用
}));

export default routes;
