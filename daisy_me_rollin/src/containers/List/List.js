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
import CardStyle2Summary from './CardStyle2Summary';
import CardStyle2Item from './CardStyle2Item';


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

  { code: '+total1', name: '+Total1'},
  { code: '-total1', name: '-Total1'},

  { code: '+total2', name: '+Total2'},
  { code: '-total2', name: '-Total2'},
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


const List = (props) => {

  const classes = useStyles();

  const originalItems = [...props.items];
  const sortedOriginalItems = sortItems([...originalItems], SORTS[0].code);

  const [nameFilter, setNameFilter] = useState([]);
  const [currentSort, setCurrentSort] = useState(SORTS[0].code);
  const [sortedAndFilteredItems, setSortedAndFilteredItems] = useState([]);

  const cards = sortedAndFilteredItems.map(item => {
    if (item.type === 'summary') {
      return (
        <CardStyle2Summary
          key={item.code}
          name={item.name}
          type={item.type}
          image_name={item.image_name}
          stats={item.stats}
          total1={item.total1}
          total2={item.total2}
        />
      );
    } else {
      return (
        <CardStyle2Item
          key={item.code}
          name={item.name}
          type={item.type}
          image_name={item.image_name}
          stats={item.stats}
          total1={item.total1}
          total2={item.total2}
        />
      );
    }
  });

  useEffect(() => {
    const filteredItems = filterItems([...originalItems], nameFilter);
    const sortedFilteredItems = sortItems(filteredItems, currentSort);
    setSortedAndFilteredItems(sortedFilteredItems);
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

      <Typography variant="body2" className={classes.resultsText}>
        {sortedAndFilteredItems.length} {props.resultsText}
      </Typography>

      <Box>
        {cards}
      </Box>
    </>
  );
}

export default List;
