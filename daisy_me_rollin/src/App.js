import React from 'react';
import styles from './App.module.scss';
import withClass from './hoc/withClass';

import DRIVER_LIST from './assets/data/driver.csv.json';
import VEHICLE_LIST from './assets/data/vehicle.csv.json';
import TYRE_LIST from './assets/data/tyre.csv.json';
import GLIDER_LIST from './assets/data/glider.csv.json';

import Layout from './containers/Layout/Layout';

const mapItem = (item) => {
  const newObject = {};
  const doNotTouch = ['code', 'name', 'type', 'image_name'];
  Object.keys(item).forEach(key => {
    const val = item[key];
    if (doNotTouch.indexOf(key) >= 0) {
      newObject[key] = val;
    } else {
      newObject['m_'+key] = val;
    }
  });
  return newObject;
}

const App = () =>
  <>
    <Layout
      driverList={DRIVER_LIST.map(driver => mapItem(driver))}
      vehicleList={VEHICLE_LIST.map(vehicle => mapItem(vehicle))}
      tyreList={TYRE_LIST.map(tyre => mapItem(tyre))}
      gliderList={GLIDER_LIST.map(glider => mapItem(glider))}
      />
  </>

export default withClass(App, styles.App);
