import React, { Component } from 'react';
import withClass from '../../../hoc/withClass';
import styles from './OrderSummary.module.scss';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  render() {

    const props = this.props;

    const ingredientSummary = Object.keys(props.ingredients)
      .map(key => <li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}</li>);

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
        <Button buttonType="Danger" clicked={props.cancel}>CANCEL</Button>
        <Button buttonType="Success" clicked={props.continue}>CONTINUE</Button>
      </>
    );
  }

}

export default withClass(OrderSummary, styles.OrderSummary);
