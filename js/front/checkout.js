import { getEl, getEls } from "../global.js";
// import { discountCode } from "./index";

const cuponInput = getEl(".cupon__input");
const total = getEl(".totalPagar");
const tickets = getEl(".tickets");
const ticketsType = getEl(".ticketsType");
const modal = getEl(".Modal");
const placeOrder = getEl(".placeOrder");

window.addEventListener("load", () => {
  const params = new URL(document.location).searchParams;
  const amount = params.get("tickets");
  const type = params.get("pricing");
  let totalNoDiscount = 0;
  tickets.innerHTML = amount;
  ticketsType.innerHTML = type;
  if (type === "Standard") {
    total.innerHTML = amount * 200;
    totalNoDiscount = total.innerHTML;
  } else if (type === "VIP") {
    total.innerHTML = amount * 500;
    totalNoDiscount = total.innerHTML;
  } else if (type === "Platinium") {
    total.innerHTML = amount * 900;
    totalNoDiscount = total.innerHTML;
    console.log(totalNoDiscount);
  }

  cuponInput.addEventListener("input", discount);
  function discount() {
    const cupon = cuponInput.value;
    if (cupon === "BEST10") {
      console.log(total.innerHTML);
      const totalDescuento = (total.innerHTML * (100 - 10)) / 100;
      console.log(totalDescuento);
      total.innerHTML = totalDescuento;
    } else {
      total.innerHTML = totalNoDiscount;
    }
  }
});

placeOrder.addEventListener("click", () => {
  modal.classList.add("Modal--active");
});
