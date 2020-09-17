import React, { Component } from 'react';
import styles from './App.module.scss';
import withClass from '../hoc/withClass';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

    state = {
        showCockpit: true,
        showPersons: false,
        persons: [
            { id: 'a1', name: 'Adam', age: 34 },
            { id: 'b2', name: 'Britt', age: 29 },
            { id: 'c3', name: 'Charlie', age: 6 },
            { id: 'e4', name: 'Eva', age: 12 },
        ],
        changedCounter: 0,
    };

    nameChangedHandler = (event, id) => {
        const val = event.target.value;
        this.setState((prevState, props) => {
            const persons = [ ...prevState.persons ];
            const index = persons.findIndex(person => person.id === id);
            const person = { ...persons[index] };
            person.name = val;
            persons[index] = person;
            return {
                persons: persons,
                changedCounter: prevState.changedCounter + 1
            };
        });
    };

    deletePersonHandler = (id) => {
        this.setState((prevState, props) => {
            const persons = [ ...prevState.persons ];
            const index = persons.findIndex(person => person.id === id);
            persons.splice(index, 1);
            return { persons: persons };
        });
    };

    togglePersonsHandler = () => this.setState({showPersons: !this.state.showPersons});

    render() {

        let persons = null;
        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
                />
        }

        return (
            <div>
                <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit })}>{this.state.showCockpit ? "Hide" : "Show"} Cockpit</button>
                {this.state.showCockpit ? (
                    <Cockpit
                        // title={this.props.appTitle}
                        title="Person Manager"
                        showPersons={this.state.showPersons}
                        persons={this.state.persons}
                        clicked={this.togglePersonsHandler}
                        changedCounter={this.state.changedCounter}
                        />) : null}
                {persons}
            </div>
        );
    }

}

export default withClass(App, styles.App);
