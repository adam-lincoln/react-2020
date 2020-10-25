const fs = require('fs');
const Papa = require('papaparse');


function csv2json(file) {

  try {

    const path = `../raw/${file}`;
    // console.log('path=', path);

    if (!fs.existsSync(path)) {
      throw new Error('File does not exist.');
    }

    const csv = fs.readFileSync(path, { encoding: 'utf-8' });
    // console.log('csv=', csv);

    const data = Papa.parse(csv, {
      delimiter: ',',
      newline: '\r\n',
      quoteChar: '\"',
      escapeChar: '\"',
      header: true,
      dynamicTyping: true,
      encoding: 'utf-8',
      skipEmptyLines: true,
    });
    // console.log('data=', data);

    let items = data.data;
    // console.log('items=', items);

    // CODE
    // NOTE: If fields include code and name and code is blank, replace with snake case name.
    if (data.meta.fields.includes('code') && data.meta.fields.includes('name')) {
      items.forEach(item => {
        const codeIsEmpty = (item.code || '').length === 0;
        const nameIsEmpty = (item.name || '').length === 0;
        if (codeIsEmpty && !nameIsEmpty) {
          item.code = item.name.toLowerCase().replace(/\W/g, '_').replace(/_+/g, '_');
        }
      });
    }
    // console.log('items=', items);

    // IMAGE URL
    if (data.meta.fields.includes('image')) {
      items.forEach(item => {
        const type = item['type'];
        const prefix = type === 'driver' ? '64px' : '100px';
        const newVal = item['image'].replace(/ /g, '_').replace(/_+/g, '_');
        item.image_url = `/static/images/downloaded/${prefix}-${newVal}`;
      });
    }
    // console.log('items=', items);

    // POINTS
    if (data.meta.fields.filter(key => key.startsWith('pt_')).length >= 0) {
      const firstItem = items[0];
      const pointKeys = Object.keys(firstItem).filter(key => key.startsWith('pt_'));
      console.log('pointKeys=', pointKeys);

      items.forEach(item => {
        pointKeys.forEach(key => {
          const newKey = key.substring(3);
          const val = item[key];
          if (!item.points) {
            item.points = {};
          }
          item.points[newKey] = val;
          delete item[key];
        });
      });

      // PT total
      items.forEach(item => {
        item.points.total = Object.keys(item.points)
          .map(key => item.points[key])
          .reduce((a, b) => a + b);
      });

      const minMax = {};
      Object.keys(items[0].points).forEach(key => {
        minMax[key] = {
          min: 0,  // items.map(item => item.points[key]).reduce((a, b) => Math.min(a, b)),
          max: items.map(item => item.points[key]).reduce((a, b) => Math.max(a, b)),
        };
      });
      console.log('minMax=', minMax);

      items.forEach(item => {
        item.stats = {};

        item.stats.speed = {
          code: 'speed',
          name: 'Speed',
          val: item.points.speed_land,
          min: minMax.speed_land.min,
          max: minMax.speed_land.max,
        };

        item.stats.acceleration = {
          code: 'acceleration',
          name: 'Acceleration',
          val: item.points.acceleration,
          min: minMax.acceleration.min,
          max: minMax.acceleration.max,
        };

        item.stats.weight = {
          code: 'weight',
          name: 'Weight',
          val: item.points.weight,
          min: minMax.weight.min,
          max: minMax.weight.max,
        };

        item.stats.handling = {
          code: 'handling',
          name: 'Handling',
          val: item.points.handling_land,
          min: minMax.handling_land.min,
          max: minMax.handling_land.max,
        };

        item.stats.grip = {
          code: 'grip',
          name: 'Grip',
          val: item.points.traction_offroad,
          min: minMax.traction_offroad.min,
          max: minMax.traction_offroad.max,
        };

        // PCT
        const normaliseValue = (val, min, max) => (val - min) * 100 / (max - min);
        Object.keys(item.stats).forEach(key => {
          item.stats[key].pct = Math.round(normaliseValue(item.stats[key].val, item.stats[key].min, item.stats[key].max), 0);
        });

        // STATS total
        item.stats.total = Object.keys(item.stats)
          .map(key => item.stats[key].val)
          .reduce((a, b) => a + b);

      });
    }
    console.log('items=', items);

    const string_data = JSON.stringify(items, null, 2) + '\r\n';
    fs.writeFileSync(`../out/${file}.json`, string_data, { encoding: 'utf-8' });

  } catch (err) {

    console.error('err=', err);

  }

}

[
  'driver.csv',
  'vehicle.csv',
  'tyre.csv',
  'glider.csv',
].forEach(file => csv2json(file));
