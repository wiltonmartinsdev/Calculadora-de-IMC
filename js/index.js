import { Modal } from "./Modal.js";
import AlertError from "./alert-error.js";
import { calculateIMC, notANumber } from "./utils.js";

const form = document.querySelector("form");
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");

inputWeight.oninput = () => AlertError.close();
inputHeight.oninput = () => AlertError.close();

form.onsubmit = (event) => {
    event.preventDefault();

    const weight = inputWeight.value;
    const height = inputHeight.value;

    const weightOrHeightIsNotNumber = notANumber(weight) || notANumber(height);

    if (weightOrHeightIsNotNumber) {
        AlertError.open();

        return;
    }

    AlertError.close();

    const result = calculateIMC(weight, height);

    inputWeight.value = "";
    inputHeight.value = "";

    displayResultMessage(result);
};

function displayResultMessage(result) {
    let message = "";

    if (result < 18.5) {
        message = `Baixo Peso!
                    Seu IMC: ${result}`;
    } else if (result <= 24.9) {
        message = `Peso Ideal! 
                    Seu IMC: ${result}`;
    } else if (result <= 29.9) {
        message = `Sobrepeso! 
                    Seu IMC: ${result}`;
    } else if (result <= 34.9) {
        message = `Obesidade grau 1!
        Seu IMC: ${result}`;
    } else if (result <= 39.9) {
        message = `Obesidade grau 2!
                    Seu IMC: ${result}`;
    } else {
        message = `Obesidade grau 3!
        Seu IMC: ${result}`;
    }

    Modal.message.innerText = message;
    Modal.open();
}
