import Pregunta from "./Pregunta";

export default class PreguntaFactory{
    crearPregunta(question,answer,respuestainc){
        return new Pregunta(question,answer,respuestainc)
    }

}