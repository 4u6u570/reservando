var Reserva = function (horario, cantPersonas, precioPersona, codDescuento) {
    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioPersona = precioPersona;
    this.codDescuento = codDescuento;
}

Reserva.prototype.calcularPrecioBase = function () {
    return this.cantPersonas * this.precioPersona;
}

Reserva.prototype.precioTotalReserva = function () {
    var precioBase = this.calcularPrecioBase();
    return precioBase + this.calcularAdicionales(precioBase) - this.calcularDescuentos(precioBase);
}

Reserva.prototype.calcularDescuentos = function (precioBase) {
    return this.calcularDescuentosPorCodigo(precioBase) + this.calcularDescuentosPorGrupo(precioBase);
}

Reserva.prototype.calcularDescuentosPorCodigo = function (precioBase) {
    switch (this.codDescuento) {
        case "DES15":
            return precioBase * .15;
        case "DES200":
            return 200;
        case "DES1":
            return this.precioPersona;
    }
}

Reserva.prototype.calcularDescuentosPorGrupo = function (precioBase) {
    switch (true) {
        case this.cantPersonas >= 4 && this.cantPersonas <= 6:
            return precioBase * .05;
        case this.cantPersonas >= 7 && this.cantPersonas <= 8:
            return precioBase * .10;
        case this.cantPersonas > 8:
            return precioBase * .15;
    }
}

Reserva.prototype.calcularAdicionales = function (precioBase) {
    return this.calcularAdicionalPorHorario(precioBase) + this.calcularAdicionalPorFinDeSemana(precioBase);
}

Reserva.prototype.calcularAdicionalPorHorario = function (precioBase) {
    var hora = this.horario.getHours();
    if ( (hora >= 13 && hora <= 14) || (hora >= 20 && hora <= 21) )  {
        return precioBase * .05;
    }
    return 0;
}

Reserva.prototype.calcularAdicionalPorFinDeSemana = function (precioBase) {
    var dia = this.horario.getDay();
    if (dia === 5 || dia === 6 || dia === 0) {
        return precioBase * .10;
    }
    return 0;
}