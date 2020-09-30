import React from 'react';
import styles from './Logo.module.scss';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
  return (
    <div className={styles.Logo}>
      <img
        src={burgerLogo}
        alt="Burger logo"
      />
    </div>
  );
}

export default logo;
