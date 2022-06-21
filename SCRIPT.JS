let title=document.getElementById('title')
var price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let create=document.getElementById('create'),
count=document.getElementById('count'),
category=document.getElementById('category')
let tmp
  
 let mod
 
 
//getTotal
function getTotal(){
  
 if(price.value!=''){
     let result=(+price.value+ +taxes.value+ +ads.value)-+discount.value
     total.innerHTML=result
     total.style.backgroundColor="#040"

 }
 else{
    total.innerHTML=""
    total.style.backgroundColor="brown"
 }
      
}
let dataProd
//create

if(localStorage.product !=null){
dataProd=JSON.parse(localStorage.product)

}else{

 dataProd=[]
} 


create.onclick=function(){
// clearData();


if(price.value!=="" && title.value!=="" && category.value!=="" && count.value<100){
  let newProd={
  title:title.value.toLowerCase(),
  price:price.value,
  taxes:taxes.value,
  ads:ads.value,
  discount:discount.value,
  total:total.innerHTML,
  count:count.value,
  category:category.value.toLowerCase()
}


if(mod=="create"){
if(newProd.count>1)
{for(i=0;i<newProd.count;i++){dataProd.push(newProd)
console.log('hello')}
}else{dataProd.push(newProd)
}} else{
  dataProd[tmp]=newProd
  create.textContent='create'
  mod='create'
  count.style.display='block'
}

localStorage.setItem('product', JSON.stringify(dataProd))
clearData();
showData();
}}


//clear data


function clearData(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
    total.style.backgroundColor="brown"




}

//clear data
/*function verify(){

    if (!(price.value)){
        create.style.pointerEvents="none"
        alert('you must fill all the feilds')
    console.log('hello world')
    }else{
    console.log('hello world2')

    }
    
    }*/
    //showData

    function showData(){
  
      let table=''
  for (let i = 0; i < dataProd.length; i++) {
      
   table +=`<tr>
  <th>${i}</th>
  <th>${dataProd[i].title}</th>
  <th>${dataProd[i].price}</th>
  <th>${dataProd[i].taxes}</th>
  <th>${dataProd[i].ads}</th>
  <th>${dataProd[i].discount}</th>
  <th>${dataProd[i].total}</th>
  <th>${dataProd[i].category}</th>
  <th><button id="update" onclick="update(${i})">update</button></th>
  <th><button id="delete" onclick="delet(${i})">delete</button></th>


</tr>`

   

}
if(dataProd.length>0){
  document.getElementById('deletePlace').innerHTML=`<button id='deleteAll' onclick="deleteAll()">delete All(${dataProd.length})!</button>`}
   else{
    document.getElementById('deletePlace').innerHTML=``
   }
document.getElementById('tbody').innerHTML=table


    }

    showData();

//delete
  function delet(i){
   
    dataProd.splice(i,1)
    localStorage.product=JSON.stringify(dataProd)
    showData();
    
      

  }

  //deleteAll
  function deleteAll(){
   localStorage.clear()
   dataProd.splice(0) 
    //suprimer tt
   showData()
   

  }


  function update(i){

    title.value=dataProd[i].title
    price.value=dataProd[i].price
    taxes.value=dataProd[i].taxes
    ads.value=dataProd[i].ads
    discount.value=dataProd[i].discount
    
    category.value=dataProd[i].category
     tmp=i
    create.textContent='update'
    count.style.display='none'
    mod="update"

     getTotal()
     scroll({
       top:0,
       behavior:"smooth"
     })

    
  }
  
  

  //search mod
  searchmod='title'
  search=document.getElementById('search')
  function searchMod(value){
    if(value=='searchByTitle'){
      searchmod='title'
    }else{
      searchmod='category'
    }
    search.placeholder=value
    search.focus()
    search.value=""
    showData()
    

  }

  function searcH(value){
    let table=""
    for(i=0;i<dataProd.length;i++){
      if(searchmod=="title"){
       if(dataProd[i].title.includes(value.toLowerCase())) {
         table +=`<tr>
        <th>${i}</th>
        <th>${dataProd[i].title}</th>
        <th>${dataProd[i].price}</th>
        <th>${dataProd[i].taxes}</th>
        <th>${dataProd[i].ads}</th>
        <th>${dataProd[i].discount}</th>
        <th>${dataProd[i].total}</th>
        <th>${dataProd[i].category}</th>
        <th><button id="update" onclick="update(${i})">update</button></th>
        <th><button id="delete" onclick="delet(${i})">delete</button></th>`
       }
        
        
      }
      else{
        if(dataProd[i].category.includes(value.toLowerCase())) {
          table +=`<tr>
         <th>${i}</th>
         <th>${dataProd[i].title}</th>
         <th>${dataProd[i].price}</th>
         <th>${dataProd[i].taxes}</th>
         <th>${dataProd[i].ads}</th>
         <th>${dataProd[i].discount}</th>
         <th>${dataProd[i].total}</th>
         <th>${dataProd[i].category}</th>
         <th><button id="update" onclick="update(${i})">update</button></th>
         <th><button id="delete" onclick="delet(${i})">delete</button></th>`
         }
      }
    
      document.getElementById('tbody').innerHTML=table
     
    }


  }



