import { getEl, getEls } from "../global.js";

const cuponInput = getEl(".cupon__input");
const total = getEl(".totalPagar");

const discount = () => {
  const cupon = cuponInput.value;
  if (cupon === "BEST10") {
    const totalDescuento = (total.value * (100 - 10)) / 100;
    total.innerHtnl = totalDescuento;
  } else {
    alert("Codigo de descuento no valido");
  }
};
