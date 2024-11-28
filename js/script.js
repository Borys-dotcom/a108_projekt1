document.querySelector('.hamburger-icon').addEventListener("click", () => {
    document.querySelector('.actual-menu').classList.toggle('visibility');
});

document.querySelector('.menu-close-icon').addEventListener("click", () => {
    document.querySelector('.actual-menu').classList.toggle('visibility');
});

document.querySelector('section.appointment form.appointment-form button[type="submit"]').addEventListener('click', (obj) => {
    obj.preventDefault();

    let messageParagraph = document.querySelector('.appointment-message');

    if (getMessage() !== undefined){
        fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(getMessage()),
        })
        .then(res => res.json())
        .then(resJSON => {
            console.log(resJSON);
            messageParagraph.classList.add('return-data');
            messageParagraph.innerText = "Your appointment message has been sent.";
        });
    }

    

});

function getMessage() {
    let appointmentData = document.querySelectorAll('.form-field');

    let messageParagraph = document.querySelector('.appointment-message');

    let appointmentMessage = {
        name: appointmentData[0].value,
        email: appointmentData[1].value,
        service: appointmentData[2].value,
        phone: appointmentData[3].value,
        date: appointmentData[4].value,
        time: appointmentData[5].value,
        message: appointmentData[6].value,
    }

    let errorMessage = false;

    appointmentData.forEach(member => {
        if (member.value === "") {
            errorMessage = true;
            member.classList.add('error');
            messageParagraph.classList.add('error');
            messageParagraph.classList.remove('return-data');
            messageParagraph.innerText = "Fill all necessary data!";
            console.log("error");
        } 
        else {
            member.classList.remove('error');
            messageParagraph.classList.remove('error');
            messageParagraph.classList.remove('return-data');
            messageParagraph.innerText = "";
            console.log("no error");
        }
    });

    if (!errorMessage) return appointmentMessage;
}