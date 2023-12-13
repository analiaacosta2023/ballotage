
const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const noName = isEmpty('nombre-input')
    const noLastName = isEmpty('apellido-input')
    const noEmail = isEmpty('email-input')
    const noPass = isEmpty('password-input')
    const noPass2 = isEmpty('password2-input')

    if (noName || noLastName || noEmail || noPass || noPass2) return

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    if(obj.Password != obj.Password2) {
        passwordError()
        return
    }

    fetch('http://localhost:8080/v1/user', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 27738
        }
    }).then(async (result) => {

        const data = await result.json()
        console.log(data)
        if (result.status === 200) {

            Swal.fire({
                title: "Registro realizado con éxito!",
                icon: "success"
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.replace('./index.html')
                }
              });
                

        } else {
            console.log(data)
            return data.then(errorData => {
                throw new Error(errorData.error);
            });
        }
    })
        .catch(error => {

            Swal.fire({
                toast: true,
                position: "top-right",
                text: "Error: " + error.message,
                timer: 10000,
                showConfirmButton: false
            });
        })
    form.reset();
})

function passwordError() {
    const inputDiv = document.getElementById('password2-input')
    const input = inputDiv.getElementsByTagName('input')[0]


        if (inputDiv.querySelector('.error-line')) return
        const errorLine = document.createElement('span')
        errorLine.innerHTML = 'Las contraseñas ingresadas no son iguales'
        errorLine.classList.add('error-line', 'inline-flex', 'text-sm', 'text-rose-600')
        inputDiv.appendChild(errorLine)
        input.classList.remove('border-sky-600', 'bg-sky-100')
        input.classList.add('border-rose-600', 'bg-rose-100')
        return
}