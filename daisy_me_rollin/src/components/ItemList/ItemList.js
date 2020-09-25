import React from 'react';

const ItemList = (props) =>
  <>
    <h2>{props.title}</h2>
    <ul>
      {props.itemList.map(item => <li key={item.code}>{item.code}: {item.name}</li>)}
    </ul>
  </>

export default ItemList;
