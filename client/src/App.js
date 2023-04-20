import React from "react";

import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import './components/styles/styles.css';

const App = () => {
    //const classes = useStyles();

    return (
        <div class='card'>
            <h1>Todo List</h1>
            <div>
                <Form /> 
            </div>
            <div>
                <Posts /> 
            </div>
        </div>
    );
}

export default App;