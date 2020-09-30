import React from 'react';
import styles from './SideDrawer.module.scss';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  const attachedClasses = [ styles.SideDrawer ];
  if (props.open) {
    attachedClasses.push(styles.Open);
  } else {
    attachedClasses.push(styles.Closed);
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
}

export default sideDrawer;
