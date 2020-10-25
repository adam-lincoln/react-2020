import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './App.module.scss';
import withClass from './hoc/withClass';
import Layout from './containers/Layout/Layout';
import Data from './Data';

const App = (props) => {
  const data = Data();
  return (
    <>
      <CssBaseline />
      <Layout
        buildList={[] | data.buildList}
        driverList={data.driverList}
        vehicleList={[] | data.vehicleList}
        tyreList={[] | data.tyreList}
        gliderList={[] | data.gliderList}
      />
    </>
  );
}

export default withClass(App, styles.App);
