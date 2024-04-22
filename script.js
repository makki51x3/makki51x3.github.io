document.addEventListener('DOMContentLoaded', function() {
    let typeItInstance = new TypeIt('#roastDisplay', {
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false,
        afterComplete: function (instance) {
            instance.destroy();
        }
    });

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    // Check if the TypeIt instance is already initialized
                    if (typeItInstance) {
                        typeItInstance.reset();
                    }

                    // Delay handling and initialization of TypeIt
                    typeItInstance = new TypeIt('#roastDisplay', {
                        startDelay: 500,
                        typeSpeed: 25,
                        afterComplete: function (instance) {
                            if (jokeText.includes("...")) {
                                const parts = jokeText.split("...");
                                setTimeout(function() {
                                    instance.empty().type(parts[1]).go();
                                }, getRandomDelay());
                            }
                        }
                    });

                    if (jokeText.includes("...")) {
                        // Type the first part and handle the rest in afterComplete
                        typeItInstance.type(jokeText.split("...")[0]).go();
                    } else {
                        // If there's no delay, just type the joke
                        typeItInstance.type(jokeText).go();
                    }
                }
            })
            .catch(error => {
                document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
                console.error("Fetch error:", error);
            });
    }

    // Fetch and display a joke immediately on load
    fetchJoke();

    // Event listener for the roast generation button to fetch and display a new joke
    document.getElementById('generateBtn').addEventListener('click', fetchJoke);
});

// Function to generate a random delay between 1 to 2 seconds
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Random delay between 1000 and 2000 ms
}
