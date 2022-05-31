let form = document.querySelector('#formLogin');

if (form)
    form.addEventListener('submit',login);

let usuarios = [ 
    {
        "id" : 1,
        "userEmail" : "luis_ecor@hotmail.com",
        "password" : 123456
    }
];


function login(e){
    e.preventDefault();

    let formData = new FormData(form);

    let email = formData.get('userEmail');
    let pass = formData.get('password');

    if (usuarios.find(user => (user.userEmail == email && user.password == pass))) {
        Toast.fire({
            icon:   'success',
            title: 'Ingresando al sistema',
            willClose:() =>  {window.location.href  = "/TPEMetodologias/menu_secretaria.html"} // para redirigir
        })
        
    } else
    Toast.fire({
        icon:   'error',
        title: 'Usuario o contraseña erroneos'
    })

  
}


let anchorPaciente = document.querySelector("#soyPaciente");

if (anchorPaciente)
anchorPaciente.addEventListener('click', (e) =>{
    e.preventDefault();
    Toast.fire({
        icon:   'warning',
        title:  'En construccion'
    })
})



const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  
  

