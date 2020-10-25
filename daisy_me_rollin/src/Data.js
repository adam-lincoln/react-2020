import DRIVER_LIST from './assets/data/out/driver.csv.json';
import VEHICLE_LIST from './assets/data/out/vehicle.csv.json';
import TYRE_LIST from './assets/data/out/tyre.csv.json';
import GLIDER_LIST from './assets/data/out/glider.csv.json';


const generateBuildItem = (driverList, vehicleList, tyreList, gliderList, driverCode, vehicleCode, tyreCode, gliderCode) => {

  const summary = {
    type: 'summary',
    driver: driverList.filter(driver => driver.code === driverCode)[0],
    vehicle: vehicleList.filter(vehicle => vehicle.code === vehicleCode)[0],
    tyre: tyreList.filter(tyre => tyre.code === tyreCode)[0],
    glider: gliderList.filter(glider => glider.code === gliderCode)[0],
    points: {},
  };
  // console.log('summary=', summary);

  const models = [summary.driver, summary.vehicle, summary.tyre, summary.glider];
  summary.code = models.map(model => model.code).join(':');

  Object.keys(summary.driver.points)
    .filter(key => key !== 'total')
    .forEach(key => summary.points[key] = models.map(model => model.points[key]).reduce((a, b) => a + b));
  // console.log('summary=', summary);

  // PT total
  summary.points.total = Object.keys(summary.points).map(key => summary.points[key]).reduce((a, b) => a + b);
  // console.log('summary=', summary);

  const minMax = {
    speed_land: {
      min: 0,
      max: 20,
    },
    acceleration: {
      min: 0,
      max: 20,
    },
    weight: {
      min: 0,
      max: 20,
    },
    handling_land: {
      min: 0,
      max: 20,
    },
    traction_offroad: {
      min: 0,
      max: 20,
    },
  };

  summary.stats = {};

  summary.stats.speed = {
    code: 'speed',
    name: 'Speed',
    val: summary.points.speed_land,
    min: minMax.speed_land.min,
    max: minMax.speed_land.max,
  };

  summary.stats.acceleration = {
    code: 'acceleration',
    name: 'Acceleration',
    val: summary.points.acceleration,
    min: minMax.acceleration.min,
    max: minMax.acceleration.max,
  };

  summary.stats.weight = {
    code: 'weight',
    name: 'Weight',
    val: summary.points.weight,
    min: minMax.weight.min,
    max: minMax.weight.max,
  };

  summary.stats.handling = {
    code: 'handling',
    name: 'Handling',
    val: summary.points.handling_land,
    min: minMax.handling_land.min,
    max: minMax.handling_land.max,
  };

  summary.stats.grip = {
    code: 'grip',
    name: 'Grip',
    val: summary.points.traction_offroad,
    min: minMax.traction_offroad.min,
    max: minMax.traction_offroad.max,
  };
  // console.log('summary=', summary);

  // PCT
  const normaliseValue = (val, min, max) => (val - min) * 100 / (max - min);
  Object.keys(summary.stats).forEach(key => {
    summary.stats[key].pct = Math.round(normaliseValue(summary.stats[key].val, summary.stats[key].min, summary.stats[key].max), 0);
  });
  // console.log('summary=', summary);

  // STATS total
  summary.stats.total = Object.keys(summary.stats)
    .map(key => summary.stats[key].val)
    .reduce((a, b) => a + b);
  // console.log('summary=', summary);

  // STATS screen
  Object.keys(summary.stats)
    .filter(key => key !== 'total')
    .forEach(key => summary.stats[key].screen = (summary.stats[key].val + 3) / 4);
  console.log('summary=', summary);

  return summary;
}


const generateBuildList = (driverList, vehicleList, tyreList, gliderList) => [
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'bowser', 'circuit_special', 'slick', 'super_glider'),
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'dry_bones', 'flame_rider', 'standard', 'super_glider'),
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'mario', 'standard_kart', 'standard', 'super_glider'),
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'gold_mario', 'gold_standard', 'gold_wheels', 'gold_glider'),
];


const Data = () => {

  const driverList = [...DRIVER_LIST];
  const vehicleList = [...VEHICLE_LIST];
  const tyreList = [...TYRE_LIST];
  const gliderList = [...GLIDER_LIST];

  const buildList = [...generateBuildList(driverList, vehicleList, tyreList, gliderList)];

  return {
    buildList,
    driverList,
    vehicleList,
    tyreList,
    gliderList,
  }

};


export default Data;
