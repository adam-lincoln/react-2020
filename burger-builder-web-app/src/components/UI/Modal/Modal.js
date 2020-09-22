import { checkPropTypes } from 'prop-types';
import React from 'react';
import withClass from '../../../hoc/withClass';
import styles from './Modal.module.scss';

const Modal = (props) => {
  return (
    <>
      {props.children}
    </>
  )
}

export default withClass(Modal, styles.Modal);
