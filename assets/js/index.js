import { Aguila } from "./aguila.module.js";
import { Leon } from "./leon.module.js";
import { Serpiente } from "./serpiente.module.js";
import { Lobo } from "./lobo.module.js";
import { Oso } from "./oso.module.js";

const btnRegistrar = document.querySelector("#btnRegistrar");
const animal = document.querySelector("#animal");
const edad = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const preview = document.querySelector("#preview");

const API_URL = "animales.json";
let arrayAnimales = [];

(async () => {
    try {
        const response = await fetch(API_URL);
        if(!response.ok){
            throw({
                codigo: response.status,
                texto: "No fue posible traer los datos"
            });
        }
        const data = await response.json();
        data.animales.forEach(element => {
            arrayAnimales.push(element)
        });
    } catch (error) {
        console.error(error)
    }
})();


animal.addEventListener('change', () => {
    const animalSeleccionado = animal.value;
    const animalEncontrado = arrayAnimales.find( animal => animal.name === animalSeleccionado);
    const ubicacionImagen = `assets/imgs/${animalEncontrado.imagen}`;

    const imagenAnterior = preview.querySelector('#preview img');
    if (imagenAnterior) {
        imagenAnterior.remove();
    }

    const img = document.createElement("img");
    img.setAttribute("src", ubicacionImagen);
    preview.appendChild(img);
})





