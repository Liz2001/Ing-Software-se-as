export default class Pregunta{
    constructor(question, answer, respuestainc){
        this.question = question
        this.answer = answer
        this.respuestainc = respuestainc
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