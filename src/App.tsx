import { lazy, Suspense } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

function App() {

  const Login = lazy(() => import ("./assets/components/Login"));
  const Signup = lazy(() => import ("./assets/components/Signup"));
  
  return (
    <>
      <RouterProvider router = {createBrowserRouter([
        {
          path:"/",
          element:<Suspense fallback = {<h2>Login page loading..........</h2>}><Login/></Suspense>,
          errorElement:<>Page not found</>,
        },
        {
          path:"/components/signup",
          element:<Suspense fallback = {<h2>Signup Page Loading............</h2>}><Signup/></Suspense>,
          errorElement:<>Page not found</>,
        },
        
      ])}/>
    </>
  )
}

export default App
