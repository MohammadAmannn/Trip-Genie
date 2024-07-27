import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/ui/custom/Header.jsx'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/clerk-react'
import Viewtrip from './view-trip/[tripid]/Index.jsx'


const router=createBrowserRouter([
  {
path:'/', /* default Route*/
element:<App/>
  },
  {
path:'/create-trip',
element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripid',
    element:<Viewtrip/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey='pk_test_Y2l2aWwtd2FzcC03Ny5jbGVyay5hY2NvdW50cy5kZXYk'>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
