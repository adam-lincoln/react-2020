import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { amber, blue, blueGrey, brown, common, cyan,
//   deepOrange, deepPurple, green, grey, indigo, lightBlue,
//   lightGreen, lime, orange, pink, purple, red, teal, yellow
// } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Filter from './Filter';
import Sort from './Sort';
import CardStyle1 from './CardStyle1';


const SORTS = [
  { code: '+name', name: '+Name'},
  { code: '-name', name: '-Name'},

  { code: '+m_speed_land', name: '+Speed'},
  { code: '-m_speed_land', name: '-Speed'},

  { code: '+m_acceleration', name: '+Acceleration'},
  { code: '-m_acceleration', name: '-Acceleration'},

  { code: '+m_weight', name: '+Weight'},
  { code: '-m_weight', name: '-Weight'},

  { code: '+m_handling_land', name: '+Handling'},
  { code: '-m_handling_land', name: '-Handling'},

  { code: '+m_traction_offroad', name: '+Grip'},
  { code: '-m_traction_offroad', name: '-Grip'},
];


const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  slimCard: {
    padding: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    }
  },
  resultsText: {
    margin: theme.spacing(1),
  },
  rounded: {
    color: '#fff',
    backgroundColor: orange[200],
  },
}));


const filterItems = (items, filters) => {
  const applyFilters = filters.length !== 0;
  return !applyFilters
    ? items
    : items.filter(item => {
        const results = filters.map(filter => {
          return filter.code
            ? item.code === filter.code
            : item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        });
        const show = results.reduce((a, b) => a || b);
        return show;
      });
}


const sortItems = (items, sort) => {

  const sorts = [];
  if (sort) {
    sorts.push(sort);
  }

  const applySorts = sorts.length !== 0;
  if (!applySorts) {
    return items;
  }

  let sortedItems = [...items];

  sorts.forEach(sort => {
    const isAscending = sort.startsWith('+');
    const sortProperty = sort.substring(1);

    sortedItems = sortedItems.sort((itemA, itemB) => {
      const valA = itemA[sortProperty];
      const valB = itemB[sortProperty];
      if (typeof valA === 'string' || valA instanceof String) {
        return isAscending
          ? valA.toLowerCase().localeCompare(valB.toLowerCase())
          : valB.toLowerCase().localeCompare(valA.toLowerCase());
      }
      if (typeof valB === 'number' || valB instanceof Number) {
        return isAscending
          ? valA - valB
          : valB - valA;
      }
      return 0;
     });

  });

  return sortedItems;

}


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


const normaliseValue = (val, min, max) => (val - min) * 100 / (max - min);


const mapItem = (item, minMax) => {
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

  const newItem = { ...item, stats };

  return newItem;
}


const mapItems = (items, minMax) => items.map(item => mapItem(item, minMax));


const List = (props) => {

  const classes = useStyles();

  const minMax = getMinMaxValues(props.items);
  const items = mapItems(props.items, minMax);
  const originalItems = [...items];
  const sortedOriginalItems = sortItems([...originalItems], SORTS[0].code);

  const [nameFilter, setNameFilter] = useState([]);
  const [filteredItems, setFilteredItems] = useState([...items]);
  const [currentSort, setCurrentSort] = useState(SORTS[0].code);

  const cards = filteredItems.map(item =>
    <CardStyle1 key={item.code} name={item.name} type={item.type} image_name={item.image_name} stats={item.stats} />
  );

  useEffect(() => {
    const filteredItems = filterItems(items, nameFilter);
    const sortedFilteredItems = sortItems(filteredItems, currentSort);
    setFilteredItems(sortedFilteredItems);
  }, [ nameFilter, currentSort ]);

  return (
    <>
      <Card>
        <CardContent className={classes.slimCard}>
          <FormGroup>
            <FormLabel>Filter and sort</FormLabel>
            <Filter items={sortedOriginalItems} changed={(val) => setNameFilter(val)} />
            <Sort items={SORTS} selectedItem={currentSort} changed={(val) => setCurrentSort(val)} />
          </FormGroup>
        </CardContent>
      </Card>

      <Typography variant="body2" className={classes.resultsText}>{filteredItems.length} {props.resultsText}</Typography>

      <Box>
        {cards}
      </Box>
    </>
  );
}

export default List;
