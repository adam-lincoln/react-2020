import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const ItemListCard = (props) => {

  const classes = useStyles();
  const theme = useTheme();

  const keys = Object.keys(props.items[0]).filter(key => key.startsWith('m_'));
  const minMax = {};
  keys.forEach(key => {
    minMax[key] = {
      min: props.items.map(item => item[key]).reduce((a, b) => Math.min(a, b)),
      max: props.items.map(item => item[key]).reduce((a, b) => Math.max(a, b)),
    };
  });

  const items = props.items.map(item => {

    const stats = {};

    stats.speed = {
      code: 'speed',
      name: 'Speed',
      value: item.m_speed_land,
      min: minMax.m_speed_land.min,
      max: minMax.m_speed_land.max,
    }

    stats.acceleration = {
      code: 'acceleration',
      name: 'Acceleration',
      value: item.m_acceleration,
      min: minMax.m_acceleration.min,
      max: minMax.m_acceleration.max,
    }

    stats.weight = {
      code: 'weight',
      name: 'Weight',
      value: item.m_weight,
      min: minMax.m_weight.min,
      max: minMax.m_weight.max,
    }

    stats.handling = {
      code: 'handling',
      name: 'Handling',
      value: item.m_handling_land,
      min: minMax.m_handling_land.min,
      max: minMax.m_handling_land.max,
    }

    stats.grip = {
      code: 'grip',
      name: 'Grip',
      value: item.m_traction_offroad,
      min: minMax.m_traction_offroad.min,
      max: minMax.m_traction_offroad.max,
    }

    const newItem = { ... item, stats };

    return newItem;
  });

  const [nameFilter, setNameFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([ ... items ]);

  useEffect(() => {
    const nameLower = nameFilter.toLowerCase();
    const applyNameFilter = nameLower.length > 0;
    const filteredItems = applyNameFilter ? items.filter(item => item.name.toLowerCase().indexOf(nameLower) >= 0) : items;
    setFilteredItems(filteredItems);
  }, [ nameFilter ]);


  const sortProperties = Object.keys(props.items[0]).sort((a, b) => a.localeCompare(b));
  const [sortProperty, setSortProperty] = useState('name');
  const [sortDirection, setSortDirection] = useState('+');

  useEffect(() => {
    const isAscending = sortDirection === '+';
    const filteredItems = items.sort((itemA, itemB) => {
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
    setFilteredItems(filteredItems);
  }, [ sortProperty, sortDirection ]);

  const normaliseValue = (value, min, max) => (value - min) * 100 / (max - min);

  return (
    <>
      <Typography variant="h3">
        {props.title}
      </Typography>

      <div>
        <p>Filter</p>
        {/* TODO: Collapsible filters with filter summary / auto collapse on scroll */}
        <TextField id="nameFilter" label="Name" value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} />
        <Button onClick={() => setNameFilter('')}>Clear</Button>
      </div>

      <div>
        <p>Sort</p>
        <p>sortProperty: {sortProperty} | sortDirection: {sortDirection}</p>
        <Button onClick={() => { setSortProperty('name'); setSortDirection('+'); }}>Reset</Button>
        <FormControl className={classes.formControl}>
          <InputLabel id="idSortProperty">Property</InputLabel>
          <Select labelId="idSortProperty" value={sortProperty} onChange={(event) => setSortProperty(event.target.value)}>
            {sortProperties.map(property => {
              return (
                <MenuItem key={property} value={property}>{property}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="idSortDirection">Direction</InputLabel>
          <Select labelId="idSortDirection" value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
            {[ '+', '-' ].map(direction => {
              return (
                <MenuItem key={direction} value={direction}>{direction}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {/* <pre>{JSON.stringify(sortProperties, null, 2)}</pre> */}
      </div>

      <p>{filteredItems.length} driver(s)</p>

      <Box>
        {filteredItems.map(item => {
          return (
            <Box my={1} key={item.code} >
              <Card className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  title={item.name}
                  image='/static/images/MK8_BabyDaisy_Icon.png'
                />
                <div className={classes.details}>
                  <CardContent>
                    <Typography variant="h4">
                      {item.name}
                    </Typography>
                    <div>

                      {Object.keys(item.stats).map(key => {
                        const stat = item.stats[key];
                        return (
                          <div key={stat.code}>
                            <span>{stat.name}: {stat.value}</span>
                            {/* (min: {stat.min}, max: {stat.max}) */}
                            <LinearProgress variant="determinate" value={normaliseValue(stat.value, stat.min, stat.max)} />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                </div>
              </Card>
            </Box>
          );
        })}

      </Box>
    </>
  );
}

export default ItemListCard;
