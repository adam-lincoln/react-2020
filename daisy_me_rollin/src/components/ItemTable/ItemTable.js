import React from 'react';

const ItemTable = (props) => {

  return (
    <div>
      <h1>{props.title}</h1>
      <table id="itemTable">
        <thead>
          <tr>
            {props.tableHeaders.map(tableHeader => {
              return (
                <th>{tableHeader}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.itemList.map(item =>
            <tr key={item.code}>
            {props.tableHeaders.map(tableHeader => {
              return (
                <td>{item[tableHeader]}</td>
              );
            })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ItemTable;
