import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
    totalPrice: INGREDIENT_PRICES.base,
    purchasable: false,
  };

  addIngredientHandler = (type) => {
    this.setState((prevState, props) => {
      const ingredients = { ...prevState.ingredients };
      const oldCount = ingredients[type];
      const newCount = oldCount + 1;
      ingredients[type] = newCount;
      const totalPrice = this.calculateTotalPrice(ingredients);
      const purchasable = totalPrice > INGREDIENT_PRICES.base;
      return { ingredients, totalPrice, purchasable };
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
      const totalPrice = this.calculateTotalPrice(ingredients);
      const purchasable = totalPrice > INGREDIENT_PRICES.base;
      return { ingredients, totalPrice, purchasable};
    });
  }

  calculateTotalPrice = (ingredients) =>
    INGREDIENT_PRICES.base + Object.keys(ingredients)
      .map(key => {
        const quantity = ingredients[key];
        const price = INGREDIENT_PRICES[key];
        return quantity * price;
      })
      .reduce((prevVal, currentVal) => prevVal + currentVal);

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <>
        <pre>State: {JSON.stringify(this.state)}</pre>
        <Burger
          ingredients={this.state.ingredients}
          />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          />
      </>
    );
  }
}

export default BurgerBuilder;
