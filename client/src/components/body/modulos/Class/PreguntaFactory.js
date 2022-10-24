
import Pregunta from "./Pregunta";
import PreguntaAvanzado from "./PreguntaAvanzado";
import PreguntaIntermedio from "./PreguntaIntermedio";
import PreguntaPrincipiante from "./PreguntaPrincipiante";

export default class PreguntaFactory{
    crearPregunta(modulo,question,answer,respuestainc){
        if(modulo === "Principiante"){
            return new PreguntaPrincipiante(question,answer,respuestainc,modulo)
        }else if(modulo === "Intermedio"){
            return new PreguntaIntermedio(question,answer,respuestainc,modulo)
        }else if(modulo === "Avanzado"){
            return new PreguntaAvanzado(question,answer,respuestainc,modulo)
        }
    }

}