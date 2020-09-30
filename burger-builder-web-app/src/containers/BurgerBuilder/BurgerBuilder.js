import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  base: 4.00,
  salad: 1.00,
  bacon: 1.00,
  cheese: 0.50,
  meat: 3.00,
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    price: INGREDIENT_PRICES.base,
    purchasable: false,
    purchasing: false,
  };

  addIngredientHandler = (type) => {
    this.setState((prevState, props) => {
      const ingredients = { ...prevState.ingredients };
      const oldCount = ingredients[type];
      const newCount = oldCount + 1;
      ingredients[type] = newCount;
      const price = this.calculatePrice(ingredients);
      const purchasable = price > INGREDIENT_PRICES.base;
      return { ingredients, price, purchasable };
    });
  }

  removeIngredientHandler = (type) => {
    this.setState((prevState, props) => {
      const ingredients = { ...prevState.ingredients };
      const oldCount = ingredients[type];
      if (oldCount === 0) {
        return;
      }
      const newCount = oldCount - 1;
      ingredients[type] = newCount;
      const price = this.calculatePrice(ingredients);
      const purchasable = price > INGREDIENT_PRICES.base;
      return { ingredients, price, purchasable};
    });
  }

  calculatePrice = (ingredients) =>
    INGREDIENT_PRICES.base + Object.keys(ingredients)
      .map(key => {
        const quantity = ingredients[key];
        const unitPrice = INGREDIENT_PRICES[key];
        const linePrice = quantity * unitPrice;
        return linePrice;
      })
      .reduce((a, b) => a + b);

  purchaseHandler = () => {
    this.setState((prevState, props) => {
      return { purchasing: true };
    });
  }

  purchaseCancelledHandler = () => {
    this.setState((prevState, props) => {
      return { purchasing: false };
    });
  }

  purchaseContinueHandler = () => {
    alert('Continue!');
    this.setState((prevState, props) => {
      return { purchasing: false };
    });
  }

  render() {

    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelledHandler}
          >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancelledHandler}
            continue={this.purchaseContinueHandler}
            price={this.state.price}
          />
        </Modal>
        <Burger
          ingredients={this.state.ingredients}
        />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.price}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
        {/* <pre>State: {JSON.stringify(this.state, null, 2)}</pre> */}
      </>
    );
  }
}

export default BurgerBuilder;
