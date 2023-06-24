const profesionales = [];
let datosSecretario = {};
const turnos = []
const vitrina = document.getElementById("vitrinaTurnos");
let profesionalTrabajando;
const secretarioLogueadoLS = localStorage.getItem('secretarioLogueadoLS');
let ayudalogin = document.getElementById("AyudaLogin");
let profesionalesAyuda = document.getElementById("Profesionales");

function traerDatos() {
    Promise.all([
        fetch("../json/datosSecretario.json").then(res => res.json()),
        fetch("../json/profesionales.json").then(res => res.json())
    ])
    .then(([datosSecretarioData, profesionalesData]) => {
        datosSecretario = datosSecretarioData;
        profesionalesData.profesionales.forEach((item) => profesionales.push(item));
    })
}


function ValidarDatos(name, password){
    if(name == datosSecretario.name && password == datosSecretario.password){
        return autenticado = true;
    } else {
        return autenticado = false
    }
}
function validarProfesional(nombreProfesional) {
    if (profesionales.includes(nombreProfesional)) {
        return true;
    } else {
        return false;
    }
}


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
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión correcto',
                text: 'Datos validados con éxito'
            })
            localStorage.setItem("secretarioLogueadoLS", autenticado);
            login.style.display = "none";
            IniciaAgenda();
            ayudalogin.style.display = "none";
            profesionalesAyuda.style.display = "block";
        }  else {
            Swal.fire({
                icon: 'error',
                title: 'Datos incorrectos',
                text: 'Los datos no son validos'
            })
            formLogin.reset();
        }
    })
    login.appendChild(formLogin);
}

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
            Swal.fire({
                icon: 'success',
                title: 'Turno creado con éxito',
                text: 'El turno ha sido validado y se encuentra pendiente'
            })
            const turnoNuevo = new turnosReservados(nombrePaciente.value, dni.value, dia.value, horario.value, profesional.value);
            turnos.push(turnoNuevo);
            creadorTarjetasTurnos(turnoNuevo);
            LSAcutalizado();
            formAgenda.reset();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Profesional no encontrado',
                text: 'El profesional no coincide con la base de datos disponible'
            })
        }
    })
    agenda.appendChild(formAgenda);
}

function creadorTarjetasTurnos(turno) {
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
        Swal.fire({
            icon: 'warning',
            title: 'Quieres cancelar el turno?',
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('El turno ha sido cancelado', '', 'success')
                let index = turnos.indexOf(turno);
                if(index > -1){
                    turnos.splice(index, 1);
                    divTurnos.remove();
                    LSAcutalizado();
                }
            } else if (result.isDenied) {
                Swal.fire('El turno no ha sido cancelado', '', 'info')
            }
        })
    });

    divTurnos.appendChild(paciente);
    divTurnos.appendChild(dni);
    divTurnos.appendChild(dia);
    divTurnos.appendChild(horario);
    divTurnos.appendChild(profesional);
    divTurnos.appendChild(cancelarbttn);
    vitrina.appendChild(divTurnos);
}



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




//*Empieza la ejecución
profesionalesAyuda.style.display = "none";
vitrina.style.display = "none";
traerDatos();

if(secretarioLogueadoLS){
    console.log("logueado")
    ayudalogin.style.display = "none";
    IniciaAgenda();
    profesionalesAyuda.style.display = "block";
    vitrina.style.display = "block";
} else {
    Login();
}

recargaTurnos();