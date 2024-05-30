import GradePage from "../views/GradePage";
import MainPage from "../views/MainPage";
import SignupPage from "../views/SignupPage";
import MyPage from "../views/MyPage";
import ToDoListPage from "../views/ToDoListPage";
import WithdrawPage from "../views/WithdrawPage";
import SchedulePage from "../views/SchedulePage";

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
  {
    path: "/my",
    element: <MyPage />,
  },
  {
    path: "/schedule",
    element: <SchedulePage/>,
  },
];

export default routes;
