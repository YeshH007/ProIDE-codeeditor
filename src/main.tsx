import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage.tsx'
import HomepageError from './pages/HomepageError.tsx'
const router=createBrowserRouter([
  {
    path:'/',
      element:<Homepage/>,
      errorElement:<HomepageError/>
  },
  {
    path:'/workspace',
    element:<App/>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
