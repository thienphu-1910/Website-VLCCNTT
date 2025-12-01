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
import ProtectedRoute from "./router/ProtectedRoute";
import HistoryPage from "./pages/HistoryPage";

function App() {  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/history' element={<HistoryPage />} />
        </Route>
      </Route>
    )
  );

  // const test_router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path='/' element={<MainLayout />}>
  //       <Route index element={<LoginPage />} />
  //       <Route path='/home' element={<HomePage />} />
  //     </Route>
  //   )
  // );

  return (  
    <>    
      <RouterProvider router={router} /> 
      <ToastContainer />
    </>           
  );
}

export default App;
