import React from 'react';
import styles from './BuildControls.module.scss';
import withClass from '../../../hoc/withClass';
import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
  { type: 'salad', label: 'Salad' },
  { type: 'bacon', label: 'Bacon' },
  { type: 'cheese', label: 'Cheese' },
  { type: 'meat', label: 'Meat' },
];

const buildControls = (props) =>
  <>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {CONTROLS.map(control => {
      return <BuildControl
        key={control.type}
        label={control.label}
        type={control.type}
        addIngredient={props.addIngredient}
        removeIngredient={props.removeIngredient}
        disabled={props.disabled[control.type]}
        />
    })}
    <button
      type="button"
      className={styles.OrderButton}
      disabled={!props.purchasable}
      >
      Order now!
    </button>
  </>

export default withClass(buildControls, styles.BuildControls);
