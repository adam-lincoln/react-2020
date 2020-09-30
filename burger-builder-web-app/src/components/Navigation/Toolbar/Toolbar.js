import React from 'react';
// import withClass from '../../../hoc/withClass';
import styles from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) =>
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    {/* <span style={{ color: 'white', }}>Britty's Burgers</span> */}
    {/* <nav>...</nav> */}
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>

// export default withClass(toolbar, styles.Toolbar);
export default toolbar;
