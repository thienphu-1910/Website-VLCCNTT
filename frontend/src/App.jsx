import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import MainLayout from './layout/MainLayout';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";

function App() {  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
      </Route>
    )
  );

  return (  
    <>
      <ToastContainer />
      <RouterProvider router={router} /> 
    </>           
  );
}

export default App;
