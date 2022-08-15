//récupération de l'id dans l'URL vérifiant si le paramètre existe dans l’URL
/*var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('Id')) {
  var name = search_params.get('Id');
  console.log(name)
}
*/
/*const urlId = window.location.href;
console.log(urlId);

const Params = new URLSearchParams(urlId);
console.log(Params);

const Id = Params.get("name");
console.log(Id);
*/

var str = window.location.href;

var url = new URL(str);

var search_params = new URLSearchParams(url.search); 

if(search_params.has('name')) {
  var name = search_params.get('name');
  console.log(name)
}
let id = name


async function getKanap() {
    let productArray =  await fetch(`http://localhost:3000/api/products/${id}`)

    .then(res => res.json());
    
    console.log(productArray)

    if(productArray){
        for(i = 0 ; i< productArray.length; i++){
            console.log(productArray[i]._id)
            newProduct(productArray[i].imageUrl, productArray[i].altTxt, productArray[i].name, productArray[i].description, productArray[i]._id)
        }
    }

}
getKanap();