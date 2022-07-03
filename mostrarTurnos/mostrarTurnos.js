const getItems = () => {
    const item = localStorage.getItem('turnos');
    console.log('Obteniendo', item);
    return JSON.parse(item);
}

let turnos = getItems();
console.log(turnos)
mostrarTurnos(turnos);

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
    }
    
}