 //*================================= INITIALIZATION ===============================================
let name=document.getElementById('name')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let category=document.getElementById('category')
let count=document.getElementById('count')
let total=document.getElementById('total')
let submit=document.getElementById('submit')
let mood="create"
let tempIndex;
let products =[]
let ID='  '
getData()

 //*================================= API FUNCTION ===============================================
function api (method,data){
  fetch("https://product-managment-two.vercel.app/products", {
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then((response)=>{response.json()})
.then( data=> { 
    getData()
});
} 

//* ==================================  GET DATA  =================================================
function getData(){
  fetch('https://product-managment-two.vercel.app/products')
.then(response => response.json())
      .then(data => {console.log(data.products )
        products = data.products
        display()
      })
}

//* =============================  DISPLAY DATA  ==================================================
function display(){
  getTotal()
  let  table=` `
  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].taxes}</td>
    <td>${products[i].ads}</td>
    <td>${products[i].discount}</td>
    <td>${products[i].total}</td>
    <td>${products[i].category}</td>
    <td><button onclick="setProduct(${i})" id="update"class="btn btn-outline-success">Update</button></td>
    <td><button onclick="deleteProduct(${products[i].id})" id="delete"  class="btn btn-outline-danger">Delete</button></td>
    </tr>
    `
  }
  document.getElementById("tbody").innerHTML=table; 
  }

//*==========================TOTAL PRICE PRODUCTS =============================================
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML=result
        total.style.background="#dc3545"
    }
    else{
        total.innerHTML=""
        total.style.background="#ccc"
    }
}


// * ============================ ADD NEW PRODUCT =============================================

submit.onclick=function(){
  let data={
    name:name.value, 
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    category:category.value.toLowerCase(),
    count:count.value,
    total:total.innerHTML
  } 
  // if (mood=='create'){
  //   api("POST",data)
  //   display()
  //   clearInputs()
    
  // }else{
  //   data.id=products[tempIndex].id
  //   api("PUT",data)
  //   clearInputs()
  //   mood="create"
  //   submit.innerHTML="Add Product"
  // }
  // }

  if (mood=='create'){
    if(data.count>1){
      for (let i = 0; i < data.count; i++) {
    api("POST",data)
    display()
    clearInputs()
      } 
    }else{
    api("POST",data)
    display()
    clearInputs()
        }
    }else{
      data.id=products[tempIndex].id
      api("PUT",data)
      clearInputs()
      mood="create"
      submit.innerHTML="Add Product"
    }
    }
//* ==========================UPDATE PRODUCT ================================================

function setProduct(i){
  ID=products[i].id
  name.value=products[i].name
  price.value=products[i].price
  taxes.value=products[i].taxes
  ads.value=products[i].ads
  discount.value=products[i].discount
  total.innerHTML=products[i].total
  category.value=products[i].category
  count.style.display='none';
  submit.innerHTML="Update";
  mood="update";
  tempIndex=i;
  scroll({
    top:0,
    behavior:"smooth",
  })
}


function updateProduct(){
      let data={
      ID:products[i].id,
      name:name.value,
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      category:category.value,
      total:total.innerHTML
    }    
    api("PUT",data) 

}



//*======================================== CLEAR INPUTS =======================================
function clearInputs(){
  name.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  discount.value="";
  category.value="";
  count.value="";
  total.innerHTML="";
  total.style.background="#ccc";
}


//*=====================================DELETE PRODUCT =======================================

function deleteProduct (id){
      let data={
            id
      }
    api("DELETE",data)
}
//*========================================= SEARCH   ====================================

let searchMood='name'

function getSearchMood(id){
  let search=document.getElementById('search')
  console.log(id);
  if(id=="searchName"){
    searchMood="name";
    search.placeholder="Search by name";
    search.focus();
  }
  else{
    searchMood="category";
    search.placeholder="Search by category";
    search.focus();
  }
}

function searchData(value){ 
    let table=' ';
    if(searchMood=='name'){
      for (let i = 0; i < products.length; i++) {
        if (products[i].name.includes(value)) {
          table += `
          <tr>
          <td>${i+1}</td>
          <td>${products[i].name}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          <td>${products[i].category}</td>
          <td><button onclick="updateProduct(${i})" id="update"class="btn btn-outline-success">Update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete"  class="btn btn-outline-danger">Delete</button></td>
          </tr>
          `
  
        }
      }
    }
    else{
      for (let i = 0; i < products.length; i++) {
        if (products[i].category.includes(value)) {
          table += `
          <tr>
          <td>${i+1}</td>
          <td>${products[i].name}</td>
          <td>${products[i].price}</td>
          <td>${products[i].taxes}</td>
          <td>${products[i].ads}</td>
          <td>${products[i].discount}</td>
          <td>${products[i].total}</td>
          <td>${products[i].category}</td>
          <td><button onclick="updateProduct(${i})" id="update"class="btn btn-outline-success">Update</button></td>
          <td><button onclick="deleteProduct(${i})" id="delete"  class="btn btn-outline-danger">Delete</button></td>
          </tr>
          `
  
        }
      }
    }
    document.getElementById("tbody").innerHTML=table;

  }



















