import { Aguila } from "./aguila.module.js";
import { Leon } from "./leon.module.js";
import { Serpiente } from "./serpiente.module.js";
import { Lobo } from "./lobo.module.js";
import { Oso } from "./oso.module.js";


document.addEventListener("DOMContentLoaded", function () {

    const btnRegistrar = document.querySelector("#btnRegistrar");
    const animal = document.querySelector("#animal");
    const edad = document.querySelector("#edad");
    const comentarios = document.querySelector("#comentarios");
    const preview = document.querySelector("#preview");
    const Animales = document.querySelector("#Animales");
    const audio = document.querySelector("#audio");

    const API_URL = "animales.json";
    let arrayAnimales = [];
    let animalEncontrado;
    let sonido;

    (async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw ({
                    codigo: response.status,
                    texto: "No fue posible traer los datos"
                });
            }
            const data = await response.json();
            data.animales.forEach(objetoAnimal => {
                arrayAnimales.push(objetoAnimal)
            });
        } catch (error) {
            console.error(error)
        }
    })();

    function buscaAnimal(animalSeleccionado) {
        return arrayAnimales.find(animal => animal.name === animalSeleccionado);
    }

    function limpiaHTML() {
        edad.value = "";
        comentarios.value = "";
        animal.value = "";
        const imagenAnterior = preview.querySelector('#preview img');
        if (imagenAnterior) {
            imagenAnterior.remove();
        }
    }

    function creaHTMLCard(animal, sonido) {
        console.log(sonido);
        const url = `assets/sounds/${sonido}`;
        Animales.innerHTML += `
        <div class="card mx-2 my-1" style="width: 12rem;"  >
            <img src="assets/imgs/${animal.getImg}" class="card-img-top" height="220" alt="Imagen del animal">
            <button onclick="reproducirAudio('${url}')" class="btn btn-secondary d-block"><img src="assets/imgs/audio.svg"></button>
        </div>
    `
    }

    function validaCampos(){
        if(!animal.value.trim()){
            animal.classList.add("is-invalid");
            animal.classList.remove("is-valid");
        }else{
            animal.classList.remove("is-invalid");
            animal.classList.add("is-valid");
        }

        if(!edad.value.trim()){
            edad.classList.add("is-invalid");
            edad.classList.remove("is-valid");
        }else{
            edad.classList.remove("is-invalid");
            edad.classList.add("is-valid");
        }

        if(!comentarios.value.trim()){
            comentarios.classList.add("is-invalid");
            comentarios.classList.remove("is-valid");
        }else{
            comentarios.classList.remove("is-invalid");
            comentarios.classList.add("is-valid");
        }

        if(animal.value !== "" && edad.value !== "" && comentarios.value !== ""){
            return true;
        }else{
            return false;
        }

    }

    animal.addEventListener('change', () => {
        const animalSeleccionado = animal.value;
        animalEncontrado = buscaAnimal(animalSeleccionado);
        const ubicacionImagen = `assets/imgs/${animalEncontrado.imagen}`;
        const imagenAnterior = preview.querySelector('#preview img');
        if (imagenAnterior) {
            imagenAnterior.remove();
        }

        const img = document.createElement("img");
        img.setAttribute("src", ubicacionImagen);
        preview.appendChild(img);
    })

    btnRegistrar.addEventListener("click", () => {
        const animalSeleccionado = animal.value;
        animalEncontrado = buscaAnimal(animalSeleccionado);
        console.log(animalEncontrado);
        const validacion = validaCampos();

        if(validacion){
            switch (animalSeleccionado) {
                case "Lobo":
                    const lobo = new Lobo(animalEncontrado.name, edad.value, animalEncontrado.imagen, comentarios.value, animalEncontrado.sonido);
                    sonido = lobo.aullar();
                    creaHTMLCard(lobo, sonido);
                    break;
                case "Serpiente":
                    const serpiente = new Serpiente(animalEncontrado.name, edad.value, animalEncontrado.imagen, comentarios.value, animalEncontrado.sonido);
                    sonido = serpiente.sisear();
                    creaHTMLCard(serpiente, sonido);
                    break;
                case "Leon":
                    const leon = new Leon(animalEncontrado.name, edad.value, animalEncontrado.imagen, comentarios.value, animalEncontrado.sonido);
                    sonido = leon.rugir();
                    creaHTMLCard(leon, sonido);
                    break;
                case "Oso":
                    const oso = new Oso(animalEncontrado.name, edad.value, animalEncontrado.imagen, comentarios.value, animalEncontrado.sonido);
                    sonido = oso.gruñir();
                    creaHTMLCard(oso, sonido);
                    break;
                case "Aguila":
                    const aguila = new Aguila(animalEncontrado.name, edad.value, animalEncontrado.imagen, comentarios.value, animalEncontrado.sonido);
                    sonido = aguila.chillar();
                    creaHTMLCard(aguila, sonido);
                    break;
                default:
                    console.log("seleccione una opción válida");
                    break;
            }
            limpiaHTML();
        }
    })

})






