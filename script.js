document.addEventListener('DOMContentLoaded', function() {
    let typeItInstance = new TypeIt('#roastDisplay', {
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    });

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    // Reset and prepare the TypeIt instance
                    if (typeItInstance) {
                        typeItInstance.reset();
                    }

                    // Handling jokes with two parts split by "..."
                    if (jokeText.includes("...")) {
                        const parts = jokeText.split("...");
                        // Initialize TypeIt with the first part
                        typeItInstance.type(parts[0]).exec(() => {
                            // Wait a random delay before typing the second part
                            setTimeout(() => {
                                typeItInstance.options({startDelay: 500}).type(parts[1]).go();
                            }, getRandomDelay());
                        }).go();
                    } else {
                        // Directly type the whole joke if there's no "..."
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
