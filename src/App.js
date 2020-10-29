import React from "react";
import { Provider } from "react-redux"
import {createStore} from "redux";
import { ApolloProvider } from 'react-apollo'
import {Router, Route, Redirect} from "react-router";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import browserHistory from 'history/createBrowserHistory'
import logo from "./assets/images/logo.png"

import chatState from './reducers'
import {
  ChatRoom,
  FindRoom,
  JoinRoom,
  NewRoom,
  NameFormComponent,
} from './components'
import client from "./models";

const store = createStore(
  chatState, {
  routing: routerReducer
})

const history = syncHistoryWithStore(browserHistory(), store);

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <div className="app">
          <img className="logo" src={logo}/> 
          <div className="container">
            <Route component={NameFormComponent}>
              <Route path="/" render={() => {
                return <Redirect to="/user"/>
              }}/>
              <Route exact path="/chatRoom" component={ChatRoom}/>
              <Route exact path="/joinRoom" component={JoinRoom}/>
              <Route exact path="/createRoom" component={NewRoom}/>
              <Route exact path="/findRoom" component={FindRoom}/>
              <Route exact path="/user" component={NameFormComponent}/>
            </Route>
          </div>
        </div>
      </Router>
    </Provider>
  </ApolloProvider>
);

export default App;
