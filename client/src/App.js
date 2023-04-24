import React from "react";

import Form from './components/Form/Form.js';
import './components/styles/styles.css';

const App = () => {

    return (
        <div class='card'>
            <h1>Todo List</h1>
            <div>
                <Form /> 
            </div>
        </div>
    );
}

export default App;