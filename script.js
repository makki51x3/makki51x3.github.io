document.addEventListener('DOMContentLoaded', function() {
    let isEvilMode = false;
    const bodyElement = document.body;
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    const containers = document.querySelectorAll('.container');
    const contactSection = document.getElementById('contact');

    logo.addEventListener('click', function() {
        isEvilMode = !isEvilMode;
        if (isEvilMode) {
            bodyElement.classList.add('evil-mode');
            navbar.classList.add('evil-mode');
            logo.classList.add('evil-mode');
            containers.forEach(container => container.classList.add('evil-mode'));
            contactSection.classList.add('evil-mode');
            logo.src = './assets/images/devil_MENACE.png';
        } else {
            bodyElement.classList.remove('evil-mode');
            navbar.classList.remove('evil-mode');
            logo.classList.remove('evil-mode');
            containers.forEach(container => container.classList.remove('evil-mode'));
            contactSection.classList.remove('evil-mode');
            logo.src = './assets/images/angel_MENACE.png';
        }
    });

    let typeItInstance = initializeTypeIt();
    typeItInstance.type("Welcome!").go();

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;
                    document.getElementById('roastDisplay').innerHTML = "";
                    if (typeItInstance) {
                        typeItInstance.destroy();
                    }
                    typeItInstance = initializeTypeIt();
                    if (jokeText.includes("...")) {
                        const parts = jokeText.split("...");
                        typeItInstance.type(parts[0]).pause(getRandomDelay()).type(parts[1]).go();
                    } else {
                        typeItInstance.type(jokeText).go();
                    }
                }
            })
            .catch(error => {
                document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
                console.error("Fetch error:", error);
            });
    }

    setInterval(fetchJoke, 20000); // Fetches a joke every 20 seconds

    function initializeTypeIt() {
        return new TypeIt('#roastDisplay', {
            startDelay: 1000,
            typeSpeed: 50,
            backSpeed: 25,
            loop: false
        });
    }

    function getRandomDelay() {
        return Math.floor(Math.random() * 1000) + 1000;
    }
});
