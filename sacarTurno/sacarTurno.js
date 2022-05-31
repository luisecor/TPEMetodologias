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
        dia: "17/06",
        hora: 1500
    }, 

    {
        id: 2,
        idMedico: 1,
        dia: "17/06",
        hora: "16:00"
    },

    {
        id: 3,
        idMedico: 2,
        dia: "17/06",
        hora: "18:00"
    },

    {
        id: 4,
        idMedico: 2,
        dia: "17/06",
        hora: "16:00"
    },

    {
        id: 5,
        idMedico: 3,
        dia: "18/06",
        hora: "9:00"
    },

    {
        id: 6,
        idMedico: 3,
        dia: "20/06",
        hora: "8:00"
    },

    {
        id: 7,
        idMedico: 4,
        dia: "19/06",
        hora: "11:00"
    },

    {
        id: 8,
        idMedico: 4,
        dia: "19/06",
        hora: "10:00"
    }
]

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
mostrarEspecialidad()
document.getElementById("select-especialidad").addEventListener("change", buscarMedicos);
document.getElementById("select-medicos").addEventListener("change", atiendeObraSocial);
document.getElementById("select-obrasSociales").addEventListener("change", atiendeObraSocial);

function buscarTurnos() { //cuando selecciona el medico
    //agarra el medico
    //rango de fechas
    //mañana o tarde
    //busca los turnos que coincidan
    //mostrarTurnos(turnos) 
}

function buscarMedicos() { //la llame cuando ingresa la especialidad
    let especialidad = document.getElementById("select-especialidad").value;
    let medicosConEspecialidad = [];
    medicos.forEach(m => {
        if(m.especialidad == especialidad) {
            medicosConEspecialidad.push(m);
        }
    });

    mostrarMedicos(medicosConEspecialidad);
}

function mostrarMedicos(medicos){
    let select = document.getElementById("select-medicos");
    select.innerHTML = "<option value=''>Seleccione Medico</option>"
    medicos.forEach(e => {
        select.innerHTML += "<option id='" + e.id + "' value='"+e.nombre+"'>"+e.nombre+"</option>"
    });
}

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

function mostrarTurnos(turnos) {
    //mostrar turnos en el div de al lado
}