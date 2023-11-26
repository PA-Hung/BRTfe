import App from "../App";

import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LayoutAdmin from "./LayoutAdmin";
import AdminPage from "../components/admin/admin.page";
import UserPage from "../components/user/user.page";
import Login from "../components/auth/login";
import ProtectedRoute from "./protectedRoute";

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
        element: <AdminPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "tasklist",
        element: <div>TaskList</div>,
      },
    ],
  },
]);
