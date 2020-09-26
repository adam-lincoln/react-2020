import React from 'react';
import styles from './App.module.scss';
import withClass from './hoc/withClass';

import Layout from './containers/Layout/Layout';

import DRIVER_LIST from './assets/data/driver.csv.json';
import VEHICLE_LIST from './assets/data/vehicle.csv.json';
import TYRE_LIST from './assets/data/tyre.csv.json';
import GLIDER_LIST from './assets/data/glider.csv.json';


const DO_NOT_TOUCH_FIELDS = ['code', 'name', 'type', 'image_name'];


const mapItem = (item) => {
  const newObject = {};
  Object.keys(item).forEach(key => {
    const val = item[key];
    if (key === 'image_name') {
      const type = item['type'];
      const prefix = type === 'driver' ? '64px' : '100px';
      const newVal = val.replace(/ /g, '_').replace(/_+/g, '_');
      newObject[key] = `/static/images/downloaded/${prefix}-${newVal}`;
    } else if (DO_NOT_TOUCH_FIELDS.indexOf(key) >= 0) {
      newObject[key] = val;
    } else {
      newObject['m_'+key] = val;
    }
  });
  return newObject;
}


const mapList = (list) => list.map(item => mapItem(item));


const driverList = mapList(DRIVER_LIST);
const vehicleList = mapList(VEHICLE_LIST);
const tyreList = mapList(TYRE_LIST);
const gliderList = mapList(GLIDER_LIST);


const generateBuildItem = (driverCode, vehicleCode, tyreCode, gliderCode) => {

  const driverModel = driverList.filter(driver => driver.code === driverCode)[0];
  const vehicleModel = vehicleList.filter(vehicle => vehicle.code === vehicleCode)[0];
  const tyreModel = tyreList.filter(tyre => tyre.code === tyreCode)[0];
  const gliderModel = gliderList.filter(glider => glider.code === gliderCode)[0];

  const models = [driverModel, vehicleModel, tyreModel, gliderModel];

  const summaryModel = {
    code: models.map(model => model.code).join(':'),
    name: models.map(model => model.name).join(', '),
    image_name: driverModel.image_name,
  }

  Object.keys(driverModel)
    .filter(key => key !== 'image_name')
    .forEach(key =>
      summaryModel[key] = models.map(model => model[key]).reduce((a, b) => a + b));

  return {
    summary: summaryModel,
    driver: driverModel,
    vehicle: vehicleModel,
    tyre: tyreModel,
    glider: gliderModel,
  };
}


const generateBuildList = () => [
  generateBuildItem('dry_bones', 'flame_rider', 'standard', 'super_glider'),
];


const buildList = generateBuildList();


const App = () =>
  <Layout
    buildList={buildList}
    driverList={driverList}
    vehicleList={vehicleList}
    tyreList={tyreList}
    gliderList={gliderList}
  />

export default withClass(App, styles.App);
