import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { amber, blue, blueGrey, brown, common, cyan,
  deepOrange, deepPurple, green, grey, indigo, lightBlue,
  lightGreen, lime, orange, pink, purple, red, teal, yellow
} from '@material-ui/core/colors';

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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Chip from '@material-ui/core/Chip';
import SpeedIcon from '@material-ui/icons/Speed';


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


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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
  avatar: {
    width: 100,
    backgroundSize: 'contain',
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


const normaliseValue = (value, min, max) => (value - min) * 100 / (max - min);


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


const mapItem = (item, minMax) => {
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
            <FormControl className={classes.formControl}>
              {/* https://material-ui.com/api/autocomplete/ */}
              <Autocomplete
                multiple
                options={sortedOriginalItems}
                limitTags={1}
                disableCloseOnSelect
                clearOnBlur
                clearOnEscape
                freeSolo
                fullWidth
                forcePopupIcon
                filterSelectedOptions
                getOptionLabel={(option) => {
                  if (option && option.name) {
                    return option.name;
                  }
                  return option;
                }}
                renderInput={(params) => <TextField {...params} variant="standard" label={props.title} />}
                renderOption={(option, { selected }) => {
                  const image_name = option.type === 'summary' ? option.image_name[0] : option.image_name;
                  return (
                    <React.Fragment>
                      <img width='40px' height='40px' src={image_name} style={{ objectFit: 'contain', }} />
                      <Typography style={{ marginLeft: '8px', }}>
                        {option.name}
                      </Typography>
                    </React.Fragment>
                  );
                }}
                onChange={(event, value, reason) => setNameFilter(value)}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Sort</InputLabel>
              <Select fullWidth value={currentSort} onChange={(event) => setCurrentSort(event.target.value)}>
                {SORTS.map(sort => <MenuItem fullWidth key={sort.code} value={sort.code}>{sort.name}</MenuItem>)}
              </Select>
            </FormControl>
          </FormGroup>
        </CardContent>
      </Card>

      <Typography variant="body2" className={classes.resultsText}>{filteredItems.length} {props.title.toLowerCase()}(s)</Typography>

      <Box>
        {filteredItems.map(item => {
          const image_name = item.type === 'summary' ? item.image_name[0] : item.image_name;
          return (
            <Box my={1} key={item.code} >
              <Card className={classes.root}>
                <CardMedia
                  className={classes.avatar}
                  title={item.name}
                  image={image_name}
                />
                <div className={classes.details}>
                  <CardContent>
                    <Typography variant="h6">
                      {item.name}
                    </Typography>
                    <div>
                      {Object.keys(item.stats).map(key => {
                        const stat = item.stats[key];
                        return (
                          <div key={stat.code}>
                            <span>{stat.name}: {stat.value}</span>
                            <LinearProgress variant="determinate" value={normaliseValue(stat.value, stat.min, stat.max)} />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </div>
              </Card>

            </Box>
          );
        })}

      </Box>
    </>
  );
}

export default List;
