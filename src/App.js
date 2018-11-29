import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Components/Layout';
import { Home } from './Components/Home';
import { Map } from './Components/Map';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/map' component={Map} />
      </Layout>
    );
  }
}
