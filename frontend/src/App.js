import React, { Suspense, lazy } from 'react';
import './App.css';
import Layout from './hoc/Layout';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <div className="App">
      <Layout>
        <div className="container">
          <Suspense fallback="Loading...">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Suspense>
        </div>
      </Layout>
    </div>
  );
}

export default App;
