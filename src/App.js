import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/about/About';

export default class App extends Component {
  state = {
    todos: [
      {
        id: uuid(),
        title: 'Play with Yatzi 🐶',
        completed: false,
      },
      {
        id: uuid(),
        title: 'Walk Yatzi 🐶',
        completed: true,
      },
      {
        id: uuid(),
        title: 'Run with Yatzi 🐶',
        completed: false,
      },
    ],
  };

  // Toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // Delete todo
  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    });
  };

  // Add todo
  addTodo = title => {
    const newTodo = {
      id: uuid(),
      title,
      completed: false,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header style={headerStyle} />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
};
