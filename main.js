const percent_line_backblaze = document.getElementById("percent_line_backblaze");
const percent_line_bunny = document.getElementById("percent_line_bunny");
const percent_line_scaleway = document.getElementById("percent_line_scaleway");
const percent_line_vultr = document.getElementById("percent_line_vultr");

const percent_line_backblaze$ = document.getElementById("percent_line_backblaze$");
const percent_line_bunny$ = document.getElementById("percent_line_bunny$");
const percent_line_scaleway$ = document.getElementById("percent_line_scaleway$");
const percent_line_vultr$ = document.getElementById("percent_line_vultr$");

const label_transfer = document.getElementById("label_transfer");
const label_storage = document.getElementById("label_storage");
const circle_hdd = document.getElementsByClassName("circle_hdd")[0];
const circle_ssd = document.getElementsByClassName("circle_ssd")[0];
const circle_single = document.getElementsByClassName("circle_single")[0];
const circle_multi = document.getElementsByClassName("circle_multi")[0];

circle_hdd.addEventListener("click", hdd);
circle_ssd.addEventListener("click", ssd);
circle_single.addEventListener("click", single);
circle_multi.addEventListener("click", multi);

const transfer = document.getElementById("transfer");
const storage = document.getElementById("storage");
let handle_value_storage=0
let handle_value_transfer=0

let backblaze_now_price_storage = 0;
let bunny_now_price_storage = 0;
let scaleway_now_price_storage = 0;
let vultr_now_price_storage = 0;

let backblaze_now_price_transfer = 0;
let bunny_now_price_transfer = 0;
let scaleway_now_price_transfer = 0;
let vultr_now_price_transfer = 0;

let bunny_hhd = true;
let scaleway_multi = true;

let backblaze_price;
let bunny_price;
let scaleway_price;
let vultr_price;

function hdd() {
  circle_hdd.style.backgroundColor = "black";
  circle_ssd.style.backgroundColor = "white";
  bunny_hhd = true;
  handle_storage_range(handle_value_storage)
  handle_transfer_range(handle_value_transfer)

}
function ssd() {
  circle_hdd.style.backgroundColor = "white";
  circle_ssd.style.backgroundColor = "black";
  bunny_hhd = false;
  handle_storage_range(handle_value_storage)
  handle_transfer_range(handle_value_transfer)

}
function multi() {
  circle_multi.style.backgroundColor = "black";
  circle_single.style.backgroundColor = "white";
  scaleway_multi = true;
  handle_storage_range(handle_value_storage)
  handle_transfer_range(handle_value_transfer)
}
function single() {
  circle_multi.style.backgroundColor = "white";
  circle_single.style.backgroundColor = "black";
  scaleway_multi = false;
  handle_storage_range(handle_value_storage)
  handle_transfer_range(handle_value_transfer)
}

single();
hdd();

function calc_backblaze(value, range) {
  let quote;
  let price;

  range == "storage" ? (quote = 0.005) : (quote = 0.01);
  range == "storage"
    ? (price = quote * value + backblaze_now_price_transfer)
    : (price = quote * value + backblaze_now_price_storage);

  price < 7 ? (price = 7) : null

  window.matchMedia("(orientation: portrait)").matches ?  percent_line_backblaze.style.height = price*7 + "px" :
    percent_line_backblaze.style.width = price*7 + "px";

percent_line_backblaze$.innerHTML = price?.toFixed(2) + "$";

  range == "storage"
    ? (label_storage.innerHTML = `Storage: ${value} GB`)
    : (label_transfer.innerHTML = `Transfer: ${value} GB`);
  range == "storage"
    ? (backblaze_now_price_storage = quote * value)
    : (backblaze_now_price_transfer = quote * value);

  backblaze_price = price;
}

function calc_bunny(value, range) {
  let quote;
  let price;

  bunny_hhd ? (quote = 0.01) : (quote = 0.02);

  range == "transfer" ? (quote = 0.01) : null;
  range == "storage"
    ? (price = quote * value + bunny_now_price_transfer)
    : (price = quote * value + bunny_now_price_storage);

  price > 10 ? (price = 10) : null;

  percent_line_bunny$.innerHTML = price.toFixed(2) + "$";
  window.matchMedia("(orientation: portrait)").matches? percent_line_bunny.style.height = price*7 + "px":percent_line_bunny.style.width = price*7 + "px"

  range == "storage"
    ? (label_storage.innerHTML = `Storage: ${value} GB`)
    : (label_transfer.innerHTML = `Transfer: ${value} GB`);
  range == "storage"
    ? (bunny_now_price_storage = quote * value)
    : (bunny_now_price_transfer = quote * value);
  bunny_price = price;
}

function calc_scaleway(value, range) {
  let quote;
  let price;

  scaleway_multi ? (quote = 0.06) : (quote = 0.03);
  range == "transfer" ? (quote = 0.02) : (quote = quote);

  if (range == "storage") {
    value > 75
      ? (price = (quote * value) +( scaleway_now_price_transfer - (75 * quote)))
      : ([price, scaleway_now_price_storage] = [0, 0]);

    value > 75
      ? (scaleway_now_price_storage = quote * value - 75 * quote)
      : (scaleway_now_price_storage = 0);

    value < 75 && scaleway_now_price_transfer > 0
      ? price = scaleway_now_price_transfer 
      : null;
  } else {
    value > 75
      ? (price = quote * value + scaleway_now_price_storage - 75 * quote)
      : ([price, scaleway_now_price_transfer] = [0, 0]);
    value > 75
      ? (scaleway_now_price_transfer = quote * value - 75 * quote)
      : (scaleway_now_price_transfer = 0);
    value < 75 && scaleway_now_price_storage > 0
      ? price =scaleway_now_price_storage 
      : null;
  }

  percent_line_scaleway$.innerHTML = price.toFixed(2) + "$";
  window.matchMedia("(orientation: portrait)").matches?percent_line_scaleway.style.height = price*7 + "px":percent_line_scaleway.style.width = price*7 + "px"

  range == "storage"
    ? (label_storage.innerHTML = `Storage: ${value} GB`)
    : (label_transfer.innerHTML = `Transfer: ${value} GB`);
  scaleway_price = price;
}

function calc_vultr(value, range) {
  let quote;
  let price;

  range == "storage" ? (quote = 0.01) : (quote = 0.01);
  range == "storage"
    ? (price = quote * value + vultr_now_price_transfer)
    : (price = quote * value + vultr_now_price_storage);

  price < 5 ? (price = 5) : null;
  percent_line_vultr$.innerHTML = price.toFixed(2) + "$";
  window.matchMedia("(orientation: portrait)").matches?percent_line_vultr.style.height = price*7  + "px":percent_line_vultr.style.width = price*7 + "px"

  range == "storage"
    ? (label_storage.innerHTML = `Storage: ${value} GB`)
    : (label_transfer.innerHTML = `Transfer: ${value} GB`);
  range == "storage"
    ? (vultr_now_price_storage = quote * value)
    : (vultr_now_price_transfer = quote * value);

  vultr_price = price;
}




function handle_storage_range(value) {
  calc_backblaze(value, "storage");
  calc_vultr(value, "storage");
  calc_bunny(value, "storage");
  calc_scaleway(value, "storage");
  show_cheeper();
  handle_value_storage=value
  // console.log(handle_value_storage)
}

function handle_transfer_range(value) {
  calc_backblaze(value, "transfer");
  calc_vultr(value, "transfer");
  calc_bunny(value, "transfer");
  calc_scaleway(value, "transfer");
  show_cheeper();
  handle_value_transfer=value
  // console.log(handle_value_transfer)
}

function show_cheeper() {
  backblaze_price <= bunny_price &&
  backblaze_price <= scaleway_price &&
  backblaze_price <= vultr_price
    ? (percent_line_backblaze.style.backgroundColor = "red")
    : (percent_line_backblaze.style.backgroundColor = "grey");

  bunny_price <= backblaze_price &&
  bunny_price <= scaleway_price &&
  bunny_price <= vultr_price
    ? (percent_line_bunny.style.backgroundColor = "orange")
    : (percent_line_bunny.style.backgroundColor = "grey");

  scaleway_price <=
  (backblaze_price &&
    scaleway_price <= bunny_price &&
    scaleway_price <= vultr_price)
    ? (percent_line_scaleway.style.backgroundColor = "purple")
    : (percent_line_scaleway.style.backgroundColor = "grey");

  vultr_price <= backblaze_price &&
  vultr_price <= scaleway_price &&
  vultr_price <= bunny_price
    ? (percent_line_vultr.style.backgroundColor = "blue")
    : (percent_line_vultr.style.backgroundColor = "grey");
}
