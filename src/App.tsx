import { lazy, Suspense } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Hero from './assets/components/Layouts/Hero';
import { AuthProvider } from "./assets/components/Layouts/AuthContext";
import { Provider } from 'react-redux';
import store from './assets/components/Redux/Store';

function App() {

  const Login = lazy(() => import ("./assets/components/Pages/Login"));
  const Signup = lazy(() => import ("./assets/components/Pages/Signup"));
  const Layout = lazy(() => import ("./assets/components/Layouts/Layout"));
  const Dashboard = lazy(() => import ("./assets/components/Pages/Dashboard"));
  const Inventory = lazy(() => import ("./assets/components/Pages/Inventory"));
  const Reports = lazy(() => import ("./assets/components/Pages/Reports"));
  const Orders = lazy(() => import ("./assets/components/Pages/Orders"));
  // const ManageStores = lazy(() => import ("./assets/components/Pages/ManageStores"));
  const Settings = lazy(() => import ("./assets/components/Pages/Settings"));
  // const ProductList = lazy(() => import ("./assets/components/Redux/ProductList"));

  const Client = new QueryClient();
  return (
    <>
    <QueryClientProvider client={Client}>
    <Provider store={store}>
    <AuthProvider>
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
            // {
            //   index: true,
            //   element:<Dashboard/>
            // },
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
            // {
            //   path:"managestores",
            //   element:<ManageStores/>
            // },
            // {
            //   path:"product",
            //   element:<ProductList/>
            // },
          ]
        },
        {
          path:"/settings",
          element:<Suspense fallback = {<h2>Settings page loading...........</h2>}><Settings/></Suspense>
        },
        
      ])}/>
    </AuthProvider>
    </Provider>
    </QueryClientProvider>
    </>
  )
}

export default App;
