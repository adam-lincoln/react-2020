import React from 'react';
import withClass from '../../../hoc/withClass';
import styles from './OrderSummary.module.scss';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(key => {
      return (
        <li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}</li>
      );
    });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>
        <strong>
          Total price: {props.price.toFixed(2)}
        </strong>
      </p>
      <p>Continue to Checkout?</p>
      {/* <button>CANCEL</button>
      <button>CONTINUE</button> */}
      <Button buttonType="Danger" clicked={props.cancel}>CANCEL</Button>
      <Button buttonType="Success" clicked={props.continue}>CONTINUE</Button>
    </>
  );
}

export default withClass(OrderSummary, styles.OrderSummary);
