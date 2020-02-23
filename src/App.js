import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import TodoView from './views/TodoView';

// todomvc styles
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';


const App = () => (
  <div>
    <Router>
      <Route exact path="/" render={() => <Redirect to="/react-rxjs-todos/" />} />
    </Router>
    <Router basename="/react-rxjs-todos/">
      <div>
        <Route exact path="/" component={ TodoView } />
        <Route exact path="/:filter" component={ TodoView } />
      </div>
    </Router>
  </div>
);

export default App;