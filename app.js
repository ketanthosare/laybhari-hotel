let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */

function addToCart(name,price){

cart.push({

name:name,
price:price

});

localStorage.setItem("cart",JSON.stringify(cart));

playSound();

alert(name + " Added 😄");

}

/* SHOW ORDERS */

function showOrders(){

let orderList = document.getElementById("orderList");

if(orderList){

orderList.innerHTML = "";

if(cart.length === 0){

orderList.innerHTML = `

<h2>
No Orders Yet 😄
</h2>

`;

}

cart.forEach((item,index)=>{

orderList.innerHTML += `

<div class="order-card">

<h2>

${item.name} - ₹${item.price}

</h2>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

}

}

/* REMOVE */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

location.reload();

}

/* BILL */

function generateBill(){

let bill = document.getElementById("bill");

let total = 0;

bill.innerHTML = "";

cart.forEach((item)=>{

bill.innerHTML += `

<h2>

${item.name} - ₹${item.price}

</h2>

`;

total += item.price;

});

document.getElementById("total").innerHTML =

"Total = ₹" + total;

}

/* PDF */

function downloadPDF(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

doc.text(

"Laybhari Hotel Bill",

20,

20

);

let y = 40;

let total = 0;

cart.forEach((item)=>{

doc.text(

item.name + " - ₹" + item.price,

20,

y

);

y += 10;

total += item.price;

});

doc.text(

"Total = ₹" + total,

20,

y + 20

);

doc.save("bill.pdf");

}

/* DARK MODE */

function darkMode(){

document.body.classList.toggle("dark");

}

/* SEARCH */

function searchFood(){

let input = document.getElementById("search").value.toLowerCase();

let cards = document.querySelectorAll(".card");

cards.forEach((card)=>{

let title = card.querySelector("h2").innerText.toLowerCase();

if(title.includes(input)){

card.style.display = "block";

}

else{

card.style.display = "none";

}

});

}

/* QUANTITY */

function increaseQty(btn){

let span = btn.parentElement.querySelector("span");

span.innerText = parseInt(span.innerText) + 1;

}

function decreaseQty(btn){

let span = btn.parentElement.querySelector("span");

if(parseInt(span.innerText) > 1){

span.innerText = parseInt(span.innerText) - 1;

}

}

/* SOUND */

function playSound(){

let audio = new Audio(

"https://www.soundjay.com/buttons/sounds/button-3.mp3"

);

audio.play();

}

/* PLACE ORDER */

function placeOrder(){

alert("Order Placed Successfully 😄");

}

/* CLEAR CART */

function clearCart(){

localStorage.removeItem("cart");

cart = [];

location.reload();

}

showOrders();