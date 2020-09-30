import React from 'react';
// import withClass from '../../../hoc/withClass';
import styles from './Backdrop.module.scss';

const Backdrop = (props) => props.show
  ? <div className={styles.Backdrop} onClick={props.clicked}></div>
  : <div></div>

export default Backdrop;  // withClass(backdrop, styles.Backdrop);
