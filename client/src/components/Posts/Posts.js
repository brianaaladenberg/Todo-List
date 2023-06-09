import React, { useEffect, useState } from "react";
import '../styles/styles.css';

function Posts(props) {
  const [listOfItems, setlistOfItems] = useState([]);

  //gets the list of items from the backend which uses mongodb when called
  const UpdateItems = async () => {
    const response = await fetch("http://localhost:8000/api/todo");
    const data = await response.json();
    //updates the list of items thats displayed
    setlistOfItems(data);
    console.log(data); 
  };

  //updates the items when called
  useEffect(() => {
    UpdateItems();
  },[]);

  //updates the items when called from the form
  useEffect(() => {
    if (props.reset) {
      console.log('reloading');
      UpdateItems();
    }
  },[props.reset]);

  //updates the items every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      UpdateItems();
    },5000)
    return () => clearInterval(intervalId);
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
        //updates the displayed items
        UpdateItems();   
      })
      .catch(error => {
        console.error('deleted unsuccessfully', error);
        // Do something with error
      });
  };

  //edit the items
  const [isEditing, setIsEditing] = useState("");
  const changeItem = (event) => {
    setIsEditing('');
    event.preventDefault();
    const itemToSend = event.target[0].value;
    const idToSend = event.target[0].name;
    console.log("sending to backend to change the item");

    fetch("http://localhost:8000/api/edit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"_id":idToSend,"item":itemToSend}) 
    })
      .then(response => response.json())
      .then(data => {
        console.log('edited successfully:');
        //updates the displayed items
        UpdateItems();  
      })
      .catch(error => {
        console.error('edited unsuccessfully', error);
        // Do something with error
      });
      //updates the displayed items
  };

  return(
    <div class='list'>
      <h1><br />Things to do</h1>
      <ul>
        {listOfItems.map((item) => {
          return (
            <div class="container">
              <div class="row">
                <div class="col-1">
                  <button type="submit" class="btn btn-sm btn-outline-dark" value={item._id} onClick={deleteItem}>X</button>
                </div>
                <div class="col-11">
                  <li key="{item._id}" onClick={() => setIsEditing(item._id)} value="{item.name}">
                    {
                    isEditing === item._id ?
                      <form onSubmit={changeItem} class="input-group">
                        <textarea class="form-control overflow-auto" name={item._id} defaultValue={item.name}/>
                        <button type="submit" class="btn btn-outline-dark btn-sm">save</button>
                      </form>
                    :item.name
                    }
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;