import './App.css';
import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from './componennts/Login/LoginContainer/LoginContainer';
import TaskContainer from './componennts/Task/TaskContainer/TaskContainer';
import PrivateRoute from './componennts/PrivateRoute/PrivateRoute';
import RegisterContainer from './componennts/Login/RegisterContainer/RegisterContainer';
import TaskManagment from './componennts/Task/TaskManagment/TaskManagment';
import Header from './componennts/Header/Header';
import authService from './services/AuthService';

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer />}></Route>
        <Route path='/login' element={<LoginContainer />}></Route>
        <Route path='/register' element={<RegisterContainer />}></Route>
        <Route path='/homePage' element={<PrivateRoute>
          <TaskContainer />
        </PrivateRoute>}></Route>
        <Route path='/manage-task' element={<PrivateRoute>
          <TaskManagment />
        </PrivateRoute>}></Route>
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
