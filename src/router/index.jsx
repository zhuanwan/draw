import Loadable from '@loadable/component';

import Loading from '@/components/loading';

const Home = Loadable(() => import('@/pages/home'), {
    fallback: <Loading />,
});

const Edit = Loadable(() => import('@/pages/edit'), {
    fallback: <Loading />,
});
const NotFound = Loadable(() => import('@/pages/404'), {
    fallback: <Loading />,
});

const routes = [
    {
        path: '/',
        name: '首页',
        element: <Home />,
    },
    {
        path: '/edit',
        name: '编辑页',
        element: <Edit />,
    },
    {
        path: '/404',
        name: '404',
        element: <NotFound />,
    },
    { path: '*', element: <NotFound /> },
];

export default routes;
