import React from 'react';

const SelectItem = (props) =>
  <div>
    <label htmlFor="selectItem" style={{ marginRight: '10px' }}>{props.title}</label>
    <select id="selectItem" name="selectItem" value={props.selected}
      onChange={event => props.changed(Array.from(event.target.options).filter(x => x.selected).map(x => x.value)[0])}
      >
      {props.itemList.map(item => <option key={item.code} value={item.code}>{item.name}</option>)}
    </select>
  </div>

export default SelectItem;
