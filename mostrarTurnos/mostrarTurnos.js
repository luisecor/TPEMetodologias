document.querySelector(".form-filtros").addEventListener("submit", filtrarTurnos);

const getItems = () => {
    const item = localStorage.getItem('turnos');
    console.log('Obteniendo', item);
    return JSON.parse(item);
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