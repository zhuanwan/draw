import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import PageError from '@/components/page-error';

import routes from './index';

function ErrorBoundary() {
    const error = useRouteError();
    const errorInfo = { title: '页面异常', description: error.toString() };
    return <PageError errorInfo={errorInfo} />;
}

const getBrowserRouter = (r) => {
    const br = r.map((ele) => {
        const { path, element, permissions, children } = ele;
        const p = { path, element };

        p.errorElement = <ErrorBoundary />;

        if (permissions && permissions.length) {
            p.loader = (e) => authLoader(e, permissions);
        }

        if (children) {
            p.children = getBrowserRouter(children);
        }
        return p;
    });
    return br;
};

const authLoader = async (_, permissions) => {
   return null
};

const routerComponent = () => {
    const router = createBrowserRouter(getBrowserRouter(routes));

    return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
};

export default routerComponent;
