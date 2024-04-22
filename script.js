document.addEventListener('DOMContentLoaded', function() {
    let typeItInstance = null;

    // Fetch and display a joke immediately on load
    fetchJoke();

    // Event listener for the roast generation button to fetch and display a new joke
    document.getElementById('generateBtn').addEventListener('click', fetchJoke);

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    // Clear the current text before displaying new joke
                    document.getElementById('roastDisplay').innerText = "";

                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    // If TypeIt instance already exists, destroy it before creating a new one
                    if (typeItInstance) {
                        typeItInstance.destroy();
                    }

                    // Check if "..." exists in the joke text
                    if (jokeText.includes("...")) {
                        // Split the joke text into parts before and after "..."
                        const [beforeDots, afterDots] = jokeText.split("...");

                        // Initialize a new TypeIt instance with the text before "..."
                        typeItInstance = new TypeIt('#roastDisplay', {
                            strings: [beforeDots],
                            startDelay: 500,
                            typeSpeed: 50,
                            backSpeed: 25,
                            loop: false
                        });

                        // Add debugging statement to check the split parts
                        console.log("Before dots:", beforeDots);
                        console.log("After dots:", afterDots);

                        // Continue typing the text after "..." with a random delay
                        setTimeout(() => {
                            typeItInstance.type(afterDots).go();
                        }, getRandomDelay());
                    } else {
                        // If "..." is not found, initialize TypeIt instance directly
                        typeItInstance = new TypeIt('#roastDisplay', {
                            strings: [jokeText],
                            startDelay: 500,
                            typeSpeed: 50,
                            backSpeed: 25,
                            loop: false
                        }).go();
                    }
                }
            })
            .catch(error => {
                document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
                console.error("Fetch error:", error);
            });
    }

    // Function to generate a random delay between 1 to 3 seconds
    function getRandomDelay() {
        return Math.floor(Math.random() * 2000) + 1000; // Random number between 1000ms to 3000ms (1 to 3 seconds)
    }
});
