import React, {Fragment} from 'react';
//BrowserRouter allows us to DO WHAT??
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
//Components
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
//Contexts
import UserState from './context/user/UserState';

const App = () => {
  return (
    <UserState>
      <Router>
        <div className="App">
          <Header/>
          <main>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
          </main>
        </div>
      </Router>
    </UserState>
  );
}

export default App;