import React from 'react';
import styles from './App.module.scss';
import withClass from './hoc/withClass';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const App = () =>
  <Layout>
    <BurgerBuilder />
  </Layout>

export default withClass(App, styles.App);
