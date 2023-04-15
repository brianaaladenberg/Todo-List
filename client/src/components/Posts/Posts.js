import React, { useEffect, useState } from "react";
import '../styles/styles.css';

function Posts() {
  const [listOfItems, setlistOfItems] = useState([]);

  async function logJSONData() {
    const response = await fetch("http://localhost:8000/api/todo");
    const data = await response.json();
    return(data);
  }

  logJSONData().then((data) => {
    setlistOfItems(data);
  });

  const deleteItem = (event) => {
    const idToSend = event.target.value;
    console.log(idToSend);

    console.log("sending to backend to be deleted");
    // Send data to backend
    fetch("http://localhost:8000/api/delete", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"_id":idToSend}) 
    })
      .then(response => response.json())
      .then(data => {
        console.log('deleted successfully:', event.target.value);
        // Do something with successful response data
      })
      .catch(error => {
        console.error('deleted unsuccessfully', error);
        // Do something with error
      });
  };

  return(
    <div class='card'>
      <div class='list'>
        <h1>Things to do</h1>
        <ul>
          {listOfItems.map((item) => {
            return (
              <div>
                <li key="{item._id}">
                  {item.name}
                  <button type="submit" value={item._id} onClick={deleteItem}>X</button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Posts;