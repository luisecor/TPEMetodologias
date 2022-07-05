document.querySelector(".form-filtros").addEventListener("submit", filtrarTurnos);



const getItems = () => {
    const item = turnos;
    console.log('Obteniendo', item);
    return (item);
}


function filtrarTurnos(event) {
    event.preventDefault();
    
    let turnosCumplen = [];
    let turnos = getItems();
    console.log(turnos);

    //rango de fechas
    let fInicial = document.getElementById("fechaInicial").value;
    let fFinal = document.getElementById("fechaFinal").value;
    
    //mañana o tarde
    let momentoDia = document.querySelector('input[name="rangoDia"]:checked').value

    //medico seleccionado

    let idMedico = document.querySelector("#select-medicos").value;

    console.log(idMedico);

        
    
    if(turnos.length < 1) {
        console.log("No existen turnos");
    } else {
        turnos.forEach(t => {
            let fechaTurnoObject = t.turno.dia.split("/");
            let fechaTurno = new Date(fechaTurnoObject[2],fechaTurnoObject[1] - 1,fechaTurnoObject[0]);
            let fechaMinima = new Date(fInicial);
            let fechaMaxima = new Date(fFinal);

            if( (t.turno.rango == momentoDia) && 
                    (fechaTurno.getTime() > fechaMinima.getTime() && fechaTurno.getTime() < fechaMaxima.getTime())) {
                turnosCumplen.push(t);
            }
        });
    }

    
    mostrarTurnos(turnosCumplen);
}

function mostrarTurnos(turnos) {
    
    let div = document.querySelector(".listado-turnos");

    div.innerHTML = "";
    if(turnos.length > 0){

        turnos.forEach(t => {
            div.innerHTML += "<div class='turno'>"+
            "<p class='turnoIndividual'>"+"Turno el dia " + t.turno.dia + " a las " +t.turno.hora+
            " con el medico " + t.medico + " con paciente DNI N°: " +t.paciente+"</p>"+
            "</div>";
            //"<input data-role='"+t.id+"'name='turnoLibre' class='turnoElegido' type='radio'>"+
        });
    } else {
        div.innerHTML = "<p>No existen turnos con esos filtros</p>";
    }
    
}

let medicos = [
    {
        id: 1,
        nombre: "Braulio Ponce",
        especialidad: "Kinesiologo",
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
        especialidad: "Traumatologo",
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
    },

    {
        id: 9,
        idMedico: 2,
        dia: "19/06/2022",
        hora: "11:00",
        rango: "mañana",
    },

    {
        id: 10,
        idMedico: 1,
        dia: "19/06/2022",
        hora: "10:00",
        rango: "mañana",
    },

    {
        id: 11,
        idMedico: 4,
        dia: "19/06/2022",
        hora: "10:00",
        rango: "tarde",
    },

    {
        id: 12,
        idMedico: 2,
        dia: "19/06/2022",
        hora: "11:00",
        rango: "tarde",
    },

    {
        id: 13,
        idMedico: 1,
        dia: "19/06/2022",
        hora: "10:00",
        rango: "tarde",
    },
]