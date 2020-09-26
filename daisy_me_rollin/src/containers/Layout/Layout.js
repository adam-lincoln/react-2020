import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import ItemListCard from '../../components/ItemListCard/ItemListCard';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
    backgroundColor: '#eee',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}


const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Layout = (props) => {

  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => setValue(newValue);
  const handleChangeIndex = (index) => setValue(index);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Daisy me rollin'
          </Typography>
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="BUILDS" {...a11yProps(0)} />
          <Tab label="DRIVERS" {...a11yProps(1)} />
          <Tab label="VEHICLES" {...a11yProps(2)} />
          <Tab label="TYRES" {...a11yProps(3)} />
          <Tab label="GLIDERS" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <div className={classes.offset} />
      <div className={classes.offset} />

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ItemListCard title="Builds" items={props.buildList.map(build => build.summary)} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ItemListCard title="Drivers" items={props.driverList} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ItemListCard title="Vehicles" items={props.vehicleList} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ItemListCard title="Tyres" items={props.tyreList} />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <ItemListCard title="Gliders" items={props.gliderList} />
        </TabPanel>
      </SwipeableViews>

    </div>
  );
}

export default Layout;
