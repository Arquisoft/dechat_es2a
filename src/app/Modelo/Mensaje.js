class Mensaje
{
    constructor(emisor,receptor,texto)
    {
        this.emisor=emisor;
        this.receptor=receptor;
        this.texto=texto;
        this.fecha = new Date().getTime();
    }


    serialize(){
        return JSON.stringify({
            "date": this.fecha,
            "messages":this.texto
        })
    }
}


module.exports = Mensaje;
