import { lazy, Suspense } from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Hero from './assets/components/Layouts/Hero';
import { AuthProvider } from "./assets/components/useContext/AuthContext";
import { Provider } from 'react-redux';
import store from './assets/components/Redux/Store';
import ProtectedRoute from './assets/components/GenericComponents/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider } from './assets/components/useContext/SidebarContext';
import Sales from './assets/components/Pages/Sales/Sales';

function App() {

  const Login = lazy(() => import ("./assets/components/Pages/Login"));
  const Signup = lazy(() => import ("./assets/components/Pages/Signup"));
  const Layout = lazy(() => import ("./assets/components/Layouts/Layout"));
  const Dashboard = lazy(() => import ("./assets/components/Pages/Dashboard/Dashboard"));
  const Inventory = lazy(() => import ("./assets/components/Pages/Inventory/Inventory"));
  const Reports = lazy(() => import ("./assets/components/Pages/Reports/Reports"));
  const ManageStaff = lazy(() => import ("./assets/components/Pages/ManageStaff/ManageStaff"));
  const SalesTable = lazy(() => import ("./assets/components/Pages/Sales/SalesTable"));
  // const ProductList = lazy(() => import ("./assets/components/Redux/ProductList"));

  const Client = new QueryClient();
  return (
    <>
    <SidebarProvider>
    <ToastContainer limit={1}/>
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
              path: "dashboard",
              element: (
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <Dashboard />
                </ProtectedRoute>
              ),
            },
            {
              path:"inventory",
              element:(
                <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
                  <Inventory/>
                </ProtectedRoute>
              ),
            },
            {
              path:"sales",
              element:(
                <ProtectedRoute allowedRoles={["superAdmin", "admin", "user"]}>
                  <Sales/>
                </ProtectedRoute>
              )
            },
            {
              path:"sales_table",
              element:(
                <ProtectedRoute allowedRoles={["superAdmin", "admin", "user"]}>
                  <SalesTable/>
                </ProtectedRoute>
              )
            },
            {
              path:"reports",
              element:(
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <Reports />
                </ProtectedRoute>
              )
            },
            {
              path:"manage_staff",
              element:(
                <ProtectedRoute allowedRoles={["superAdmin"]}>
                  <ManageStaff/>
                </ProtectedRoute>
              ),
            }
          ]
        },        
      ])}/>
    </AuthProvider>
    </Provider>
    </QueryClientProvider>
    </SidebarProvider>
    </>
  )
}

export default App;
