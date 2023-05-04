let horarioFinal;
let día;
let profesionalTrabajando;
let nombrePaciente;
let dniPaciente;
function validarProfesional (nombreProfesional) {
    if (nombreProfesional == "juan carlos" || "maria sol" || "roberto ignacio") {
        alert(`Medico/a ${nombreProfesional} trabaja en este establecimiento`);
        return profesionalTrabajando = true;
    } else {
        alert(`Medico/a ${nombreProfesional} no trabaja en este establecimiento`);
        return profesionalTrabajando = false;
    }
}

function turnosAmPm (horario) {
    if (horario == "am") {
        día = alert(prompt("Qué día desea reservar?").toLowerCase);
        if (día == "miercoles" || "lunes" || "viernes") {
            return horarioFinal = alert(prompt("Los horarios disponibles son: 10:00, 10:30, 11:00, 11:30, 12:00. Cuando desea reservar?"));
        } else if (día == "martes" || "jueves") {
            alert(`No hay turnos para el ${día} a la mañana`);
        } else {
            alert(`No se puede reservar para el día ${día}`);
        }
    } else if ("pm") {
        alert(prompt("Qué día desea reservar?").toLowerCase);
        let día = alert(prompt("Qué día desea reservar?").toLowerCase);
        if (día == "martes" || "jueves") {
            return horarioFinal = alert(prompt("Los horarios disponibles son: 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00. Cuando desea reservar?"));
        } else if (día == "miercoles" || "lunes" || "viernes") {
            alert(`No hay turnos para el ${día} a la tarde`);
        } else {
            alert(`No se puede reservar para el día ${día}`);
        }
    } else {
        alert("Error: ud no ha seleccionado ni Am, ni Pm");
    }
}

function confirmarDatos (nombrePaciente, dniPaciente) {
    alert(`Datos confirmados, ${nombrePaciente} con el dni ${dniPaciente}`);
}

function confirmaciónTurno () {
    if (profesionalTrabajando == true) {
        turnosAmPm(prompt("Desea reservar: am o pm?").toLowerCase);
        alert(`Su turno con ${nombreProfesional} ha sido reservado a nombre de ${nombrePaciente}, dni:${dniPaciente}, para el día ${día} a las ${horarioFinal} ${horario}.`);
    } else {
        alert(`Error: Datos invalidos o no correspondientes. No se pudo reservar un turno`);
    }
}


alert("Bienvenido al sistema de reservas para turnos de odontología");
confirmarDatos(prompt("Ingrese su nombre"), prompt("Ingrese su número de documento"));
alert("nuestros profesionales son: juan carlos, maria sol y roberto ignacio. Pero puede consultar si otro médico está habilitado");
validarProfesional(prompt("Indique el nombre del medico para el turno").toLowerCase);
confirmaciónTurno();