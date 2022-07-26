const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'dd95f714e3894ec599ff8a511ea37dfa',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        //Text to speech
        tellMe(joke);

        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
    }
}

//Event Listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);
