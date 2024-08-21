const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector("#sound");
const btn = document.querySelector("#search-btn");
const input = document.querySelector("#inp-word");

const searchEngine = async () => {
    try {
        const inpWord = input.value;
        const response = await fetch(`${url}${inpWord}`);
        const data = await response.json();
        console.log(data);
        // Destructuring 
        const [first, ...rest] = data;
        console.log(first);
        const { phonetic, phonetics, meanings } = first;
        const [{ partOfSpeech, definitions }] = meanings;
        const [a,] = definitions;
        const { definition, example } = a;
        const { [phonetics.length - 1]: lastEl } = phonetics;
        const { audio } = lastEl;
        result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fa fa-microphone" aria-hidden="true"></i>
                </button>
            </div>
            <div class="details">
                <p>${partOfSpeech}</p>
                <p>/${phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${definition}
            </p>
            <p class="word-example">
                ${example || ""}
            </p>`;
        sound.setAttribute('src', `https:${audio}`);
        const playSound = () => {
            sound.play();
        };
    } catch (error) {
        result.innerHTML = `<h3 class="error">${error}</h3>`
    };
};
btn.addEventListener("click", searchEngine);