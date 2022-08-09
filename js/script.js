//fonction pour ajouter les element article ; img; name et description au html// 

function newProduct(imageUrl, altTxt, name, description) {
    const newItems = document.createElement('article');
    newItems.innerHTML = `<img src="${imageUrl}" alt="${altTxt}">
                          <h3 class="productName">${name}</h3>
                          <p class="productDescription">${description}</p>`;
    document.querySelector('.items').appendChild(newItems);
}
//fonction pour ajouter les lien de chaques articles//



// fonction async pour recuperer les donnes de l'api//
async function getProducts() {
    let productsArray =  await fetch("http://localhost:3000/api/products")
    
    .then(res => res.json());

    console.log(productsArray)

    if(productsArray){
        for(i = 0 ; i< productsArray.length; i++){
            console.log(productsArray[i].imageUrl)
            newProduct(productsArray[i].imageUrl, productsArray[i].altTxt, productsArray[i].name, productsArray[i].description)
        }
    }
}

getProducts();
