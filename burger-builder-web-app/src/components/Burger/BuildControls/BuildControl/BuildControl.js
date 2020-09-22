import React from 'react';
import styles from './BuildControl.module.scss';
import withClass from '../../../../hoc/withClass';

const buildControl = (props) =>
  <>
    <div className={styles.Label}>
      {props.label}
    </div>
    <button
      disabled={props.disabled}
      className={styles.Less}
      onClick={() => props.removeIngredient(props.type)}>
      Less
    </button>
    <button
      className={styles.More}
      onClick={() => props.addIngredient(props.type)}>
      More
    </button>
  </>

export default withClass(buildControl, styles.BuildControl);
