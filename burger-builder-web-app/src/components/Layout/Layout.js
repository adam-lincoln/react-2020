import React, { useState } from 'react';
import withClass from '../../hoc/withClass';
import styles from './Layout.module.scss';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

  const [showSideDraw, setShowSideDraw] = useState(false);

  return (
    <>
      <Toolbar drawerToggleClicked={() => setShowSideDraw(!showSideDraw)} />
      <SideDrawer open={showSideDraw} closed={() => setShowSideDraw(false)} />
      <main>
        {props.children}
      </main>
    </>
  );
}

export default withClass(Layout, styles.Layout);
