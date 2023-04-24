import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import Posts from '../Posts/Posts.js'

function Form() {
  const [name, setName] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setReset(true);

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
        console.log('Form submission successful:', event.target.value);
        //updates the displayed items
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Do something with error
      });
    setName('');
  };

  return (
    <div>
      <form class='' onSubmit={handleSubmit}>
        <div>
          <label>
            Thing to do: 
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          <button type="submit" class="btn btn-sm btn-outline-dark">Add</button>
        </div>
      </form>
      <Posts reset={reset}/>
    </div>
  );
}

export default Form;
