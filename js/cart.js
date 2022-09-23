

//recuperation des elemnt dans le localStorage
let productLocalStorage = JSON.parse(localStorage.getItem("product"))

for(i = 0; i< productLocalStorage.length; i++) {

    getDataItem(productLocalStorage[i].idProduct, productLocalStorage[i].colorProduct, productLocalStorage[i].quantity)
   
    
}


//fonction fecth pour chercher les autres element de l'objet
async function getDataItem(idProduct, colorProduct, quantity) {
  
    if(idProduct){
    let itemArray = await fetch(`http://localhost:3000/api/products/${idProduct}`);
    if (itemArray.ok) {
        let data = await itemArray.json()
          optionUser(idProduct, colorProduct, quantity , data.imageUrl, data.altTxt, data.name, data.price,)
          totalPriceCalcul(data.price, quantity)          
      }; 
    }
  }



//function pour ecrire l'html 
function optionUser(idProduct, colorProduct, quantity, imageUrl, altTxt, name, price) {
    
   const cartItem = document.createElement('section');
   cartItem.setAttribute("class", "cart__item");
   cartItem.setAttribute("data-id", `${idProduct}`);
   cartItem.setAttribute("data-color", `${colorProduct}`);
   cartItem.innerHTML = `<div class="cart__item__img">
                            <img src="${imageUrl}" alt=${altTxt}>
                         </div>
                         <div class="cart__item__content">
                         <div class="cart__item__content__description">
                            <h2>${name}</h2>
                            <p>${colorProduct}</p>
                            <p>(${price * quantity + "€"})</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                         </div>
                         ` ;


document.querySelector("#cart__items").appendChild(cartItem);    

//modification de la quantité d'objet 

const quantityInput = document.querySelectorAll(".itemQuantity");

    for(let x = 0; x < quantityInput.length; x++) {
      quantityInput[x].addEventListener("change", (e) => {

        quantityInput.textContent = e.target.value
        console.log(e.target.value);
    

      productLocalStorage[x].quantity = quantityInput.textContent
      
      localStorage.setItem("product", JSON.stringify(productLocalStorage))
    });
};

//suppression de l'objet

const delItem = document.querySelectorAll('.deleteItem');

for (let j = 0; j < delItem.length; j++) {
  delItem[j].addEventListener("click",(e) => {
    
    let idDelItem = productLocalStorage[j].idProduct;
    let colorDelItem = productLocalStorage[j].colorProduct;
    console.log("idDelItem");
    console.log(idDelItem);
    console.log(colorDelItem);
    console.log("colorDelItem");

    productLocalStorage = productLocalStorage.filter(el => el.idProduct !== el.idDelItem && el.colorProduct !== colorDelItem);
    console.log(productLocalStorage);   
    localStorage.setItem("product", JSON.stringify(productLocalStorage));
  })

}
}

//total Quantity

let totalQuantityCalcul = [];

for (let t = 0; t < productLocalStorage.length; t++) {
  let quantityPanier = productLocalStorage[t].quantity
  totalQuantityCalcul.push(parseInt(quantityPanier));
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalQuantityProduct = totalQuantityCalcul.reduce(reducer,0);
console.log(totalQuantityProduct);

//document.querySelector("#totalQuantity").HTML(totalQuantityProduct);

//total Price

function totalPriceCalcul(price, quantity) {

const arrayPrice = new Array(price * quantity);
console.log(arrayPrice.length);


}

//recuperation formulaire 

const btnFormulaire = document.querySelector("#order");

btnFormulaire.addEventListener("click", (e)=>{
  e.preventDefault();


  const contact = {
    firstName : document.querySelector("#firstName").value,
    lastName : document.querySelector("#lastName").value,
    address : document.querySelector("#address").value,
    city : document.querySelector("#city").value,
    email : document.querySelector("#email").value
  }
  console.log(contact);

  const regExControl = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  }

  function prenomControle() {
    const firstNameInput = contact.firstName;
    if (regExControl(firstNameInput)) {
      return true;
    } else {
      return false;
      }
  };

  function nomControle() {
    const lastNameInput = contact.lastName;
    if (regExControl(lastNameInput)) {
      return true;
    } else {
      return false;
      }
  };

  function addressControle() {
    const addressInput = contact.address;
    if (/^[A-Za-z0-9\s]{5,50}$/.test(addressInput)) {
      return true;
    } else {
      return false;
      }
  };

  function cityControle() {
    const cityInput = contact.city;
    if (regExControl(cityInput)) {
      return true;
    } else {
      return false;
      }
  };

  function emailControle() {
    const emailInput = contact.email;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailInput)) {
      return true;
    } else {
      return false;
      }
  };

  const produits = [];
  console.log(produits);

  for(p = 0; p< productLocalStorage.length; p++) {

    let idPanier = productLocalStorage[p].idProduct;
    produits.push(idPanier);

  }
  
  const postJson = {contact : contact, products : produits}
  console.log(postJson);
  //envoye des objet a l'api

  if (prenomControle() && nomControle() && addressControle() && cityControle() && emailControle()) {
    const promise = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(postJson),
      headers: {
        "Content-Type" : "application/json",
      },
    });
  } 
  else {
    console.log("ko");
  }


})



