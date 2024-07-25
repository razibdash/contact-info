import AddUsersModal from "./components/AddUsersModal";
import User from "./components/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUsersModal />,
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
