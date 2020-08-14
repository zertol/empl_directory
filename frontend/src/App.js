import React, { Suspense, lazy } from 'react';
import './App.css';
import Layout from './hoc/Layout';
import { Route, Switch } from 'react-router-dom';
import {EmployeeProvider} from './context/EmployeeProvider';

const Home = lazy(() => import('./pages/Home'));


function App() {
  return (
    <div className="App">
      <EmployeeProvider>
        <Layout>
          <div className="container">
            <Suspense fallback="<div>Loading...</div>">
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </Suspense>
          </div>
        </Layout>
      </EmployeeProvider>
    </div>
  );
}

export default App;
