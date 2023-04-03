export type RouteType = {
    name: string;
    path: string;
    route: string;
    element: JSX.Element;
    icon: JSX.Element;
    picture?: {
        src: string;
        alt: string;
    };
    description?: string;
};
