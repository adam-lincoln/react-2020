import React from 'react';
import withClass from '../../hoc/withClass';
import styles from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  const transformedIngredients = Object.keys(props.ingredients)
    .map(key => {
      const val = props.ingredients[key];  // key=bacon, val=2
      const a = [ ...Array(val) ].map((_, index) => `${key}:${index}`);  // [ 'bacon:0', 'bacon:1' ]
      return a.map(x => <BurgerIngredient key={x} type={key} />)  // key='bacon:0', type='bacon'
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  const isEmpty = transformedIngredients.length === 0;
  const emptyMessage = isEmpty ? <p>Please start adding ingredients!</p> : null;

  return (
    <>
      <BurgerIngredient type="bread-top" />
      {emptyMessage}
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </>
  );
}

export default withClass(burger, styles.Burger);
