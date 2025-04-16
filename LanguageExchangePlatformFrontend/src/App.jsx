import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "edit",
            element: (
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
