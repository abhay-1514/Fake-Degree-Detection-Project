import { useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import DetailsAll from './pages/DetailsAll'
import DetailsByHash from './pages/DetailsByHash'
import DetailsById from './pages/DetailsById'
import StudentDetails from './pages/StudentDetails'
import Wallet from './pages/Wallet';

import './App.css'

function App() {

  const [state,setState]=useState({web3:null,contract:null,account:null})

  const saveState=({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }

  const router = createBrowserRouter([
    {path:'/',element:<Wallet saveState={saveState}/>},
    {path:'/all-details',element:<DetailsAll />},
    {path:'/details-by-hash',element:<DetailsByHash />},
    {path:'/get-student-details-by-index',element:<DetailsById />},
    {path:'/add-student-details',element:<StudentDetails state={state}/>}
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
