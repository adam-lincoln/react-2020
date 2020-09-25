import React, { useState } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import ItemTable from '../../components/ItemTable/ItemTable';
import Builder from '../Builder/Builder';
import ItemTable2 from '../../components/ItemTable2/ItemTable2';
import ItemListCard from '../../components/ItemListCard/ItemListCard';


import SwipeableViews from 'react-swipeable-views';


import clsx from 'clsx';
import { lighten, makeStyles, useTheme  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


const TABLE_HEADERS = [
  "name",
  "weight",
  "acceleration",
  "traction_onroad",
  "traction_offroad",
  "turbo_mini",
  "speed_land",
  "speed_water",
  "speed_antigravity",
  "speed_air",
  "handling_land",
  "handling_water",
  "handling_antigravity",
  "handling_air"
];


const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    // color: theme.palette.blue,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  listBackground: {
    // backgroundColor: 'grey',
    // backgroundColor: theme.palette.grey,
    // backgroundColor: theme.palette.background.paper,
  }
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
        <Box p={3}>
          <Typography>{children}</Typography>
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

  console.log(props);

  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
          // indicatorColor="primary"
          // textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
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
          <div className={classes.offset} />
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


  // return (
  //   <>
  //     <Box>

  //       <AppBar position="fixed">
  //         <Toolbar>
  //           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
  //             <MenuIcon />
  //           </IconButton>
  //           <Typography variant="h6" className={classes.title}>
  //             Daisy me rollin'
  //           </Typography>
  //         </Toolbar>
  //       </AppBar>

        // <div className={classes.offset} />

        // <Container className={classes.listBackground}>

        //   <p>This.</p>

          {/* <ItemTable
            title="Driver Table"
            tableHeaders={TABLE_HEADERS}
            itemList={props.driverList}
          /> */}

          {/* <ItemTable2
            title="Driver Table"
            tableHeaders={TABLE_HEADERS}
            itemList={props.driverList}
          /> */}

          {/* <ItemListCard
            title="Drivers"
            items={props.driverList}
          /> */}

        {/* </Container> */}

        // <div className={classes.offset} />

        // <Paper square className={classes.stickToBottom}>
        //   <Tabs
        //     value={tabValue}
        //     onChange={handleTabChange}
        //     variant="fullWidth"
        //     indicatorColor="secondary"
        //     textColor="secondary"
        //   >
        //     {/* <Tab icon={<PersonPinIcon />} label="KARTS" /> */}
        //     <Tab label="BUILDS" />
        //     <Tab label="DRIVERS" />
        //     <Tab label="KARTS" />
        //     <Tab label="TYRES" />
        //     <Tab label="GLIDERS" />
        //   </Tabs>
        // </Paper>

        {/* <BottomNavigation
          value={bottomNavigationValue}
          onChange={(event, newValue) => {
            setBottomNavigationValue(newValue);
          }}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation> */}

//       </Box>
//     </>
//   );
// }

export default Layout;
