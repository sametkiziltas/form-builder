import React from "react";

const FormBuilder = React.lazy(() => import("./views/form/Builder"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const RuleBuilder = React.lazy(() => import("./views/rule/Builder"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/form", name: "Form Builder", component: FormBuilder },
  { path: "/rule", name: "Rule Builder", component: RuleBuilder },
];

export default routes;
