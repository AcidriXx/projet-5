
//creation des obption et ajout des différente couleur de l'objet 
function optionColor(color) {
  let option = document.createElement('option');
  option.value = option.text = color;
  document.querySelector('#colors').appendChild(option);
}

//chemin pour les nouveaux elements html

let titleKanap  = document.getElementById("title");
let priceKanap  = document.getElementById("price");
let descriptionKanap  = document.getElementById("description");


//recuperation de l'id dans l'URL
var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) {
  var name = search_params.get('id');
 
}
let id = name
console.log(id)
//recuperation du produit avec fetch avec son id 
const getKanap = async function () {
    let response = await fetch(`http://localhost:3000/api/products/${id}`)
    if (response.ok) {
      let data = await response.json()
      console.log(data)
      
      for (let i = 0 ; i < data.colors.length; i++){
        console.log(data.colors)   
        optionColor(data.colors[i])
        
    }; 
    
      //creation de l'element img 
      let img = document.createElement('img');
      img.src = data.imageUrl;
      document.querySelector('.item__img').appendChild(img);

      //declaration des variables
      let titleData = data.name;
      let priceData = data.price;
      let descriptionData = data.description;

      //creation des elements html
      titleKanap.innerHTML = titleData;
      priceKanap.innerHTML = priceData;
      descriptionKanap.innerHTML = descriptionData;

    } else {
      console.error(response.status)
    }
    
  } 

getKanap()



//recuperation des donne pour le panier 
const colorPanier = document.querySelector("#colors");
const numberPanier = document.querySelector("#quantity");

//boutton pour ajouter au panier
const btn_panier = document.querySelector("#addToCart");
console.log(btn_panier);



//ajout événement au click 
btn_panier.addEventListener("click", (e)=>{
  e.preventDefault();

//declaration des valeur color et nombre choisis pas l'utilisateur
  const choiceColor = colorPanier.value;
  const choiceNumber = numberPanier.value;
  console.log(choiceNumber);


  let optionProduit = {
    idProduct: id,
    numberProduct: choiceNumber,
    colorProduct: choiceColor,
  }



  let productLocalStorage = JSON.parse(localStorage.getItem("product"))
  console.log(productLocalStorage);



if(productLocalStorage){
  console.log(ok)
}
else{
  productLocalStorage = [];
  productLocalStorage.push(optionProduit);
  localStorage.setItem("produit", JSON.stringify(productLocalStorage));
  
}

});

