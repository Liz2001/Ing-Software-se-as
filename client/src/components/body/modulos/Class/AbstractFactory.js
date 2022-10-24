import moduloFactory from "./moduloFactory";
import PreguntaFactory from "./PreguntaFactory";

export default class AbstractFactory{
    constructor(){
        this.modulo = new moduloFactory()
        this.pregunta = new PreguntaFactory()
    }

    obtenerModulo(){
        return this.modulo
    }
    obtenerPregunta(){
        return this.pregunta
    }
}