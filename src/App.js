import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div>
      <Toaster containerClassName="z-[30010]" />
      <RouterProvider router={router}></RouterProvider>
      
    </div>
  );
}

export default App;
