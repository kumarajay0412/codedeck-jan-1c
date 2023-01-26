import React from "react";

const Home = React.lazy(() => import("./Pages/Home"));
const playground = React.lazy(() => import("./Pages/Playground"));
const Page404 = React.lazy(() => import("./Pages/Page404"));
const SignIn = React.lazy(() => import("./Pages/SignIn"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));

const routes = [
    { path: "/", exact: true, name: "Home", component: <Home />, private: true },
    { path: "/home", exact: true, name: "Home", component: <Home />, private: true },

    { path: "/playground/:folderId/:playgroundId", exact: true, name: "Playground", component: <playground />, private: true },
    { path: "*", exact: true, name: "404", component: <Page404 />, private: false },
    { path: "/signin", exact: true, name: "SignIn", component: <SignIn />, private: false },
    { path: "/signup", exact: true, name: "SignUp", component: <SignUp />, private: false },
];

export default routes;