/* credit to 
https://github.com/BONO-world/Flight-Seat-Booking
*/
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
/************** watch media to fit the size  **********************/
const mql = window.matchMedia("(max-width: 600px)");
const mql1 = window.matchMedia("(max-height: 600px)");


function screenTest(e) {
  
  if (e.matches) {
    /* the viewport is 600 pixels wide or less */
    document.body.style.transform = 'scale(0.5,0.5)';
  } else {
    /* the viewport is more than 600 pixels wide */
    document.body.style.transform = 'scale(1,1)';
  }
}
function screenTest1(e) {
  if (e.matches) {
    /* the viewport is 600 pixels wide or less */    
    document.body.style.marginTop = '300px';
    document.body.style.marginBottom = '300px';
  } 
  else{
    document.body.style.marginTop = "10px"
    document.body.style.marginBottom = "10px"
  }
}

mql.addEventListener("change", screenTest);
mql1.addEventListener("change", screenTest1);

/***********Let's give a clean outlook to html ************ */
function play_game(x) {
  if (x == 1) {

    document.querySelectorAll(".row .seat:not(.sold)").forEach(el =>{
      x++
      if ( x % 16 === 0 && !(el.classList.contains("selected")) ){
        el.classList.toggle("sold")
        updateSelectedCount()
      }
    });
    return
  }
  const currentDiv = document.getElementById("container");
  document.querySelectorAll('.row *').forEach(el =>  el.remove() );
  x=0
  while (x < 15) {
    x++;
    const node = document.createElement("div");
    node.setAttribute("class", "row");

    for (let i = 0; i < 15; i++) {
      newDiv = document.createElement("div");
      if (i == Math.floor(Math.random() * (15)) )  {
        newDiv.setAttribute("class", "seat sold");
      }
      else{
        newDiv.setAttribute("class", "seat");
      }
      node.appendChild(newDiv);
      currentDiv.appendChild(node);
    }
  }
}
play_game(0)
/************************** */  
populateUI();
let ticketPrice = +movieSelect.value;
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}
// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();    
    play_game(1)

  }
});
// Initial count and total set
updateSelectedCount();
