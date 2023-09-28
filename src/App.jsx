
import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { useEffect } from 'react';
import {login, logout} from './store/authSlice'
import  {Header, Footer} from './components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => { 
    authService.getCurrentUser()
     .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout());
        }
     })
     .finally(() => setloading(false));
  } , [])

 return !loading ? (
  <div>
    <h1 className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          outlet
          {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </h1>
  </div>
 ) : null;
}

export default App
