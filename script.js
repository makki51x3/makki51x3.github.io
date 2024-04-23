document.addEventListener('DOMContentLoaded', function() {
    let typeItInstance = null;
    let synth = window.speechSynthesis; // Get the speech synthesis object

    function initializeTypeIt() {
        return new TypeIt('#roastDisplay', {
            startDelay: 500,
            typeSpeed: 50,
            backSpeed: 25,
            loop: false,
            afterComplete: function(instance) {
                // Check if speech is enabled
                if (document.getElementById('speakCheckbox').checked) {
                    speak(instance.strings.join(' '));
                }
                instance.destroy(); // Optionally reset the instance here
            }
        });
    }

    function speak(text) {
        if (synth.speaking) {
            console.error('SpeechSynthesis is already speaking.');
            return;
        }
        let utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    }

    function fetchJoke() {
        fetch('https://v2.jokeapi.dev/joke/Dark,Spooky?type=single,twopart')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('roastDisplay').innerText = "Failed to fetch a joke.";
                } else {
                    const jokeText = data.type === 'single' ? data.joke : `${data.setup} ... ${data.delivery}`;

                    if (typeItInstance) {
                        typeItInstance.destroy();
                    }

                    typeItInstance = initializeTypeIt();

                    if (jokeText.includes("...")) {
                        const parts = jokeText.split("...");
                        typeItInstance.type(parts[0])
                            .pause(getRandomDelay())
                            .type(parts[1])
                            .go();
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

    // Fetch and display a joke immediately on load
    fetchJoke();

    // Event listener for the roast generation button to fetch and display a new joke
    document.getElementById('generateBtn').addEventListener('click', fetchJoke);
});

// Function to generate a random delay between 1 to 2 seconds, returning milliseconds
function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 1000; // Random delay between 1000 and 2000 ms
}
