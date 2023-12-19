import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "@/router/layoutAdmin";
import UserPage from "@/components/user/user.page";
import ProtectedRoute from "@/router/protectedRoute";
import Tasklist from "@/components/tasklist/tasklist.page";
import Login from "@/components/auth/login.page";
import TaskListByUser from "@/components/tasklist/forUser/tasklistByUser.table";
import CameraPage from "../components/cameraman/camera.page";

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
            {
        path: "cameraman",
        element: <CameraPage />,
      },
      {
        path: "usertasklist",
        element: <TaskListByUser />,
      },
    ],
  },
]);
