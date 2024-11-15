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
  const Reports = lazy(() => import ("./assets/components/Pages/Reports"));
  const Orders = lazy(() => import ("./assets/components/Pages/Orders"));
  const ManageStores = lazy(() => import ("./assets/components/Pages/ManageStores"));
  const Settings = lazy(() => import ("./assets/components/Pages/Settings"));

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
              element:<Dashboard/>
            },
            {
              path:"dashboard",
              element:<Dashboard/>
            },
            {
              path:"inventory",
              element:<Inventory/>
            },
            {
              path:"reports",
              element:<Reports/>
            },
            {
              path:"orders",
              element:<Orders/>
            },
            {
              path:"managestores",
              element:<ManageStores/>
            },
          ]
        },
        {
          path:"/settings",
          element:<Suspense fallback = {<h2>Settings page loading...........</h2>}><Settings/></Suspense>
        },
        
      ])}/>
    </>
  )
}

export default App;
