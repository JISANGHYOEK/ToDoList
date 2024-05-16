import MainPage from "../views/MainPage";
import SignupPage from "../views/SignupPage";

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

export default routes;
