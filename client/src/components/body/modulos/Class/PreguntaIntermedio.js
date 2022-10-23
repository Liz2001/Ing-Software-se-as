import Pregunta from "./Pregunta"

export default class PreguntaIntermedio extends Pregunta{
    constructor(question,answer,respuestainc){
        super(question,answer,respuestainc)
    }
    getQuestion(){
        return this.question
    }
    getAnswer(){
        return this.answer
    }
    getRespuestaInc(){
        return this.respuestainc
    }
}