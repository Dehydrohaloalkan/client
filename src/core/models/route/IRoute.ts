export interface IRoute {
    name: string;
    route: string;
    path: string;
    element: JSX.Element;
    icon: JSX.Element;
    picture: {
        src: string;
        alt: string;
    };
    description: string;
}
