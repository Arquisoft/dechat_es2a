class Mensaje
{
    constructor(emisor,receptor,texto)
    {
        this.emisor=emisor;
        this.receptor=receptor;
        this.texto=texto;
        this.fecha = new Date().getTime();
    }


}


module.exports = Mensaje;
