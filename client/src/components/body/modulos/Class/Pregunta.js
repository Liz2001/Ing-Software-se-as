export default class Pregunta{
    constructor(question, answer, respuestainc,modulo){
        this.question = question
        this.answer = answer
        this.respuestainc = respuestainc
        this.modulo = modulo
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
    getmodulo(){
        return this.modulo
    }
}
