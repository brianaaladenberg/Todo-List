import React, { useState } from 'react';
import '../styles/styles.css';

function Form() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("sending to backend");
    // Send data to backend
    fetch('http://localhost:8000/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form submission successful:', data);
        
        // Do something with successful response data
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Do something with error
      });
    setName('');
  };

  return (
    <form class='card' onSubmit={handleSubmit}>
      <div>
        <label>
          Thing to do: 
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default Form;
