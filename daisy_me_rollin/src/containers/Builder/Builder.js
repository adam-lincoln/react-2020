import React, { useState } from 'react';

import SelectItem from '../../components/SelectItem/SelectItem';

const Builder = (props) => {

  // const [driverCode, setDriver] = useState(props.driverList[0].code);
  // const [vehicleCode, setVehicle] = useState(props.vehicleList[0].code);
  // const [tyreCode, setTyre] = useState(props.tyreList[0].code);
  // const [gliderCode, setGlider] = useState(props.gliderList[0].code);

  const [driverCode, setDriver] = useState('dry_bones');
  const [vehicleCode, setVehicle] = useState('flame_rider');
  const [tyreCode, setTyre] = useState('standard');
  const [gliderCode, setGlider] = useState('super_glider');

  const driverModel = props.driverList.filter(driver => driver.code === driverCode)[0];
  const vehicleModel = props.vehicleList.filter(vehicle => vehicle.code === vehicleCode)[0];
  const tyreModel = props.tyreList.filter(tyre => tyre.code === tyreCode)[0];
  const gliderModel = props.gliderList.filter(glider => glider.code === gliderCode)[0];

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

  return (
    <div>
      <h1>Builder</h1>

      <SelectItem
        title="Driver"
        selected={driverCode}
        itemList={props.driverList.map(driver => { return { code: driver.code, name: driver.name }; }).sort((a, b) => a.name.localeCompare(b.name))}
        changed={(code) => setDriver(code)}
        />

      <SelectItem
        title="Vehicle"
        selected={vehicleCode}
        itemList={props.vehicleList.map(vehicle => { return { code: vehicle.code, name: vehicle.name }; }).sort((a, b) => a.name.localeCompare(b.name))}
        changed={(code) => setVehicle(code)}
        />

      <SelectItem
        title="Tyre"
        selected={tyreCode}
        itemList={props.tyreList.map(tyre => { return { code: tyre.code, name: tyre.name }; }).sort((a, b) => a.name.localeCompare(b.name))}
        changed={(code) => setTyre(code)}
        />

      <SelectItem
        title="Glider"
        selected={gliderCode}
        itemList={props.gliderList.map(glider => { return { code: glider.code, name: glider.name }; }).sort((a, b) => a.name.localeCompare(b.name))}
        changed={(code) => setGlider(code)}
        />

      <div>

        <pre>
        build={JSON.stringify(build, null, 2)}
        </pre>

      </div>

    </div>
  );
}

export default Builder;
