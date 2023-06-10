let profesionalTrabajando;
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
class turnosReservados {
    constructor(nombrePacienteYApellido, dniPaciente, dia, horario, nombreProfesional) {
        this.nombrePaciente = nombrePacienteYApellido;
        this.dniPaciente = dniPaciente;
        this.dia = dia;
        this.horario = horario;
        this.nombreProfesional = nombreProfesional;
    }
}
const turnos = []

function validarProfesional (nombreProfesional) {
    if (profesionales.includes(nombreProfesional)) {
        return true;
    } else {
        return false;
    }
}

//creador de cartas con turnos
function creadorTarjetasTurnos(turno, index) {
    const vitrina = document.getElementById("vitrinaTurnos")
    const divTurnos = document.createElement("div");

    const paciente = document.createElement("h3");
    paciente.textContent = `Paciente: ${turno.nombrePaciente}`;

    const dni = document.createElement("h4");
    dni.textContent = `Dni: ${turno.dniPaciente}`;

    const dia = document.createElement("h3");
    dia.textContent = `Día: ${turno.dia}`;

    const horario = document.createElement("h4");
        horario.textContent = `Horario: ${turno.horario}`;

    const profesional = document.createElement("h3");
    profesional.textContent = `Profesional: ${turno.nombreProfesional}`;

    const cancelarbttn = document.createElement("button");
    cancelarbttn.innerText = "Cancelar turno";
    cancelarbttn.addEventListener("click", () => {
        let index = turnos.indexOf(turno);
        if(index > -1){
            turnos.splice(index, 1);
            divTurnos.remove();
            LSAcutalizado();
        }
    });

    divTurnos.appendChild(paciente);
    divTurnos.appendChild(dni);
    divTurnos.appendChild(dia);
    divTurnos.appendChild(horario);
    divTurnos.appendChild(profesional);
    divTurnos.appendChild(cancelarbttn);
    vitrina.appendChild(divTurnos);
}



//validaDatos
function ValidarDatos(name, pass){
    let autenticado;
    if(name == "Carlos" && pass == "TerceraPreentrega"){
        return autenticado = true;
    } else {
        return autenticado = false
    }
}

//login
function Login() {
    let login = document.getElementById("login");
    const formLogin = document.createElement("form");

    const loginNombre = document.createElement("input");
    loginNombre.setAttribute("type", "text");
    loginNombre.setAttribute("name", "nombre");
    loginNombre.setAttribute("placeholder", "Ingrese su nombre");
    formLogin.appendChild(loginNombre);

    const loginClave = document.createElement("input");
    loginClave.setAttribute("type", "password");
    loginClave.setAttribute("name", "clave");
    loginClave.setAttribute("placeholder", "Ingrese su clave");
    formLogin.appendChild(loginClave);

    const loginSubmit = document.createElement("button");
    loginSubmit.setAttribute("type", "submit");
    loginSubmit.innerText = "Enviar";
    formLogin.appendChild(loginSubmit);
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let name = loginNombre.value;
        let pass = loginClave.value;
        let autenticado = ValidarDatos(name, pass);
        
        if (autenticado) {
            localStorage.setItem("secretarioLogueadoLS", autenticado);
            login.style.display = "none";
            IniciaAgenda();
            ayudalogin.style.display = "none";
            profesionalesAyuda.style.display = "block";
        }  else {
            formLogin.reset();
        }
    })
    login.appendChild(formLogin);
}

//vitrina crea turnos
function IniciaAgenda(){
    let agenda = document.getElementById("agendaTurnos");
    const formAgenda = document.createElement("form");

    const nombrePaciente = document.createElement("input");
    nombrePaciente.setAttribute("type", "text");
    nombrePaciente.setAttribute("name", "nombre");
    nombrePaciente.setAttribute("placeholder", "Nombre y apellido paciente");
    nombrePaciente.setAttribute("required", "")
    formAgenda.appendChild(nombrePaciente);

    const dni = document.createElement("input");
    dni.setAttribute("type", "text");
    dni.setAttribute("name", "nombre");
    dni.setAttribute("placeholder", "Dni paciente");
    dni.setAttribute("required", "");
    formAgenda.appendChild(dni);

    const dia = document.createElement("input");
    dia.setAttribute("type", "text");
    dia.setAttribute("name", "nombre");
    dia.setAttribute("placeholder", "Día del turno");
    dia.setAttribute("required", "");
    formAgenda.appendChild(dia);

    const horario = document.createElement("input");
    horario.setAttribute("type", "text");
    horario.setAttribute("name", "nombre");
    horario.setAttribute("placeholder", "Horario del turno");
    horario.setAttribute("required", "");
    formAgenda.appendChild(horario);

    const profesional = document.createElement("input");
    profesional.setAttribute("type", "text");
    profesional.setAttribute("name", "nombre");
    profesional.setAttribute("placeholder", "Profesional");
    profesional.setAttribute("required", "");
    formAgenda.appendChild(profesional);

    const submitAgenda = document.createElement("button");
    submitAgenda.setAttribute("type", "submit");
    submitAgenda.innerText = "Crear";
    formAgenda.appendChild(submitAgenda);
    formAgenda.addEventListener("submit", (e) => {
        e.preventDefault();
        if(validarProfesional(profesional.value)){
            const turnoNuevo = new turnosReservados(nombrePaciente.value, dni.value, dia.value, horario.value, profesional.value);
            turnos.push(turnoNuevo);
            creadorTarjetasTurnos(turnoNuevo);
            LSAcutalizado();
            formAgenda.reset();
        } else {
            alert("Profesional no coincidide con la base de datos");
        }
    })
    agenda.appendChild(formAgenda);
}

//pasar turnos a json
function LSAcutalizado() {
    let turnosActuales = JSON.stringify(turnos);
    localStorage.setItem("TurnosLS", turnosActuales);
}

function recargaTurnos(){
    let turnosLS = localStorage.getItem("TurnosLS");
    if(turnosLS != undefined){
        turnos.splice(0, turnos.length);
        turnosLS = JSON.parse(turnosLS);
        turnos.push(...turnosLS);
        turnos.forEach((turno, index) => { creadorTarjetasTurnos(turno, index)});
    }
}

//log in de secretaria
const secretarioLogueadoLS = localStorage.getItem('secretarioLogueadoLS');
let ayudalogin = document.getElementById("AyudaLogin");
let profesionalesAyuda = document.getElementById("Profesionales");
profesionalesAyuda.style.display = "none";

if(secretarioLogueadoLS){
    console.log("logueado")
    ayudalogin.style.display = "none";
    IniciaAgenda();
    profesionalesAyuda.style.display = "block";
} else {
    Login();
}

recargaTurnos();