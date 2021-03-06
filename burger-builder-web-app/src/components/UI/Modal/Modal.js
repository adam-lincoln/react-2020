import React, { Component } from 'react';
// import withClass from '../../../hoc/withClass';
import styles from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;  // WARN: Only update Modal and children when show changes.
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  render() {
    const props = this.props;
    return (
      <>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
          }}
          >
          {props.children}
        </div>
      </>
    );
  }
}

export default Modal;  //withClass(Modal, styles.Modal);
