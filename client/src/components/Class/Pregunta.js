class Pregunta{
    constructor(rcorrecta, rinc, texto){
        this.rcorrecta = rcorrecta,
        this.rinc = rinc,
        this.texto = texto
    }

    comprobarRespuesta(respuesta){
        if(respuesta == this.rcorrecta){           
            return 'La repuesta es correcta'
        }else{
            return 'Respuesta incorrecta'
        }

    }
}