document.addEventListener('DOMContentLoaded', function() {
    let isEvilMode = localStorage.getItem('isEvilMode') === 'true';
    const bodyElement = document.body;
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    const containers = document.querySelectorAll('.container');
    const contactSection = document.getElementById('contact');
    // const socialIcons = document.querySelectorAll('.social-icon');

    applyCurrentMode();  // Apply the current mode when the page loads

    let typeItInstance = initializeTypeIt();
    typeItInstance.type("Welcome!").go();

    logo.addEventListener('click', function() {
        isEvilMode = !isEvilMode;
        localStorage.setItem('isEvilMode', isEvilMode); // Store mode in localStorage
        applyCurrentMode();  // Update classes when mode changes
        fetchJoke();  // Fetch new joke immediately when the mode is switched
    });

    function applyCurrentMode() {
        // Toggle the mode for main body and navbar
        bodyElement.classList.toggle('evil-mode', isEvilMode);
        bodyElement.classList.toggle('good-mode', !isEvilMode);
        navbar.classList.toggle('evil-mode', isEvilMode);
        navbar.classList.toggle('good-mode', !isEvilMode);
        
        if(logo){
            logo.classList.toggle('evil-mode', isEvilMode);
            logo.src = isEvilMode ? './assets/images/devil_MENACE.png' : './assets/images/angel_MENACE.png';
        }
        
        // Apply mode classes to each container
        containers.forEach(container => {
            container.classList.toggle('evil-mode', isEvilMode);
            container.classList.toggle('good-mode', !isEvilMode);
        });

        // Apply mode classes to contact section
        if (contactSection){
            contactSection.classList.toggle('evil-mode', isEvilMode);
            contactSection.classList.toggle('good-mode', !isEvilMode);
        }
        // Apply mode classes to social icons
        // socialIcons.forEach(icon => {
        //     icon.classList.toggle('evil-mode', isEvilMode);
        //     icon.classList.toggle('good-mode', !isEvilMode);
        // });
    }

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
    
    function fetchJoke() {
        let jokeQuery = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
        if(isEvilMode){
            jokeQuery = "https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart";
        }
        fetch(jokeQuery)
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
});