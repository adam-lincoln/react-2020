import React, { useState } from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import List from '../List/List';

import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    // position: 'absolute',
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


const Layout = (props) => {

  const classes = useStyles();

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const [tabIndex, setTabIndex] = useState(0);

  const summaryList = props.buildList.map(build => build.summary);

  return (
    <div>
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
          value={tabIndex}
          onChange={(event, val) => setTabIndex(val)}
          variant="scrollable"
          scrollButtons="on"
          >
          <Tab label="BUILDS" />
          <Tab label="DRIVERS" />
          <Tab label="VEHICLES" />
          <Tab label="TYRES" />
          <Tab label="GLIDERS" />
        </Tabs>
      </AppBar>

      <div className={classes.offset} />
      <div className={classes.offset} />

      {/* https://react-swipeable-views.com/demos/demos/ */}
      <BindKeyboardSwipeableViews
        index={tabIndex}
        onChangeIndex={(val) => setTabIndex(val)}
        >
        <Box p={1}>
          <List title="Builds" resultsText="build(s)" items={summaryList} />
        </Box>
        <Box p={1}>
          <List title="Drivers" resultsText="driver(s)" items={props.driverList} />
        </Box>
        <Box p={1}>
          <List title="Vehicles" resultsText="vehicle(s)" items={props.vehicleList} />
        </Box>
        <Box p={1}>
          <List title="Tyres" resultsText="tyres(s)" items={props.tyreList} />
        </Box>
        <Box p={1}>
          <List title="Gliders" resultsText="glider(s)" items={props.gliderList} />
        </Box>
      </BindKeyboardSwipeableViews>

      <Zoom
        in={tabIndex === 0}
        timeout={transitionDuration}
        style={{ transitionDelay: `${tabIndex === 0 ? transitionDuration.exit : 0}ms`, }}
        unmountOnExit
      >
        <Fab className={classes.fab} color='primary'>
          <AddIcon />
        </Fab>
      </Zoom>

    </div>
  );
}

export default Layout;
