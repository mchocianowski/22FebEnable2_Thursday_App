`use strict`

// import the dom
import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// POST function
const post = () => {
  axios.post(`/create`, {   name : DOM.inputName.value,
                            description : DOM.inputDescription.value, 
                            price : DOM.inputPrice.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

// UPDATE function
const update = () => {
  let id = DOM.updateId.value;
  axios.put(`/update/`+id, { name : DOM.updateName.value,
                             description : DOM.updateDescription.value, 
                             price : DOM.updatePrice.value,
                          })
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

const deleteById = () => {
  let id = DOM.deleteId.value;
  axios.delete(`/delete/`+id, { id : DOM.deleteId.value,
                          })
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}


// set up the buttons' on click events
DOM.buttonCreate.onclick = () => post();
DOM.buttonUpdate.onclick = () => update();
DOM.buttonDelete.onclick = () => deleteById();

// run the get function on page load
get();