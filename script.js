document.getElementById('generateBtn').addEventListener('click', function() {
    // Fetching jokes from the "Dark" and "Pun" categories with both "Single" and "Twopart" types
    fetch('https://v2.jokeapi.dev/joke/Dark,Pun?type=single,twopart')
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
            } else {
                // Displaying the joke or setup and delivery based on type
                if (data.type === 'single') {
                    document.getElementById('roastDisplay').innerText = data.joke;
                } else if (data.type === 'twopart') {
                    document.getElementById('roastDisplay').innerText = `${data.setup} ... ${data.delivery}`;
                }
            }
        })
        .catch(error => {
            document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
        });
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the Typed.js effect
    var typed = new Typed('#roastDisplay', {
        strings: ["Press 'Generate Roast' to start!"],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true
    });

    // Automatically fetch a joke on page load
    fetchJoke();

    // Event listener for the roast generation button
    document.getElementById('generateBtn').addEventListener('click', function() {
        fetchJoke();
    });
});

function fetchJoke() {
    fetch('https://v2.jokeapi.dev/joke/Dark,Pun?type=single,twopart')
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
            } else {
                // Stop the current Typed.js animation
                if (typed) {
                    typed.destroy();
                }
                // Displaying the joke or setup and delivery based on type
                if (data.type === 'single') {
                    new Typed('#roastDisplay', {
                        strings: [data.joke],
                        typeSpeed: 50,
                        showCursor: false
                    });
                } else if (data.type === 'twopart') {
                    new Typed('#roastDisplay', {
                        strings: [data.setup + ' ... ' + data.delivery],
                        typeSpeed: 50,
                        showCursor: false
                    });
                }
            }
        })
        .catch(error => {
            document.getElementById('roastDisplay').innerText = "Error fetching a joke.";
        });
}
