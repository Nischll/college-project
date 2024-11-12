import { lazy, Suspense } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Hero from './assets/components/Layouts/Hero';

function App() {

  const Login = lazy(() => import ("./assets/components/Pages/Login"));
  const Signup = lazy(() => import ("./assets/components/Pages/Signup"));
  // const Hero = lazy(() => import ("./assets/components/Hero"));
  const Layout = lazy(() => import ("./assets/components/Layouts/Layout"));
  const Dashboard = lazy(() => import ("./assets/components/Pages/Dashboard"));
  const Inventory = lazy(() => import ("./assets/components/Pages/Inventory"));

  return (
    <>
      <RouterProvider router = {createBrowserRouter([
        {
          path:"/",
          element:(
            <Suspense fallback = {<h2>Login page loading..........</h2>}>
              <Hero><Login/></Hero>
            </Suspense> 
            ),
          errorElement:<>Page not found</>,
        },
        {
          path:"/signup",
          element:(
            <Suspense fallback = {<h2>Signup page loading..........</h2>}>
              <Hero><Signup/></Hero>
            </Suspense> 
            ),
          errorElement:<>Page not found</>,
        },
        {
          path:"/layout",
          element:(
            <Suspense fallback = {<h2>Page loading..........</h2>}>
              <Layout/>
            </Suspense> 
            ),
          errorElement:<>Page not found</>,
          children:[
            {
              index: true,
              element:(
                <Suspense><Dashboard/></Suspense>
              )
            },
            {
              path:"/layout/dashboard",
              element:(
                <Suspense fallback = {<h2>Dashboard loading..........</h2>}><Dashboard/></Suspense>
              )
            },
            {
              path:"/layout/inventory",
              element:(
                <Suspense fallback = {<h2>Inventory loading..........</h2>}><Inventory/></Suspense>
              )
            },
          ]
        },
        
      ])}/>
    </>
  )
}

export default App;
