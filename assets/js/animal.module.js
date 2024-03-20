export class Animal {

    #id;
    #nombre;
    #edad;
    #img;
    comentarios;
    #sonido;

    constructor(id,nombre, edad, img, comentarios, sonido){
        this.#id = id;
        this.#nombre = nombre;
        this.#edad = edad;
        this.#img = img;
        this.comentarios = comentarios;
        this.#sonido = sonido;
    }

    get getId(){
        return this.#id;
    }

    get getNombre(){
        return this.#nombre;
    }
    get getEdad(){
        return this.#edad;
    }
    get getImg(){
        return this.#img;
    }

    set setComentarios(nuevoComentarios){
        this.comentarios = nuevoComentarios;
    }

    get getSonido(){
        return this.#sonido;
    }
}