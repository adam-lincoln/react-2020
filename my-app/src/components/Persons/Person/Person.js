import React, { useEffect, useRef } from 'react';
import styles from './Person.module.scss';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../contexts/authContext';

const Person = (props) => {

    const inputElRef = useRef(null);

    useEffect(() => {
        inputElRef.current.focus();
    }, []);

    console.log('[Person.js] rendering...');

    return (
        <div>
            <AuthContext.Consumer>
                {(context) => <p>authenticated: {context.authenticated ? "true" : "false"}</p>}
            </AuthContext.Consumer>
            <p onClick={props.clicked}>
                I'm {props.name} and I am {props.age} years old!
            </p>
            <p>{props.children}</p>
            <input
                type="text"
                ref={inputElRef}
                onChange={props.changed}
                value={props.name}
            />
        </div>
    );
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    changed: PropTypes.func,
};

export default withClass(Person, styles.Person);
