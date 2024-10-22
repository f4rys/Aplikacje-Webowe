document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let errorMessages = [];

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessages.push('Proszę podać prawidłowy adres e-mail.');
    }

    if (message.trim() === '') {
        errorMessages.push('Proszę wpisać wiadomość.');
    }

    let errorMessagesDiv = document.getElementById('error-messages');
    if (errorMessages.length > 0) {
        errorMessagesDiv.innerHTML = errorMessages.join('<br>');
    } else {
        errorMessagesDiv.innerHTML = '';
        alert('Formularz został pomyślnie wysłany!');
    }
});