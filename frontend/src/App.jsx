import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import MainLayout from './layout/MainLayout';
import LoginPage from "./pages/LoginPage";

function App() {  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>
    )
  );

  return (    
    <RouterProvider router={router} />            
  );
}

export default App;
