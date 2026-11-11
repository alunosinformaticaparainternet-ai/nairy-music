```javascript
/* =========================================================
   NAIRY MUSIC
   SCRIPT.JS
========================================================= */


/* =========================================================
   BANCO DE MÚSICAS
========================================================= */

const songs = [

    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Nairy Music",
        genre: "Pop",
        mood: "Relaxar",
        duration: "3:42",
        coverOne: "#b875ff",
        coverTwo: "#4f39d5",
        icon: "fa-moon",
        audio: ""
    },

    {
        id: 2,
        title: "Electric Heart",
        artist: "Luna Waves",
        genre: "Eletrônica",
        mood: "Energia",
        duration: "3:18",
        coverOne: "#ff4ecd",
        coverTwo: "#6a35ff",
        icon: "fa-bolt",
        audio: ""
    },

    {
        id: 3,
        title: "Golden Roads",
        artist: "The Travelers",
        genre: "Rock",
        mood: "Energia",
        duration: "4:05",
        coverOne: "#ffb347",
        coverTwo: "#ff5f6d",
        icon: "fa-road",
        audio: ""
    },

    {
        id: 4,
        title: "Ocean Eyes",
        artist: "Blue Horizon",
        genre: "R&B",
        mood: "Relaxar",
        duration: "3:51",
        coverOne: "#00c6ff",
        coverTwo: "#0072ff",
        icon: "fa-water",
        audio: ""
    },

    {
        id: 5,
        title: "Cidade em Chamas",
        artist: "Nova Era",
        genre: "Hip Hop",
        mood: "Foco",
        duration: "3:27",
        coverOne: "#ff416c",
        coverTwo: "#ff4b2b",
        icon: "fa-city",
        audio: ""
    },

    {
        id: 6,
        title: "Café da Manhã",
        artist: "Sol & Som",
        genre: "MPB",
        mood: "Relaxar",
        duration: "3:36",
        coverOne: "#f6d365",
        coverTwo: "#fda085",
        icon: "fa-mug-hot",
        audio: ""
    },

    {
        id: 7,
        title: "Neon Lights",
        artist: "Future Pulse",
        genre: "Eletrônica",
        mood: "Festa",
        duration: "4:12",
        coverOne: "#00f2fe",
        coverTwo: "#4facfe",
        icon: "fa-lightbulb",
        audio: ""
    },

    {
        id: 8,
        title: "Broken Strings",
        artist: "Silver Tone",
        genre: "Rock",
        mood: "Relaxar",
        duration: "3:55",
        coverOne: "#8e9eab",
        coverTwo: "#eef2f3",
        icon: "fa-guitar",
        audio: ""
    },

    {
        id: 9,
        title: "Dream Again",
        artist: "Nairy Music",
        genre: "Pop",
        mood: "Foco",
        duration: "3:14",
        coverOne: "#c471ed",
        coverTwo: "#12c2e9",
        icon: "fa-cloud",
        audio: ""
    },

    {
        id: 10,
        title: "Noite Tropical",
        artist: "Maré Alta",
        genre: "MPB",
        mood: "Festa",
        duration: "3:44",
        coverOne: "#43e97b",
        coverTwo: "#38f9d7",
        icon: "fa-sun",
        audio: ""
    },

    {
        id: 11,
        title: "Bass Universe",
        artist: "DJ Orion",
        genre: "Eletrônica",
        mood: "Energia",
        duration: "5:02",
        coverOne: "#7f00ff",
        coverTwo: "#e100ff",
        icon: "fa-volume-high",
        audio: ""
    },

    {
        id: 12,
        title: "Words & Rhythm",
        artist: "MC Nova",
        genre: "Hip Hop",
        mood: "Foco",
        duration: "3:33",
        coverOne: "#232526",
        coverTwo: "#414345",
        icon: "fa-microphone",
        audio: ""
    }

];


/* =========================================================
   ESTADO DA APLICAÇÃO
========================================================= */

let state = {

    currentSongIndex: 0,

    isPlaying: false,

    shuffle: false,

    repeat: false,

    volume: 0.7,

    favorites:
        JSON.parse(
            localStorage.getItem("nairyFavorites")
        ) || [],

    gamesPlayed:
        Number(
            localStorage.getItem("nairyGamesPlayed")
        ) || 0,

    minutes:
        Number(
            localStorage.getItem("nairyMinutes")
        ) || 0,

    playlists:
        JSON.parse(
            localStorage.getItem("nairyPlaylists")
        ) || []

};


/* =========================================================
   ELEMENTOS
========================================================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const musicGrid =
    document.getElementById("musicGrid");

const searchInput =
    document.getElementById("searchInput");

const playBtn =
    document.getElementById("playBtn");

const heroPlay =
    document.getElementById("heroPlay");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

const heroNext =
    document.getElementById("heroNext");

const heroPrev =
    document.getElementById("heroPrev");

const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const playerTitle =
    document.getElementById("playerTitle");

const playerArtist =
    document.getElementById("playerArtist");

const heroSongTitle =
    document.getElementById("heroSongTitle");

const heroArtist =
    document.getElementById("heroArtist");

const playerCover =
    document.getElementById("playerCover");

const heroCover =
    document.getElementById("heroCover");

const playerFavorite =
    document.getElementById("playerFavorite");

const heroSongs =
    document.getElementById("heroSongs");

const favoriteCount =
    document.getElementById("favoriteCount");

const statFavorites =
    document.getElementById("statFavorites");

const statGames =
    document.getElementById("statGames");

const statMinutes =
    document.getElementById("statMinutes");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderSongs();

        loadSong(0);

        updateStatistics();

        setupNavigation();

        setupCategories();

        setupSearch();

        setupPlayer();

        setupTheme();

        setupModals();

        setupMoods();

        setupQuiz();

        setupContact();

        setupPlaylist();

        setupMobileMenu();

        setupScrollAnimations();

        restoreTheme();

    }
);


/* =========================================================
   RENDERIZAR MÚSICAS
========================================================= */

function renderSongs(
    filteredSongs = songs
) {

    musicGrid.innerHTML = "";

    if (filteredSongs.length === 0) {

        musicGrid.innerHTML = `

            <div
                style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:60px;
                    color:var(--text-secondary);
                "
            >

                <i
                    class="fa-solid fa-music"
                    style="
                        font-size:35px;
                        margin-bottom:15px;
                    "
                ></i>

                <h3>
                    Nenhuma música encontrada.
                </h3>

                <p>
                    Tente pesquisar outro nome.
                </p>

            </div>

        `;

        return;

    }


    filteredSongs.forEach(
        (song) => {

            const isFavorite =
                state.favorites.includes(song.id);


            const card =
                document.createElement("article");


            card.className =
                "music-card fade-in";


            card.innerHTML = `

                <div
                    class="music-cover"
                    style="
                        --cover-one:${song.coverOne};
                        --cover-two:${song.coverTwo};
                    "
                >

                    <i
                        class="fa-solid ${song.icon}"
                    ></i>

                    <button
                        class="music-play"
                        data-play="${song.id}"
                        title="Tocar"
                    >
                        <i class="fa-solid fa-play"></i>
                    </button>

                </div>


                <div class="music-info">

                    <h3>
                        ${song.title}
                    </h3>

                    <p>
                        ${song.artist}
                    </p>

                </div>


                <div class="music-bottom">

                    <span class="music-genre">
                        ${song.genre}
                    </span>

                    <button
                        class="
                            favorite-button
                            ${isFavorite ? "active" : ""}
                        "
                        data-favorite="${song.id}"
                        title="Favoritar"
                    >

                        <i
                            class="
                                fa-${
                                    isFavorite
                                    ? "solid"
                                    : "regular"
                                }
                                fa-heart
                            "
                        ></i>

                    </button>

                </div>

            `;


            musicGrid.appendChild(card);

        }
    );


    document
        .querySelectorAll("[data-play]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.play
                            );

                        playSongById(id);

                    }
                );

            }
        );


    document
        .querySelectorAll("[data-favorite]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();

                        const id =
                            Number(
                                button.dataset.favorite
                            );

                        toggleFavorite(id);

                    }
                );

            }
        );

}


/* =========================================================
   CARREGAR MÚSICA
========================================================= */

function loadSong(index) {

    if (
        index < 0 ||
        index >= songs.length
    ) {

        index = 0;

    }


    state.currentSongIndex = index;


    const song =
        songs[state.currentSongIndex];


    playerTitle.textContent =
        song.title;

    playerArtist.textContent =
        song.artist;

    heroSongTitle.textContent =
        song.title;

    heroArtist.textContent =
        song.artist;


    updateCover(
        playerCover,
        song
    );

    updateCover(
        heroCover,
        song
    );


    updateFavoriteButton();


    if (song.audio) {

        audioPlayer.src =
            song.audio;

    }

    else {

        audioPlayer.removeAttribute(
            "src"
        );

        audioPlayer.load();

    }


    progressBar.value = 0;

    currentTimeElement.textContent =
        "0:00";

    durationElement.textContent =
        song.duration;

}


/* =========================================================
   ATUALIZAR CAPA
========================================================= */

function updateCover(
    element,
    song
) {

    element.style.background =
        `linear-gradient(
            135deg,
            ${song.coverOne},
            ${song.coverTwo}
        )`;

    element.innerHTML =
        `<i class="fa-solid ${song.icon}"></i>`;

}


/* =========================================================
   TOCAR MÚSICA
========================================================= */

function playSongById(id) {

    const index =
        songs.findIndex(
            song => song.id === id
        );


    if (index === -1) {

        return;

    }


    loadSong(index);

    playCurrentSong();

}


/* =========================================================
   PLAY
========================================================= */

function playCurrentSong() {

    const song =
        songs[state.currentSongIndex];


    if (!song.audio) {

        state.isPlaying = true;

        updatePlayButtons();

        showToast(
            `Agora tocando: ${song.title}`
        );

        return;

    }


    audioPlayer
        .play()
        .then(
            () => {

                state.isPlaying = true;

                updatePlayButtons();

            }
        )
        .catch(
            () => {

                showToast(
                    "Adicione um arquivo de áudio à música para reproduzi-la."
                );

            }
        );

}


/* =========================================================
   PAUSAR
========================================================= */

function pauseCurrentSong() {

    audioPlayer.pause();

    state.isPlaying = false;

    updatePlayButtons();

}


/* =========================================================
   PLAY / PAUSE
========================================================= */

function togglePlay() {

    if (state.isPlaying) {

        pauseCurrentSong();

    }

    else {

        playCurrentSong();

    }

}


/* =========================================================
   ATUALIZAR BOTÕES
========================================================= */

function updatePlayButtons() {

    const icon =
        state.isPlaying
        ? "fa-pause"
        : "fa-play";


    playBtn.innerHTML =
        `<i class="fa-solid ${icon}"></i>`;


    heroPlay.innerHTML =
        `<i class="fa-solid ${icon}"></i>`;

}


/* =========================================================
   PRÓXIMA
========================================================= */

function nextSong() {

    let nextIndex;


    if (state.shuffle) {

        nextIndex =
            Math.floor(
                Math.random() *
                songs.length
            );

    }

    else {

        nextIndex =
            state.currentSongIndex + 1;

        if (
            nextIndex >= songs.length
        ) {

            nextIndex = 0;

        }

    }


    loadSong(nextIndex);

    playCurrentSong();

}


/* =========================================================
   ANTERIOR
========================================================= */

function previousSong() {

    let previousIndex =
        state.currentSongIndex - 1;


    if (previousIndex < 0) {

        previousIndex =
            songs.length - 1;

    }


    loadSong(previousIndex);

    playCurrentSong();

}


/* =========================================================
   PLAYER
========================================================= */

function setupPlayer() {

    playBtn.addEventListener(
        "click",
        togglePlay
    );


    heroPlay.addEventListener(
        "click",
        togglePlay
    );


    nextBtn.addEventListener(
        "click",
        nextSong
    );


    heroNext.addEventListener(
        "click",
        nextSong
    );


    prevBtn.addEventListener(
        "click",
        previousSong
    );


    heroPrev.addEventListener(
        "click",
        previousSong
    );


    volumeBar.addEventListener(
        "input",
        () => {

            const volume =
                Number(volumeBar.value) / 100;


            state.volume =
                volume;


            audioPlayer.volume =
                volume;

        }
    );


    progressBar.addEventListener(
        "input",
        () => {

            if (
                !audioPlayer.duration
            ) {

                return;

            }


            audioPlayer.currentTime =
                (
                    Number(progressBar.value) /
                    100
                ) *
                audioPlayer.duration;

        }
    );


    audioPlayer.addEventListener(
        "timeupdate",
        updateProgress
    );


    audioPlayer.addEventListener(
        "loadedmetadata",
        () => {

            durationElement.textContent =
                formatTime(
                    audioPlayer.duration
                );

        }
    );


    audioPlayer.addEventListener(
        "ended",
        () => {

            if (state.repeat) {

                audioPlayer.currentTime = 0;

                playCurrentSong();

            }

            else {

                nextSong();

            }

        }
    );


    document
        .getElementById("shuffleBtn")
        .addEventListener(
            "click",
            function () {

                state.shuffle =
                    !state.shuffle;

                this.style.color =
                    state.shuffle
                    ? "var(--primary)"
                    : "";

                showToast(
                    state.shuffle
                    ? "Modo aleatório ativado."
                    : "Modo aleatório desativado."
                );

            }
        );


    document
        .getElementById("repeatBtn")
        .addEventListener(
            "click",
            function () {

                state.repeat =
                    !state.repeat;

                this.style.color =
                    state.repeat
                    ? "var(--primary)"
                    : "";

                showToast(
                    state.repeat
                    ? "Repetição ativada."
                    : "Repetição desativada."
                );

            }
        );


    playerFavorite.addEventListener(
        "click",
        () => {

            const song =
                songs[state.currentSongIndex];

            toggleFavorite(song.id);

        }
    );

}


/* =========================================================
   PROGRESSO
========================================================= */

function updateProgress() {

    if (
        !audioPlayer.duration
    ) {

        return;

    }


    const percentage =
        (
            audioPlayer.currentTime /
            audioPlayer.duration
        ) *
        100;


    progressBar.value =
        percentage;


    currentTimeElement.textContent =
        formatTime(
            audioPlayer.currentTime
        );


    durationElement.textContent =
        formatTime(
            audioPlayer.duration
        );

}


/* =========================================================
   FORMATAÇÃO DE TEMPO
========================================================= */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return `${minutes}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;

}


/* =========================================================
   FAVORITOS
========================================================= */

function toggleFavorite(id) {

    const index =
        state.favorites.indexOf(id);


    if (index === -1) {

        state.favorites.push(id);

        showToast(
            "Música adicionada aos favoritos."
        );

    }

    else {

        state.favorites.splice(
            index,
            1
        );

        showToast(
            "Música removida dos favoritos."
        );

    }


    saveFavorites();

    updateStatistics();

    updateFavoriteButton();

    renderSongs();

}


/* =========================================================
   SALVAR FAVORITOS
========================================================= */

function saveFavorites() {

    localStorage.setItem(
        "nairyFavorites",
        JSON.stringify(
            state.favorites
        )
    );

}


/* =========================================================
   ATUALIZAR FAVORITO DO PLAYER
========================================================= */

function updateFavoriteButton() {

    const song =
        songs[state.currentSongIndex];


    const isFavorite =
        state.favorites.includes(
            song.id
        );


    playerFavorite.classList.toggle(
        "active",
        isFavorite
    );


    playerFavorite.innerHTML = `

        <i
            class="
                fa-${
                    isFavorite
                    ? "solid"
                    : "regular"
                }
                fa-heart
            "
        ></i>

    `;

}


/* =========================================================
   CATEGORIAS
========================================================= */

function setupCategories() {

    document
        .querySelectorAll(".category")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".category"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                        button.classList.add(
                            "active"
                        );


                        const category =
                            button.dataset.category;


                        filterSongs(
                            category,
                            searchInput.value
                        );

                    }
                );

            }
        );

}


/* =========================================================
   PESQUISA
========================================================= */

function setupSearch() {

    searchInput.addEventListener(
        "input",
        () => {

            const activeCategory =
                document
                    .querySelector(
                        ".category.active"
                    )
                    ?.dataset.category ||
                "Todos";


            filterSongs(
                activeCategory,
                searchInput.value
            );

        }
    );

}


function filterSongs(
    category,
    search
) {

    const searchText =
        search
            .trim()
            .toLowerCase();


    const filtered =
        songs.filter(
            song => {

                const matchesCategory =
                    category === "Todos" ||
                    song.genre === category;


                const matchesSearch =
                    !searchText ||
                    song.title
                        .toLowerCase()
                        .includes(searchText) ||
                    song.artist
                        .toLowerCase()
                        .includes(searchText);


                return (
                    matchesCategory &&
                    matchesSearch
                );

            }
        );


    renderSongs(filtered);

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(".nav-link")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".nav-link"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                        link.classList.add(
                            "active"
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const target =
                            document.querySelector(
                                link.getAttribute(
                                    "href"
                                )
                            );


                        if (target) {

                            event.preventDefault();

                            target.scrollIntoView({
                                behavior: "smooth"
                            });

                        }

                    }
                );

            }
        );


    document
        .getElementById(
            "startListeningBtn"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById("music")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                setTimeout(
                    () => {

                        playCurrentSong();

                    },
                    600
                );

            }
        );


    document
        .getElementById("discoverBtn")
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById("discover")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

}


/* =========================================================
   TEMA
========================================================= */

function setupTheme() {

    document
        .getElementById("themeBtn")
        .addEventListener(
            "click",
            toggleTheme
        );

}


function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );


    const lightMode =
        document.body.classList.contains(
            "light-mode"
        );


    localStorage.setItem(
        "nairyTheme",
        lightMode
        ? "light"
        : "dark"
    );


    updateThemeIcon();

}


function restoreTheme() {

    const theme =
        localStorage.getItem(
            "nairyTheme"
        );


    if (theme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }


    updateThemeIcon();

}


function updateThemeIcon() {

    const icon =
        document.querySelector(
            "#themeBtn i"
        );


    const lightMode =
        document.body.classList.contains(
            "light-mode"
        );


    icon.className =
        lightMode
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

}


/* =========================================================
   MODAIS
========================================================= */

function setupModals() {

    document
        .getElementById("profileBtn")
        .addEventListener(
            "click",
            () => {

                updateProfileModal();

                openModal(
                    "profileModal"
                );

            }
        );


    document
        .getElementById("favoritesBtn")
        .addEventListener(
            "click",
            () => {

                renderFavoritesList();

                openModal(
                    "favoritesModal"
                );

            }
        );


    document
        .querySelectorAll("[data-close]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            button.dataset.close
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(".modal")
        .forEach(
            modal => {

                modal.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target === modal
                        ) {

                            modal.classList.remove(
                                "open"
                            );

                        }

                    }
                );

            }
        );

}


function openModal(id) {

    document
        .getElementById(id)
        .classList.add("open");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("open");

}


/* =========================================================
   FAVORITOS MODAL
========================================================= */

function renderFavoritesList() {

    const container =
        document.getElementById(
            "favoritesList"
        );


    const favoriteSongs =
        songs.filter(
            song =>
                state.favorites.includes(
                    song.id
                )
        );


    if (
        favoriteSongs.length === 0
    ) {

        container.innerHTML = `

            <div
                style="
                    padding:30px;
                    text-align:center;
                    color:var(--text-secondary);
                "
            >

                <i
                    class="fa-regular fa-heart"
                    style="
                        font-size:30px;
                        margin-bottom:15px;
                    "
                ></i>

                <p>
                    Você ainda não possui
                    músicas favoritas.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    favoriteSongs.forEach(
        song => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "favorite-list-item";


            item.innerHTML = `

                <div
                    class="favorite-list-cover"
                    style="
                        background:
                        linear-gradient(
                            135deg,
                            ${song.coverOne},
                            ${song.coverTwo}
                        );
                    "
                >

                    <i
                        class="fa-solid ${song.icon}"
                    ></i>

                </div>


                <div class="favorite-list-info">

                    <strong>
                        ${song.title}
                    </strong>

                    <span>
                        ${song.artist}
                    </span>

                </div>


                <button
                    class="icon-button"
                    data-fav-play="${song.id}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

            `;


            container.appendChild(item);

        }
    );


    document
        .querySelectorAll("[data-fav-play]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        playSongById(
                            Number(
                                button.dataset.favPlay
                            )
                        );


                        closeModal(
                            "favoritesModal"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   PERFIL
========================================================= */

function updateProfileModal() {

    document
        .getElementById("modalFavorites")
        .textContent =
        state.favorites.length;


    document
        .getElementById("modalGames")
        .textContent =
        state.gamesPlayed;


    document
        .getElementById("modalMinutes")
        .textContent =
        Math.floor(
            state.minutes
        );

}


/* =========================================================
   CLIMAS
========================================================= */

function setupMoods() {

    document
        .querySelectorAll(".mood-card")
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        const mood =
                            card.dataset.mood;


                        recommendByMood(
                            mood
                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "recommendationPlay"
        )
        .addEventListener(
            "click",
            () => {

                const title =
                    document
                        .getElementById(
                            "recommendationTitle"
                        )
                        .dataset.songId;


                if (title) {

                    playSongById(
                        Number(title)
                    );

                }

            }
        );

}


function recommendByMood(mood) {

    const recommendations =
        songs.filter(
            song =>
                song.mood === mood
        );


    if (
        recommendations.length === 0
    ) {

        return;

    }


    const song =
        recommendations[
            Math.floor(
                Math.random() *
                recommendations.length
            )
        ];


    const title =
        document.getElementById(
            "recommendationTitle"
        );


    const text =
        document.getElementById(
            "recommendationText"
        );


    title.textContent =
        song.title;


    title.dataset.songId =
        song.id;


    text.textContent =
        `${song.artist} combina com o clima "${mood}".`;


    showToast(
        `Recomendação: ${song.title}`
    );

}


/* =========================================================
   QUIZ
========================================================= */

const quizQuestions = [

    {
        question:
            "Qual instrumento possui teclas brancas e pretas?",

        answers: [
            "Violão",
            "Piano",
            "Bateria",
            "Flauta"
        ],

        correct: 1

    },

    {
        question:
            "Qual destes é um gênero musical?",

        answers: [
            "Pop",
            "Azul",
            "Cinema",
            "Fotografia"
        ],

        correct: 0

    },

    {
        question:
            "Qual instrumento normalmente possui seis cordas?",

        answers: [
            "Violão",
            "Piano",
            "Saxofone",
            "Bateria"
        ],

        correct: 0

    },

    {
        question:
            "Qual profissional canta uma música?",

        answers: [
            "Cantor",
            "Diretor",
            "Fotógrafo",
            "Pintor"
        ],

        correct: 0

    },

    {
        question:
            "Qual instrumento pertence à família da percussão?",

        answers: [
            "Violino",
            "Bateria",
            "Flauta",
            "Saxofone"
        ],

        correct: 1

    },

    {
        question:
            "Qual destes está relacionado à música eletrônica?",

        answers: [
            "DJ",
            "Escultor",
            "Arquiteto",
            "Ator"
        ],

        correct: 0

    },

    {
        question:
            "O que geralmente controla a velocidade de uma música?",

        answers: [
            "Tempo",
            "Cor",
            "Imagem",
            "Tela"
        ],

        correct: 0

    },

    {
        question:
            "Qual destes é usado para gravar voz?",

        answers: [
            "Microfone",
            "Mouse",
            "Monitor",
            "Teclado"
        ],

        correct: 0

    }

];


let quizState = {

    current: 0,

    score: 0,

    answered: false

};


function setupQuiz() {

    renderQuestion();


    document
        .getElementById(
            "nextQuestion"
        )
        .addEventListener(
            "click",
            nextQuestion
        );


    document
        .getElementById(
            "restartQuiz"
        )
        .addEventListener(
            "click",
            restartQuiz
        );

}


function renderQuestion() {

    const question =
        quizQuestions[
            quizState.current
        ];


    document
        .getElementById(
            "question"
        )
        .textContent =
        question.question;


    document
        .getElementById(
            "questionNumber"
        )
        .textContent =
        `${quizState.current + 1} / ${quizQuestions.length}`;


    document
        .getElementById(
            "quizProgress"
        )
        .style.width =
        `${
            (
                (
                    quizState.current + 1
                ) /
                quizQuestions.length
            ) *
            100
        }%`;


    const answers =
        document.getElementById(
            "answers"
        );


    answers.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        button,
                        index
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );


    quizState.answered =
        false;


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled =
        true;

}


function selectAnswer(
    button,
    selectedIndex
) {

    if (
        quizState.answered
    ) {

        return;

    }


    quizState.answered =
        true;


    const question =
        quizQuestions[
            quizState.current
        ];


    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(
        (item, index) => {

            item.disabled = true;


            if (
                index ===
                question.correct
            ) {

                item.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selectedIndex ===
        question.correct
    ) {

        button.classList.add(
            "correct"
        );


        quizState.score += 10;


        showToast(
            "Resposta correta! +10 pontos"
        );

    }

    else {

        button.classList.add(
            "wrong"
        );


        showToast(
            "Resposta incorreta!"
        );

    }


    document
        .getElementById(
            "score"
        )
        .textContent =
        quizState.score;


    document
        .getElementById(
            "nextQuestion"
        )
        .disabled =
        false;

}


function nextQuestion() {

    quizState.current++;


    if (
        quizState.current >=
        quizQuestions.length
    ) {

        finishQuiz();

        return;

    }


    renderQuestion();

}


function finishQuiz() {

    state.gamesPlayed++;


    localStorage.setItem(
        "nairyGamesPlayed",
        state.gamesPlayed
    );


    updateStatistics();


    document
        .getElementById(
            "quizContent"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "quizResult"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "finalScore"
        )
        .textContent =
        `${quizState.score} pontos`;


    let message;


    if (
        quizState.score >= 70
    ) {

        message =
            "Excelente! Você realmente entende de música.";

    }

    else if (
        quizState.score >= 40
    ) {

        message =
            "Muito bom! Você conhece bastante música.";

    }

    else {

        message =
            "Continue praticando e descubra ainda mais sobre música.";

    }


    document
        .getElementById(
            "resultMessage"
        )
        .textContent =
        message;

}


function restartQuiz() {

    quizState = {

        current: 0,

        score: 0,

        answered: false

    };


    document
        .getElementById(
            "score"
        )
        .textContent =
        "0";


    document
        .getElementById(
            "quizContent"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "quizResult"
        )
        .classList.add(
            "hidden"
        );


    renderQuestion();

}


/* =========================================================
   PLAYLIST
========================================================= */

function setupPlaylist() {

    document
        .getElementById(
            "createPlaylistBtn"
        )
        .addEventListener(
            "click",
            () => {

                openModal(
                    "playlistModal"
                );

            }
        );


    document
        .getElementById(
            "savePlaylistBtn"
        )
        .addEventListener(
            "click",
            createPlaylist
        );


    renderCustomPlaylists();

}


function createPlaylist() {

    const input =
        document.getElementById(
            "playlistName"
        );


    const name =
        input.value.trim();


    if (!name) {

        showToast(
            "Digite um nome para a playlist."
        );

        return;

    }


    const playlist = {

        id: Date.now(),

        name: name,

        songs: []

    };


    state.playlists.push(
        playlist
    );


    localStorage.setItem(
        "nairyPlaylists",
        JSON.stringify(
            state.playlists
        )
    );


    input.value = "";


    closeModal(
        "playlistModal"
    );


    renderCustomPlaylists();


    showToast(
        "Playlist criada com sucesso!"
    );

}


function renderCustomPlaylists() {

    const grid =
        document.getElementById(
            "playlistGrid"
        );


    state.playlists.forEach(
        playlist => {

            if (
                document.querySelector(
                    `[data-playlist-id="${playlist.id}"]`
                )
            ) {

                return;

            }


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "playlist-card";


            card.dataset.playlistId =
                playlist.id;


            card.innerHTML = `

                <div
                    class="
                        playlist-cover
                        gradient-three
                    "
                >

                    <i
                        class="fa-solid fa-list"
                    ></i>

                </div>


                <div class="playlist-info">

                    <h3>
                        ${escapeHtml(
                            playlist.name
                        )}
                    </h3>

                    <p>
                        ${playlist.songs.length}
                        músicas
                    </p>

                </div>


                <button
                    class="playlist-play"
                    data-custom-playlist="${playlist.id}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

            `;


            grid.appendChild(
                card
            );

        }
    );


    document
        .querySelectorAll(
            "[data-custom-playlist]"
        )
        .forEach(
            button => {

                button.onclick =
                    () => {

                        showToast(
                            "Playlist selecionada."
                        );

                    };

            }
        );

}


/* =========================================================
   CONTATO
========================================================= */

function setupContact() {

    document
        .getElementById(
            "contactForm"
        )
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "contactName"
                        )
                        .value;


                showToast(
                    `Obrigado, ${name}! Mensagem enviada.`
                );


                event.target.reset();

            }
        );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );


    const closeMobileMenu =
        document.getElementById(
            "closeMobileMenu"
        );


    mobileMenuBtn.addEventListener(
        "click",
        () => {

            mobileMenu.classList.add(
                "open"
            );

        }
    );


    closeMobileMenu.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "open"
            );

        }
    );


    document
        .querySelectorAll(
            ".mobile-link"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   ESTATÍSTICAS
========================================================= */

function updateStatistics() {

    const favoriteTotal =
        state.favorites.length;


    heroSongs.textContent =
        `${songs.length}+`;


    favoriteCount.textContent =
        favoriteTotal;


    statFavorites.textContent =
        favoriteTotal;


    statGames.textContent =
        state.gamesPlayed;


    statMinutes.textContent =
        Math.floor(
            state.minutes
        );


    document
        .getElementById(
            "modalFavorites"
        )
        .textContent =
        favoriteTotal;


    document
        .getElementById(
            "modalGames"
        )
        .textContent =
        state.gamesPlayed;


    document
        .getElementById(
            "modalMinutes"
        )
        .textContent =
        Math.floor(
            state.minutes
        );

}


/* =========================================================
   TEMPO OUVIDO
========================================================= */

setInterval(
    () => {

        if (
            state.isPlaying
        ) {

            state.minutes +=
                1 / 60;


            localStorage.setItem(
                "nairyMinutes",
                state.minutes
            );


            statMinutes.textContent =
                Math.floor(
                    state.minutes
                );

        }

    },
    1000
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   ANIMAÇÕES AO ROLAR
========================================================= */

function setupScrollAnimations() {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "fade-in"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    document
        .querySelectorAll(
            ".section, .stat-box, .playlist-card, .mood-card"
        )
        .forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

}


/* =========================================================
   ATALHOS DO TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT" &&
            event.target.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            togglePlay();

        }


        if (
            event.code === "ArrowRight"
        ) {

            nextSong();

        }


        if (
            event.code === "ArrowLeft"
        ) {

            previousSong();

        }

    }
);


/* =========================================================
   ATUALIZAÇÃO DO TÍTULO DA PÁGINA
========================================================= */

setInterval(
    () => {

        if (
            state.isPlaying
        ) {

            const song =
                songs[state.currentSongIndex];


            document.title =
                `▶ ${song.title} — NAIRY MUSIC`;

        }

        else {

            document.title =
                "NAIRY MUSIC";

        }

    },
    1000
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c NAIRY MUSIC ",
    `
        background:#b875ff;
        color:white;
        font-size:20px;
        font-weight:bold;
        padding:10px;
        border-radius:8px;
    `
);

console.log(
    "Aplicativo musical iniciado com sucesso."
);
