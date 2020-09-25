import React from 'react';
import styles from './App.module.scss';
import withClass from './hoc/withClass';

import DRIVER_LIST from './assets/data/driver.csv.json';
import VEHICLE_LIST from './assets/data/vehicle.csv.json';
import TYRE_LIST from './assets/data/tyre.csv.json';
import GLIDER_LIST from './assets/data/glider.csv.json';

import Layout from './containers/Layout/Layout';
import Layout2 from './containers/Layout2/Layout2';

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

const App = () => {

  const driverList = DRIVER_LIST.map(driver => mapItem(driver));
  const vehicleList = VEHICLE_LIST.map(vehicle => mapItem(vehicle));
  const tyreList = TYRE_LIST.map(tyre => mapItem(tyre));
  const gliderList = GLIDER_LIST.map(glider => mapItem(glider));

  const driverCode = 'dry_bones';
  const vehicleCode = 'flame_rider';
  const tyreCode = 'standard';
  const gliderCode = 'super_glider';

  const driverModel = driverList.filter(driver => driver.code === driverCode)[0];
  const vehicleModel = vehicleList.filter(vehicle => vehicle.code === vehicleCode)[0];
  const tyreModel = tyreList.filter(tyre => tyre.code === tyreCode)[0];
  const gliderModel = gliderList.filter(glider => glider.code === gliderCode)[0];

  const models = [ driverModel, vehicleModel, tyreModel, gliderModel ];

  const summaryModel = {
    code: models.map(model => model.code).join(':'),
    name: models.map(model => model.name).join(', '),
  }

  const keys = Object.keys(driverModel);
  keys.forEach(key => summaryModel[key] = models.map(model => model[key]).reduce((a, b) => a + b));

  const build = {
    summary: summaryModel,
    driver: driverModel,
    vehicle: vehicleModel,
    tyre: tyreModel,
    glider: gliderModel,
  }

  const buildList = [ build ];

  return (
    <>
      {/* <Layout
        driverList={DRIVER_LIST.map(driver => mapItem(driver))}
        vehicleList={VEHICLE_LIST.map(vehicle => mapItem(vehicle))}
        tyreList={TYRE_LIST.map(tyre => mapItem(tyre))}
        gliderList={GLIDER_LIST.map(glider => mapItem(glider))}
        /> */}
      <Layout2
        buildList={buildList}
        driverList={driverList}
        vehicleList={vehicleList}
        tyreList={tyreList}
        gliderList={gliderList}
        />
    </>
  );
}

export default withClass(App, styles.App);
