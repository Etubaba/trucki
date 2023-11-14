import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./layout/Root";
import CreateBooks from "./pages/CreateBooks";
import Books from "./pages/Books";
import { getAllBooks } from "./manager/requests";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index loader={getAllBooks} element={<Books />} />
      <Route path="/create-book" element={<CreateBooks />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
