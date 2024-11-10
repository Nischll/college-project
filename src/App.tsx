import { lazy, Suspense } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Hero from './assets/components/Hero';

function App() {

  const Login = lazy(() => import ("./assets/components/Login"));
  const Signup = lazy(() => import ("./assets/components/Signup"));
  // const Hero = lazy(() => import ("./assets/components/Hero"));
  return (
    <>
      <RouterProvider router = {createBrowserRouter([
        {
          path:"/",
          element:(
            <Suspense fallback = {<h2>Hero page loading..........</h2>}>
              <Hero><Login/></Hero>
            </Suspense> 
            ),
          errorElement:<>Page not found</>,
        },
        {
          path:"/signup",
          element:(
            <Suspense fallback = {<h2>Hero page loading..........</h2>}>
              <Hero><Signup/></Hero>
            </Suspense> 
            ),
          errorElement:<>Page not found</>,
        },
        
      ])}/>
    </>
  )
}

export default App;
