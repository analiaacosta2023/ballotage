function isEmpty(id) {
    const inputDiv = document.getElementById(id)
    const input = inputDiv.getElementsByTagName('input')[0]

    if (input.value.trim() === "") {
        if (inputDiv.querySelector('.error-line')) return true
        const errorLine = document.createElement('span')
        errorLine.innerHTML = 'Información requerida.'
        errorLine.classList.add('error-line', 'inline-flex', 'text-sm', 'text-rose-600')
        inputDiv.appendChild(errorLine)
        input.classList.remove('border-sky-600', 'bg-sky-100')
        input.classList.add('border-rose-600', 'bg-rose-100')
        return true
    }
    const errorLine = inputDiv.querySelector('.error-line')
    if (errorLine) {
        inputDiv.removeChild(errorLine)
        input.classList.remove('border-rose-600', 'bg-rose-100')
        input.classList.add('border-sky-600', 'bg-sky-100')
    }

    return false
}