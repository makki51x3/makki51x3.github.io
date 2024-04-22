document.addEventListener('DOMContentLoaded', function() {
    // Initialize the TypeIt effect with a default message
    new TypeIt('#roastDisplay', {
        strings: ["Press 'Generate Roast' to start!"],
        speed: 30,
        loop: true
    });

    // Event listener for the roast generation button
    document.getElementById('generateBtn').addEventListener('click', fetchJoke);
});

function fetchJoke() {
    fetch('https://v2.jokeapi.dev/joke/Dark,Pun?type=single,twopart')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
            } else {
                // Create a new instance of TypeIt for displaying the joke
                new TypeIt('#roastDisplay', {
                    strings: [data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`],
                    speed: 50,
                    showCursor: false
                }).go();
            }
        })
        .catch(error => {
            document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
        });
}
