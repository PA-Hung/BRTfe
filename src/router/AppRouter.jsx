import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "./LayoutAdmin";
import UserPage from "../components/user/user.page";
import ProtectedRoute from "./protectedRoute";
import Tasklist from "../components/tasklist/tasklist.page";
import Login from "../components/auth/login.page";
import TaskListByUser from "../components/tasklist/forUser/tasklistByUser.table";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Tasklist />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      // {
      //   path: "tasklist",
      //   element: <Tasklist />,
      // },
      {
        path: "usertasklist",
        element: <TaskListByUser />,
      },
    ],
  },
]);
