import React, { useState } from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import { amber, blue, blueGrey, brown, common, cyan,
  deepOrange, deepPurple, green, grey, indigo, lightBlue,
  lightGreen, lime, orange, pink, purple, red, teal, yellow
} from '@material-ui/core/colors';

import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
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

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    // flexGrow: 1,
    // padding: 0,
    // margin: 0,
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
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
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

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Daisy me rollin'
          </Typography>
        </Toolbar>
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} variant="scrollable" scrollButtons="on">
          <Tab id="0" label="BUILDS" />
          <Tab id="1" label="DRIVERS" />
          <Tab id="2" label="VEHICLES" />
          <Tab id="3" label="TYRES" />
          <Tab id="4" label="GLIDERS" />
        </Tabs>
      </AppBar>

      {/* <div className={classes.offset} style={{ backgroundColor: green[100], }} /> */}
      {/* <div className={classes.offset} style={{ backgroundColor: green[200], }} /> */}

      <SwipeableViews index={value} onChangeIndex={(index) => setValue(index)}>
        <TabPanel index={0} value={value}>
          <List title="Builds" items={props.buildList.map(build => build.summary)} />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <List title="Drivers" items={props.driverList} />
        </TabPanel>
        <TabPanel index={2} value={value}>
          <List title="Vehicles" items={props.vehicleList} />
        </TabPanel>
        <TabPanel index={3} value={value}>
          <List title="Tyres" items={props.tyreList} />
        </TabPanel>
        <TabPanel index={4} value={value}>
          <List title="Gliders" items={props.gliderList} />
        </TabPanel>
      </SwipeableViews>

      {/* <div className={classes.offset} /> */}

      <Zoom
          in={value === 0}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`,
          }}
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
