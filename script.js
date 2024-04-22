document.addEventListener('DOMContentLoaded', function() {
    // Initialize TypeIt instance globally if it will be used more than once
    let typeItInstance = new TypeIt('#roastDisplay', {
        startDelay: 500,
        typeSpeed: 50,
        backSpeed: 25,
        loop: false
    });

    // Fetch and display a joke immediately on load
    fetchJoke();

    // Event listener for the roast generation button to fetch and display a new joke
    document.getElementById('generateBtn').addEventListener('click', function() {
        fetchJoke();
    });

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;
                    
                    // Reset the TypeIt instance before displaying new text
                    typeItInstance.reset().pause(500).type(jokeText).go();
                }
            })
            .catch(error => {
                document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
                console.error("Fetch error:", error);
            });
    }
});
