const expect = chai.expect;

describe("Tests de Restarurantes", function () {
    describe("Reservar Horario", function () {

        let restaurante;
        let horarios;
        let horariosCheck;

        beforeEach(function () {
            restaurante = listaPrueba().restaurantes[0];
            horariosCheck = restaurante.horarios.slice();
        })
        it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.", function () {
            let reservas = horariosCheck[0];
            restaurante.reservarHorario(reservas);
            expect(restaurante.horarios).to.not.have.length(horariosCheck.length);
        })

        it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.", function () {
            restaurante.reservarHorario("22:22");
            expect(restaurante.horarios).to.have.length(horariosCheck.length);
        })

        it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function () {
            restaurante.reservarHorario("");
            expect(restaurante.horarios).to.have.length(horariosCheck.length);
        })

        it("la cantidad de elementos del arreglo disminuya o no según corresponda.", function () {
            restaurante.reservarHorario();
            expect(restaurante.horarios).to.eql(horariosCheck);
        })
    });

    describe("Obtener Puntuación", function () {
        var restaurante;
        var promedioOriginal;

        beforeEach(function () {
            restaurante = listaPrueba().restaurantes[0];
        })
        it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.", function () {
            let promedioControl;
            let calificacionesControl = restaurante.calificaciones.slice();
            promedioControl = calificacionesControl.reduce((anterior, actual) => actual += anterior) / calificacionesControl.length;
            promedioOriginal = restaurante.obtenerPuntuacion();
            expect(promedioOriginal).to.be.equal(promedioControl);
        })

        it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.", function () {
            restaurante.calificaciones = [];
            promedioOriginal = restaurante.obtenerPuntuacion();
            expect(promedioOriginal).to.be.equal(0);
        })
    });

    describe("Calificar Restaurante",function () {
        var restaurante;
        var calificacionesOriginal;
        var calificacion;

        beforeEach(function(){
            restaurante = listaPrueba().restaurantes[1];
            calificacionesOriginal = restaurante.calificaciones;
            calificacion = 0;
        })

        it("La calificación está dentro del rango establecido.", function () {
            calificacion = 6;
            restaurante.calificar(calificacion);
            expect(calificacionesOriginal).to.be.include(calificacion);
        })

        it("La calificación no sea con número negativo", function () {
            calificacion = -3;
            restaurante.calificar(calificacion);
            expect(calificacionesOriginal).that.does.not.include(calificacion);
        })

        it("La calificación no sea un número decimal.", function () {
            calificacion = 3.1;
            restaurante.calificar(calificacion);
            expect(calificacionesOriginal).that.does.not.include(calificacion);
        })

        it("La calificación no sea un string.", function () {
            calificacion = "abc";
            restaurante.calificar(calificacion);
            expect(calificacionesOriginal).that.does.not.include(calificacion);
        })

    });
});

describe("Test Lista de Restaurantes", function () {
    describe("Buscar Restaurante", function (){
        var idRestaurante;
        var listadoDeRestaurantes;
        var restauranteControl;
        var restaurante;

        beforeEach(function (){
            listaDeRestaurantes = listaPrueba();
        });

        it("Encuentra el restaurante por ID.", function (){
            idRestaurante = 6;
            restauranteControl =  listaDeRestaurantes.restaurantes[5];
            restaurante = listaDeRestaurantes.buscarRestaurante(idRestaurante);
            expect(restaurante.id).to.be.equal(restauranteControl.id);
        });

        it("Que no encuentre un ID NO registrado.", function (){
            idRestaurante = 1000;
            restaurante = listaDeRestaurantes.buscarRestaurante(idRestaurante);
            expect(restaurante).to.be.eql("No se ha encontrado ningún restaurant");
        });

        it("Si paso un string que no devuelva nada.", function (){
            idRestaurante = "abc";
            restaurante = listaDeRestaurantes.buscarRestaurante(idRestaurante);
            expect(restaurante).to.be.eql("No se ha encontrado ningún restaurant");
        });

    });

    describe("Obtener Restaurantes", function () {
        var listaDeRestaurantes;
        var listaFinal;

        beforeEach(function(){
            listaDeRestaurantes = listaPrueba();
        });

        it("Sin filtro devuelve todo el listado de restaurantes completo.", function (){
            listaFinal = listaDeRestaurantes.obtenerRestaurantes(null, null, null);
            expect(listaFinal).to.have.length(24);
        });

        it("Filtra los restaurantes con el parámetro Rubro", function (){
            listaFinal = listaDeRestaurantes.obtenerRestaurantes("Pizza", null, null);
            expect(listaFinal).to.have.length(4);
        });

        it("Filtra los restaurantes con el parámetro Ciudad", function (){
            listaFinal = listaDeRestaurantes.obtenerRestaurantes(null, "Berlín", null);
            expect(listaFinal).to.have.length(5);
        });

        it("Filtra los restaurantes con el parámetro Horario", function (){
            listaFinal = listaDeRestaurantes.obtenerRestaurantes(null, null, "13:00");
            expect(listaFinal).to.have.length(3);
        });

        it("Filtra los restaurantes con TODOS los parámetros", function (){
            listaFinal = listaDeRestaurantes.obtenerRestaurantes("Pasta", "Roma", "15:30");
            expect(listaFinal).to.have.length(2);
        });
    });
});

describe("Test de Reservas", function () {

    describe("Precio Base.", function (){
        it("Se calclaula el precio base correctamente ",function(){
            var precioBase = new Reserva(new Date(2020, 1, 10, 05, 00), 8, 350, "DES1").calcularPrecioBase();
            expect(precioBase).to.equal(2800);
        })
    });

    describe("Precio Final.", function (){
        it("Se calcula el precio Final correctamente ",function(){
            var precioBase = new Reserva(new Date(2020, 1, 10, 05, 00), 8, 350, "DES1").precioTotalReserva();
            expect(precioBase).to.equal(2170);
        })
    });
});

    function listaPrueba() {
        let listadoDeRestaurantes = [
            new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
            new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
            new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
            new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
            new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
            new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
            new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
            new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
            new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
            new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
            new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
            new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
            new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7,]),
            new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
            new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
            new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
            new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
            new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
            new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
            new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
            new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
            new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
            new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
            new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
        ];
        return new Listado(listadoDeRestaurantes);
    }