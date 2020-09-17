import React from 'react';
import styles from './Cockpit.module.scss';

import Clicker from '../Clicker/Clicker';

const Cockpit = (props) => {

    const assignedClasses = [];
    if (props.persons.length <= 2) {
        assignedClasses.push(styles.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(styles.bold);
    }

    const buttonClasses = [styles.Button];
    if (props.showPersons) {
        buttonClasses.push(styles.Red);
    }

    return <div className={styles.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is working!</p>
        <p>changedCounter: {props.changedCounter}</p>
        <button className={buttonClasses.join(' ')} onClick={props.clicked}>Toggle Persons</button>
        <Clicker />
    </div>
}

export default Cockpit;
