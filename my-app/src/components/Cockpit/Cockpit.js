import React, { useEffect, useRef } from 'react';
import styles from './Cockpit.module.scss';
import Clicker from '../Clicker/Clicker';
import AuthContext from '../../contexts/authContext';

const Cockpit = (props) => {

    const toggleButtonRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect...');
        toggleButtonRef.current.click();
        return () => {
            console.log('[Cockpit.js] useEffect cleanup...');
        }
    }, []);

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
        <Clicker />
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is working!</p>
        <p>changedCounter: {props.changedCounter}</p>
        <button ref={toggleButtonRef} className={buttonClasses.join(' ')} onClick={props.clicked}>Toggle Persons</button>

        <AuthContext.Consumer>
            {(context) => <button onClick={context.loginClicked}>Login</button>}
        </AuthContext.Consumer>
    </div>
}

export default Cockpit;
