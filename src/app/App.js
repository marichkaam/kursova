import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from '../main/MainPage';
import LoginPage from '../login/LoginPage';
import RegisterPage from '../register/RegisterPage';
import Home from '../home/Home';
import Apply from '../apply/Apply';
import { CandidateProvider } from '../CandidateContext';
//import { SuccessPage } from './SuccessPage';

function App() {
  return (
    <CandidateProvider>
      <Router>
        <div>
          <Switch>
            <Route path='/home' exact component={Home} />
            <Route path='/mainn' exact component={MainPage} /> 
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/apply" component={Apply} />
        
          </Switch>
        </div>
      </Router>
      </CandidateProvider>
  );
}

export default App;
