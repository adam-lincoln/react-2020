import React from 'react';
import withClass from '../../hoc/withClass';
import styles from './Layout.module.scss';

const layout = (props) =>
  <>
    <header>
      <h1>Britty's Burgers</h1>
      <h2>Build a burger!</h2>
      Toolbar, Sidebar, Drawer
    </header>
    <main>
      {props.children}
    </main>
  </>

export default withClass(layout, styles.Layout);
