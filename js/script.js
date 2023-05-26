let horarioFinal;
let dia;
let diaDisponible;
let profesionalTrabajando;
let nombrePaciente;
let dniPaciente;
let apellidoPaciente;
let keyFinal;
let nombreProfesional;
const profesionales = [
    "juan",
    "maria",
    "roberto"
]
const diasSemana = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes"
]
/* const diaAm = [
    "lunes",
    "miercoles",
    "viernes"
]
const diaPm = [
    "martes",
    "jueves"
] */
class turnosReservados {
    constructor(dia, horario, horarioFinal, nombreProfesional, nombrePaciente, apellidoPaciente, dniPaciente, confirmado) {
        this.dia = dia;
        this.horario = horario;
        this.horarioFinal = horarioFinal;
        this.nombreProfesional = nombreProfesional;
        this.nombrePaciente = nombrePaciente;
        this.apellidoPaciente = apellidoPaciente;
        this.dniPaciente = dniPaciente;
        this.confirmado = confirmado;
    }
}
const turnos = []

class pacienteDatos {
    constructor(nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}

function validarProfesional (nombreProfesional) {
    if (profesionales.includes(nombreProfesional)) {
        alert(`Medico/a ${nombreProfesional} trabaja en este establecimiento`);
        profesionalTrabajando = true;
        return nombreProfesional;
    } else {
        alert(`Medico/a ${nombreProfesional} no trabaja en este establecimiento`);
        profesionalTrabajando = false;
    }
}

function turnosAmPm (horario) {
    if (horario == "am") {
        dia = prompt("Qué día desea reservar?").toLowerCase();
        diaDisponible = diaAM.indexOf(dia);
        if (diaDisponible >= 0) {
            horarioFinal = prompt("Los horarios disponibles son: 10:00, 10:30, 11:00, 11:30, 12:00. Cuando desea reservar?");
            keyFinal = true;
            return horario = horario;
        } else {
            alert(`No se puede reservar para el día ${dia} a la mañana`);
            keyFinal = false;
        }
    } else if(horario == "pm") {
        dia = prompt("Qué día desea reservar?").toLowerCase();
        diaDisponible = diaPM.indexOf(dia);
        if (diaDisponible >= 0) {
            horarioFinal = prompt("Los horarios disponibles son: 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00. Cuando desea reservar?");
            keyFinal = true;
            return horario = horario;
        } else {
            alert(`No se puede reservar para el día ${dia} a la tarde`);
            keyFinal = false;
        }
    } else {
        alert("Error: ud no ha seleccionado ni Am, ni Pm");
        keyFinal = false;
    }
}

function confirmarDatos () {
    nombrePaciente = prompt("Ingrese su nombre");
    apellidoPaciente = prompt("Ingrese su apellido");
    dniPaciente = prompt("Ingrese su número de documento");
    alert(`Datos confirmados, ${nombrePaciente} ${apellidoPaciente}, con el dni ${dniPaciente}`);
}

function confirmaciónTurno () {
    if (profesionalTrabajando == true) {
        horario = turnosAmPm(prompt("Desea reservar: am o pm?").toLowerCase());
        if (keyFinal == true) {
            alert(`Su turno con ${nombreProfesional} ha sido reservado a nombre de ${nombrePaciente}, dni:${dniPaciente}, para el día ${dia} a las ${horarioFinal} ${horario}.`);
        }
    } else {
        alert(`Error: Datos invalidos o no correspondientes. No se pudo reservar un turno`);
    }
}

//codigo para separar entre los días de la mañana y la tarde
const diaAM = diasSemana.filter((elemento, indice) => indice % 2 === 0);
console.log(diaAM)
const diaPM = diasSemana.filter((elemento, indice) => indice % 2 !== 0);
console.log(diaPM)

alert("Bienvenido al sistema de reservas para turnos de odontología");
confirmarDatos();
const paciente = new pacienteDatos(nombrePaciente, apellidoPaciente, dniPaciente);
let turnosReservar = prompt("Cuantos turnos desea reservar?");
console.log(turnosReservar);
if (isNaN(turnosReservar)) {
    alert(`${turnosReservar} no es un número`);
} else {
    alert("Nuestros profesionales son: juan, maria y roberto.");
    for (i = 0; i < turnosReservar; i++){
        nombreProfesional = validarProfesional(prompt("Indique el nombre del medico para el turno").toLowerCase());
        confirmaciónTurno();
        const turnoNuevo = new turnosReservados(dia, horario, horarioFinal, nombreProfesional, nombrePaciente, apellidoPaciente, dniPaciente, keyFinal);
        turnos.push(turnoNuevo);
    }
}
console.table(turnos);
