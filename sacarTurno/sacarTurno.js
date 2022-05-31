let medicos = [
    {
        id: 1,
        nombre: "Braulio Ponce",
        especialidad: "Traumatologo",
        obraSocial: ["Ioma", "Mutual Federada"],
        cobroDiferencial: 500,
    },
    {
        id: 2,
        nombre: "Agustin Jaureguiberry",
        especialidad: "Medico Clinico",
        obraSocial: [],
        cobroDiferencial: 100,
    },
    {
        id: 3,
        nombre: "Carlos Izquierdos",
        especialidad: "Otorrinolaringolo",
        obraSocial: ["Osde"],
        cobroDiferencial: 300,
    },
    {
        id: 4,
        nombre: "Marcos Rojo",
        especialidad: "Kinesiologo",
        obraSocial: ["Ioma"],
        cobroDiferencial: 1000,
    },
]

let turnos = [
    {
        id: 1,
        idMedico: 1,
        dia: "17/11/2022",
        hora: "15:00",
        rango: "tarde",
    }, 

    {
        id: 2,
        idMedico: 1,
        dia: "17/06/2022",
        hora: "16:00",
        rango: "tarde",
    },

    {
        id: 3,
        idMedico: 2,
        dia: "17/06/2022",
        hora: "18:00",
        rango: "tarde",
    },

    {
        id: 4,
        idMedico: 2,
        dia: "17/06/2022",
        hora: "16:00",
        rango: "tarde",
    },

    {
        id: 5,
        idMedico: 3,
        dia: "18/06/2022",
        hora: "09:00",
        rango: "mañana",
    },

    {
        id: 6,
        idMedico: 3,
        dia: "20/06/2022",
        hora: "08:00",
        rango: "mañana",
    },

    {
        id: 7,
        idMedico: 4,
        dia: "19/06/2022",
        hora: "11:00",
        rango: "mañana",
    },

    {
        id: 8,
        idMedico: 4,
        dia: "19/06/2022",
        hora: "10:00",
        rango: "mañana",
    }
]

//Funcion para agregar las especialidades de los medicos en el select de especialidades
function mostrarEspecialidad() {
    let especialidades = [];
    let select = document.getElementById("select-especialidad");
    medicos.forEach(m => {
        if(especialidades.indexOf(m.especialidad) < 0){
            especialidades.push(m.especialidad);
        }
    });

    especialidades.forEach(e => {
        select.innerHTML += "<option value='"+e+"'>"+e+"</option>"
    });
}

//Funcion para agregar las obras sociales de los medicos en el select de obras sociales para elegir la del paciente. 
//En caso que paciente no tenga obra social o no coincida con la que trabajan los medicos se le da la opcion de elegir sin obra social
function mostrarObrasSociales() {
    let obrasSociales = [];
    let select = document.getElementById("select-obrasSociales");
    medicos.forEach(m => {
        m.obraSocial.forEach(os => {
            if(obrasSociales.indexOf(os) < 0){
               obrasSociales.push(os);
            }
        });
        
        /* if(especialidades.indexOf(m.especialidad) < 0){
            especialidades.push(m.especialidad);
        } */
    });

   obrasSociales.forEach(os => {
        document.getElementById("select-obrasSociales").innerHTML += "<option value='"+os+"'>"+os+"</option>"
    });
}

mostrarObrasSociales();
mostrarEspecialidad();

//Funcion para poner en el input date fecha inicial la fecha del dia,
// y en el input date fecha final un maximo de 30 dias
function modificarRangoFecha() {
    let fecha = new Date();
    let anio = fecha.getFullYear();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    
    if(dia<10) {
        dia='0'+dia; //agrega cero si el menor de 10
    }
    if(mes<10) {
        mes='0'+mes //agrega cero si el menor de 10
    }

    let fInicial = document.getElementById("fechaInicial");
    fInicial.value = anio+"-"+mes+"-"+dia;
    
    let fFinal = document.getElementById("fechaFinal");
    let fMaxima = agregarDiasAFecha(fecha, 30);
    let anioMax = fMaxima.getFullYear();
    let diaMax = fMaxima.getDate();
    let mesMax = fMaxima.getMonth() + 1;
    if(diaMax<10) {
        diaMax='0'+diaMax; //agrega cero si el menor de 10
    }
    if(mesMax<10) {
        mesMax='0'+mesMax //agrega cero si el menor de 10
    }
    let fechaMaxima = anioMax+"-"+mesMax+"-"+diaMax;;
    fFinal.value = fechaMaxima;
    fFinal.max = fechaMaxima;
}

//Funcion para sumarle dias a la fecha inicial y que se forme el rango de fecha final 
function agregarDiasAFecha(fecha, dias){
    let res = new Date(fecha);
    res.setDate(res.getDate() + dias);
    return res;
}



modificarRangoFecha();


document.getElementById("select-especialidad").addEventListener("change", buscarMedicos);
document.getElementById("select-medicos").addEventListener("change", atiendeObraSocial);
document.getElementById("select-obrasSociales").addEventListener("change", atiendeObraSocial);
document.querySelector(".form-filtros").addEventListener("submit", buscarTurnos);
document.getElementById("btn-continuar").addEventListener("click", confirmarDatos);
document.getElementById("btn-cancelar-confirmacion").addEventListener("click", () => {
    document.getElementById("confirmar-turno").style = "display:none";
})
document.getElementById("btn-confirmar-turno").addEventListener("click", () => {
    document.getElementById("div-gral").style = "display: none";
    document.getElementById("confirmar-turno").style = "display:none";
    document.getElementById("aviso-confirmacion").style = "display: flex";
})

//Cuando aprieta el boton buscar turno busca los turnos coincidentes con los filtros aplicados
function buscarTurnos(e) {
    e.preventDefault();
    let turnosDelMedico = [];
    //agarra el medico
    let med = document.getElementById("select-medicos").value;
    //rango de fechas
    let fInicial = document.getElementById("fechaInicial").value;
    let fFinal = document.getElementById("fechaFinal").value;
    //mañana o tarde
    let momentoDia = document.querySelector('input[name="rangoDia"]:checked').value
    
    let infoCompletaMedico = medicos.find(m => m.nombre == med);
    turnos.map( function(t) {
        if(t.idMedico == infoCompletaMedico.id){
            turnosDelMedico.push(t);
        }
    } );
    
    //console.log("buscando turnos del medico: " + med + " entre la fecha "+fInicial+ " y la fecha " + fFinal + " en el turno " +momentoDia);
    chequearTurnos(turnosDelMedico);
    //mostrarTurnos(turnos) 
}

//Busca los medicos segun la especialidad seleccionada 
function buscarMedicos() {
    let especialidad = document.getElementById("select-especialidad").value;
    let medicosConEspecialidad = [];
    medicos.forEach(m => {
        if(m.especialidad == especialidad) {
            medicosConEspecialidad.push(m);
        }
    });

    mostrarMedicos(medicosConEspecialidad);
}

//Agrega en el select de medicos los medicos recibidos por parametros por la funcion buscarMedicos
function mostrarMedicos(medicos){
    let select = document.getElementById("select-medicos");
    select.innerHTML = "<option value=''>Seleccione Medico</option>"
    medicos.forEach(e => {
        select.innerHTML += "<option id='" + e.id + "' value='"+e.nombre+"'>"+e.nombre+"</option>"
    });
}

//Corrobora si el medico seleccionado atiende la obtra social seleccionada para poder establecer si tiene que pagar
function atiendeObraSocial() {
    let obraSociale = document.getElementById("select-obrasSociales").value;
    let idMedico = document.getElementById("select-medicos").value;
    let medico = medicos.find(m => m.nombre == idMedico);
    
    if(medico.obraSocial.indexOf(obraSociale) < 0 || obraSociale == "sinObra") {
        document.getElementById("avisoDiferencial").innerHTML = "El medico no trabaja con la obra social seleccionada. Debera pagar: $" + medico.cobroDiferencial;
    } else {
        document.getElementById("avisoDiferencial").innerHTML = "";
    }

}

//Recibe turnos y filtra los que cumplen con los filtros aplicados 
function chequearTurnos(turnos) {
    let turnosCumplen = [];

    //rango de fechas
    let fInicial = document.getElementById("fechaInicial").value;
    let fFinal = document.getElementById("fechaFinal").value;
    
    //mañana o tarde
    let momentoDia = document.querySelector('input[name="rangoDia"]:checked').value
    
    turnos.forEach(t => {
        let fechaTurnoObject = t.dia.split("/");
        let fechaTurno = new Date(fechaTurnoObject[2],fechaTurnoObject[1] - 1,fechaTurnoObject[0]);
        let fechaMinima = new Date(fInicial);
        let fechaMaxima = new Date(fFinal);

        if( (t.rango == momentoDia) && 
                (fechaTurno.getTime() > fechaMinima.getTime() && fechaTurno.getTime() < fechaMaxima.getTime())) {
            turnosCumplen.push(t);
        }
    });
    mostrarTurnos(turnosCumplen);
}

//Muestra los turnos que cumplen con los filtros
function mostrarTurnos(turnos) {
    let div = document.querySelector(".listado-turnos");

    div.innerHTML = "";
    console.log(turnos);
    if(turnos.length > 0){

        turnos.forEach(t => {
            div.innerHTML += "<div class='turno'>"+
            "<p class='turnoIndividual'>"+"Turno el dia " + t.dia + " a las " +t.hora+"</p>"+
            "<input data-role='"+t.id+"'name='turnoLibre' class='turnoElegido' type='radio'>"+
            "</div>";
        });
    }
    
}

//Obtiene los datos del turno y muestra para reconfirmar
function confirmarDatos() {
    
    let turnoSeleccionado = document.querySelector('input[name=turnoLibre]:checked');
    
    if(turnoSeleccionado != null) {
        let turno = turnos.find(t => t.id == turnoSeleccionado.dataset.role); 
        let paciente = document.getElementById("input-dniPaciente");
        let obraSociale = document.getElementById("select-obrasSociales").value;
        let idMedico = document.getElementById("select-medicos").value;
        let medico = medicos.find(m => m.nombre == idMedico);

        document.getElementById("confirmar-turno").style = "display: flex";
        document.getElementById("turnoAConfirmar").innerHTML =  "<h4>Paciente: " + paciente.value + "</h4>" +
        "<p> Turno el dia " + turno.dia + " a las " +turno.hora + "</p>";
        if(medico.obraSocial.indexOf(obraSociale) < 0 || obraSociale == "sinObra") {
            document.getElementById("turnoAConfirmar").innerHTML += "Cobro diferencial: $" + medico.cobroDiferencial;
        } 
    } else {
        alert("Debes seleccionar un turno");
    }
    
}