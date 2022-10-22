export default class Modulos{
    constructor(id, titulo,texto,disponible,completado)
    {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.disponible = disponible;
        this.completado = completado
    }
    getId(){
        return this.id
    }    
    getTitulo(){
       return this.titulo
    }
    getTexto(){
       return this.texto
    }
    getDisponible(){
       return this.disponible
    }
    getCompletado(){
       return this.completado
    }    
}




 