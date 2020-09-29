import DRIVER_LIST from './assets/data/driver.csv.json';
import VEHICLE_LIST from './assets/data/vehicle.csv.json';
import TYRE_LIST from './assets/data/tyre.csv.json';
import GLIDER_LIST from './assets/data/glider.csv.json';

const DO_NOT_TOUCH_FIELDS = ['code', 'name', 'type', 'image_name'];

const normaliseValue = (val, min, max) => (val - min) * 100 / (max - min);

const mapItemStage1 = (item) => {
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
};

const getMinMaxValues = (items) => {
  const keys = Object.keys(items[0]).filter(key => key.startsWith('m_'));
  const minMax = {};
  keys.forEach(key => {
    minMax[key] = {
      min: items.map(item => item[key]).reduce((a, b) => Math.min(a, b)),
      max: items.map(item => item[key]).reduce((a, b) => Math.max(a, b)),
    };
  });
  return minMax;
}

const mapItemStage2 = (item, minMax) => {
  const stats = {};

  stats.speed = {
    code: 'speed',
    name: 'Speed',
    val: item.m_speed_land,
    min: minMax.m_speed_land.min,
    max: minMax.m_speed_land.max,
  }

  stats.acceleration = {
    code: 'acceleration',
    name: 'Acceleration',
    val: item.m_acceleration,
    min: minMax.m_acceleration.min,
    max: minMax.m_acceleration.max,
  }

  stats.weight = {
    code: 'weight',
    name: 'Weight',
    val: item.m_weight,
    min: minMax.m_weight.min,
    max: minMax.m_weight.max,
  }

  stats.handling = {
    code: 'handling',
    name: 'Handling',
    val: item.m_handling_land,
    min: minMax.m_handling_land.min,
    max: minMax.m_handling_land.max,
  }

  stats.grip = {
    code: 'grip',
    name: 'Grip',
    val: item.m_traction_offroad,
    min: minMax.m_traction_offroad.min,
    max: minMax.m_traction_offroad.max,
  }

  Object.keys(stats).forEach(key => {
    stats[key].pct = normaliseValue(stats[key].val, stats[key].min, stats[key].max);
  });

  const total1 = Object.keys(stats).map(key => stats[key].val).reduce((a, b) => a + b);

  const total2 = Object.keys(item)
    .filter(key => key.startsWith('m_'))
    .map(key => item[key])
    .reduce((a, b) => a + b);

  const newItem = { ...item, stats, total1, total2 };

  return newItem;
}

const mapItems = (items, minMax) => items.map(item => mapItemStage2(item, minMax));

const mapList = (list) => {
  const newList1 = list.map(item => {
    const newItem = mapItemStage1(item);
    return newItem;
  });

  const minMax = getMinMaxValues(newList1);
  const newList2 = mapItems(newList1, minMax);

  return newList2;
};

const generateBuildItem = (driverList, vehicleList, tyreList, gliderList, driverCode, vehicleCode, tyreCode, gliderCode) => {

  const driverModel = driverList.filter(driver => driver.code === driverCode)[0];
  const vehicleModel = vehicleList.filter(vehicle => vehicle.code === vehicleCode)[0];
  const tyreModel = tyreList.filter(tyre => tyre.code === tyreCode)[0];
  const gliderModel = gliderList.filter(glider => glider.code === gliderCode)[0];

  const models = [driverModel, vehicleModel, tyreModel, gliderModel];

  const summaryModel = {
    code: models.map(model => model.code).join(':'),
    name: models.map(model => model.name).join(', '),
    type: 'summary',
    image_name: models.map(model => model.image_name),
  }

  Object.keys(driverModel)
    //.filter(key => DO_NOT_TOUCH_FIELDS.indexOf(key) === -1)
    .filter(key => key.startsWith('m_'))
    .forEach(key => summaryModel[key] = models.map(model => model[key]).reduce((a, b) => a + b));

  const minMax = {
    m_speed_land: {
      min: 0,
      max: 20,
    },
    m_acceleration: {
      min: 0,
      max: 20,
    },
    m_weight: {
      min: 0,
      max: 20,
    },
    m_handling_land: {
      min: 0,
      max: 20,
    },
    m_traction_offroad: {
      min: 0,
      max: 20,
    },
  };

  const summaryModel2 = mapItemStage2(summaryModel, minMax);
  summaryModel2.stats.speed.screen = (summaryModel2.stats.speed.val + 3) / 4;
  summaryModel2.stats.acceleration.screen = (summaryModel2.stats.acceleration.val + 3) / 4;
  summaryModel2.stats.weight.screen = (summaryModel2.stats.weight.val + 3) / 4;
  summaryModel2.stats.handling.screen = (summaryModel2.stats.handling.val + 3) / 4;
  summaryModel2.stats.grip.screen = (summaryModel2.stats.grip.val + 3) / 4;
  console.log(summaryModel2);

  return {
    summary: summaryModel2,
    driver: driverModel,
    vehicle: vehicleModel,
    tyre: tyreModel,
    glider: gliderModel,
  };
}

const generateBuildList = (driverList, vehicleList, tyreList, gliderList) => [
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'bowser', 'circuit_special', 'slick', 'super_glider'),
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'dry_bones', 'flame_rider', 'standard', 'super_glider'),
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'mario', 'standard_kart', 'standard', 'super_glider'),
  generateBuildItem(driverList, vehicleList, tyreList, gliderList, 'gold_mario', 'gold_standard', 'gold_wheels', 'gold_glider'),
];

const Data = () => {

  const driverList = mapList(DRIVER_LIST);
  const vehicleList = mapList(VEHICLE_LIST);
  const tyreList = mapList(TYRE_LIST);
  const gliderList = mapList(GLIDER_LIST);

  const buildList = generateBuildList(driverList, vehicleList, tyreList, gliderList);

  return {
    buildList,
    driverList,
    vehicleList,
    tyreList,
    gliderList,
  }

};

export default Data();
