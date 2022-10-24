import Modulos from "./moduleClass";

export default class moduloFactory{
    crearModulo(id,titulo,texto,disponible,completado){
        return new Modulos(id,titulo,texto,disponible,completado)
    }
}