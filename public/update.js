// import the dom
import * as DOM from './dom.js';

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

  DOM.buttonUpdate.onclick = () => update();