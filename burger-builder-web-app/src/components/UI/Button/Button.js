import React from 'react';
// import withClass from '../../../hoc/withClass';
import styles from './Button.module.scss';

const button = (props) => {

  return (
    <button
      className={[styles.Button, styles[props.buttonType]].join(' ')}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
}

// export default withClass(button, styles.Button);
export default button;
