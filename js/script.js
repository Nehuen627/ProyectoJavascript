let horarioFinal;
let día;
let profesionalTrabajando;
let nombrePaciente;
let dniPaciente;
let keyFinal;

function validarProfesional (nombreProfesional) {
    if (nombreProfesional == "juan" || nombreProfesional == "maria" || nombreProfesional == "roberto") {
        alert(`Medico/a ${nombreProfesional} trabaja en este establecimiento`);
        profesionalTrabajando = true;
        return nombreProfesional = nombreProfesional;
    } else {
        alert(`Medico/a ${nombreProfesional} no trabaja en este establecimiento`);
        profesionalTrabajando = false;
    }
}

function turnosAmPm (horario) {
    if (horario == "am") {
        día = prompt("Qué día desea reservar?").toLowerCase();
        if (día == "miercoles" || día == "lunes" || día == "viernes") {
            horarioFinal = prompt("Los horarios disponibles son: 10:00, 10:30, 11:00, 11:30, 12:00. Cuando desea reservar?");
            keyFinal = true;
            return horario = horario;
        } else if (día == "martes" || día == "jueves") {
            alert(`No hay turnos para el ${día} a la mañana`);
            keyFinal = false;
        } else {
            alert(`No se puede reservar para el día ${día}`);
            keyFinal = false;
        }
    } else if(horario == "pm") {
        día = prompt("Qué día desea reservar?").toLowerCase();
        if (día == "martes" || día == "jueves") {
            horarioFinal = prompt("Los horarios disponibles son: 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00. Cuando desea reservar?");
            keyFinal = true;
            return horario = horario;
        } else if (día == "miercoles" || día == "lunes" || día == "viernes") {
            alert(`No hay turnos para el ${día} a la tarde`);
            keyFinal = false;
        } else {
            alert(`No se puede reservar para el día ${día}`);
            keyFinal = false;
        }
    } else {
        alert("Error: ud no ha seleccionado ni Am, ni Pm");
        keyFinal = false;
    }
}

function confirmarDatos () {
    nombrePaciente = prompt("Ingrese su nombre");
    dniPaciente = prompt("Ingrese su número de documento");
    alert(`Datos confirmados, ${nombrePaciente} con el dni ${dniPaciente}`);
}

function confirmaciónTurno () {
    if (profesionalTrabajando == true) {
        horario = turnosAmPm(prompt("Desea reservar: am o pm?").toLowerCase());
        if (keyFinal == true) {
            alert(`Su turno con ${nombreProfesional} ha sido reservado a nombre de ${nombrePaciente}, dni:${dniPaciente}, para el día ${día} a las ${horarioFinal} ${horario}.`);
        }
    } else {
        alert(`Error: Datos invalidos o no correspondientes. No se pudo reservar un turno`);
    }
}

alert("Bienvenido al sistema de reservas para turnos de odontología");
confirmarDatos();
let turnosReservar = prompt("Cuantos turnos desea reservar?");
alert("Nuestros profesionales son: juan, maria y roberto.");
for (i = 0; i < turnosReservar; i++){
    nombreProfesional = validarProfesional(prompt("Indique el nombre del medico para el turno").toLowerCase());
    confirmaciónTurno();
}