import GradePage from "../views/GradePage";
import MainPage from "../views/MainPage";
import SignupPage from "../views/SignupPage";
import ToDoListPage from "../views/ToDoListPage";
import WithdrawPage from "../views/WithdrawPage";

const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/withdraw",
    element: <WithdrawPage />,
  },
  {
    path: "/todo",
    element: <ToDoListPage />,
  },
  {
    path: "/grade",
    element: <GradePage />,
  },
];

export default routes;
