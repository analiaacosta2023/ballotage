// Dato hardcodeado
const fechaCierre = new Date('2024-01-14')

const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const noEmail = isEmpty('email-input')
    const noPass = isEmpty('password-input')

    if (noEmail || noPass) return

    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('http://localhost:8080/v1/login', {
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

            if (fechaCierre > new Date()) {
                window.location.replace('./dashboard.html')
            } else {
                window.location.replace('./result.html')
            }

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