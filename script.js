/* =========================================
   ELEMENTOS
========================================= */

const giftScreen = document.getElementById("gift-screen");
const envelopeScreen = document.getElementById("envelope-screen");
const letterScreen = document.getElementById("letter-screen");
const cakeScreen = document.getElementById("cake-screen");

const giftWrapper = document.querySelector(".gift-wrapper");
const envelope = document.querySelector(".envelope");

const openGiftButton = document.getElementById("open-gift");
const openLetterButton = document.getElementById("open-letter");
const continueButton = document.getElementById("continue-letter");

const letterContent = document.getElementById("letter-content");
const progressDots = document.querySelectorAll(".progress-dots .dot");

const cake = document.querySelector(".cake");
const cakeMessage = document.querySelector(".cake-message");
const finalMessage = document.getElementById("final-message");

const music = document.getElementById("background-music");
const musicControl = document.getElementById("music-control");


/* =========================================
   TEXTOS DA CARTA
========================================= */

const letterParts = [

    `Feliz aniversário, meu amor. Eu queria poder estar aí com você para poder comemorar esse dia ao seu lado, mas, mesmo de longe, eu queria encontrar um jeito de estar presente. Então fiz isso aqui pensando em você.`,

    `E pensar que tudo começou no dia 24 de janeiro de 2026, em uma partida de Valorant. Eu estava lá, tranquilamente, trollando a sua ranked... e, de algum jeito, aquilo acabou fazendo a gente se aproximar. Depois vieram os duos, as conversas e, quando eu percebi, você já tinha se tornado alguém muito importante para mim.`,

    `Eu poderia falar dos seus olhos, porque são uma das coisas que mais gosto em você, mas acho que são os pequenos momentos que mais fazem eu gostar de estar com você. Até aquela vez em que você dormiu em call e eu fiquei ouvindo sua respiração se tornou uma lembrança especial para mim.`,

    `Eu amo muito você e sou muito feliz por ter você na minha vida. Você é uma pessoa incrível, dedicada e que merece muitas coisas boas. Gosto muito de poder ter você comigo, conversar, jogar e compartilhar coisas que nós dois gostamos.`,

    `Eu desejo que esse novo ano da sua vida seja cheio de felicidade, saúde e coisas boas. Que você continue indo bem nos seus estudos, nos seus treinos e em tudo que fizer. Espero que consiga alcançar seus objetivos e que nunca deixe de correr atrás daquilo que deseja. E, claro, espero que você volte para o Diamante no Valorant também kkkkj.`,

    `Sou muito feliz por ter você comigo e espero que a gente ainda viva muitos momentos especiais juntos.`

];


/* =========================================
   ESTADO
========================================= */

let currentPart = 0;
let musicStarted = false;
let isChangingPart = false;


/* =========================================
   TROCAR DE TELA
========================================= */

function showScreen(screen) {

    const screens = [
        giftScreen,
        envelopeScreen,
        letterScreen,
        cakeScreen
    ];

    screens.forEach(item => {

        item.classList.add("hidden");
        item.classList.remove("active");

    });

    screen.classList.remove("hidden");
    screen.classList.add("active");
}


/* =========================================
   MÚSICA
========================================= */

async function startMusic() {

    if (musicStarted) {
        return;
    }

    try {

        await music.play();

        musicStarted = true;

        musicControl.textContent = "🎵";
        musicControl.setAttribute(
            "aria-label",
            "Pausar música"
        );

    } catch (error) {

        console.log(
            "O navegador bloqueou a reprodução automática.",
            error
        );

    }
}


/* =========================================
   CONTROLE DA MÚSICA
========================================= */

musicControl.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();

            musicControl.textContent = "🎵";

            musicControl.setAttribute(
                "aria-label",
                "Pausar música"
            );

        } catch (error) {

            console.log(error);

        }

    } else {

        music.pause();

        musicControl.textContent = "🔇";

        musicControl.setAttribute(
            "aria-label",
            "Continuar música"
        );

    }

});


/* =========================================
   PRESENTE
========================================= */

openGiftButton.addEventListener("click", async () => {

    await startMusic();

    giftWrapper.classList.add("open");

    createGiftSparkles();

    openGiftButton.disabled = true;

    setTimeout(() => {

        showScreen(envelopeScreen);

    }, 1200);

});


/* =========================================
   BRILHOS DO PRESENTE
========================================= */

function createGiftSparkles() {

    const symbols = [
        "✦",
        "✧",
        "✦",
        "✧",
        "♡"
    ];

    for (let i = 0; i < 12; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "gift-sparkle";

        sparkle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        sparkle.style.left =
            `${35 + Math.random() * 30}%`;

        sparkle.style.top =
            `${35 + Math.random() * 30}%`;

        sparkle.style.animationDelay =
            `${Math.random() * .4}s`;

        giftWrapper.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);

    }

}


/* =========================================
   ABRIR ENVELOPE
========================================= */

openLetterButton.addEventListener("click", () => {

    envelope.classList.add("open");

    openLetterButton.disabled = true;

    setTimeout(() => {

        showScreen(letterScreen);

        currentPart = 0;

        showLetterPart();

    }, 1200);

});


/* =========================================
   MOSTRAR PARTE DA CARTA
========================================= */

function showLetterPart() {

    if (currentPart >= letterParts.length) {
        return;
    }

    isChangingPart = true;

    continueButton.classList.add("hidden");

    letterContent.classList.remove(
        "soft-reveal",
        "slide-out-left",
        "slide-in-right"
    );

    progressDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentPart
        );

    });


    /* 
       Todas as partes agora aparecem
       completas imediatamente.
    */

    letterContent.innerHTML = `
        <p>${letterParts[currentPart]}</p>
    `;


    void letterContent.offsetWidth;

    letterContent.classList.add(
        "slide-in-right"
    );


    setTimeout(() => {

        continueButton.classList.remove("hidden");

        isChangingPart = false;

    }, 450);

}


/* =========================================
   CONTINUAR CARTA
========================================= */

continueButton.addEventListener("click", () => {

    if (isChangingPart) {
        return;
    }

    if (currentPart < letterParts.length - 1) {

        letterContent.classList.remove(
            "slide-in-right"
        );

        letterContent.classList.add(
            "slide-out-left"
        );

        continueButton.classList.add("hidden");

        setTimeout(() => {

            currentPart++;

            showLetterPart();

        }, 350);

    } else {

        continueButton.classList.add("hidden");

        letterContent.classList.add(
            "slide-out-left"
        );

        setTimeout(() => {

            showScreen(cakeScreen);

        }, 600);

    }

});


/* =========================================
   CLICAR NO BOLO
========================================= */

cake.addEventListener("click", () => {

    cakeMessage.classList.add("hidden");

    const candles = document.querySelectorAll(".flame");

    candles.forEach(flame => {

        flame.style.opacity = "0";
        flame.style.transform =
            "translateX(-50%) scale(0)";

    });


    createFinalHearts();


    setTimeout(() => {

        finalMessage.classList.remove("hidden");

    }, 600);

});


/* =========================================
   CORAÇÕES
========================================= */

function createFinalHearts() {

    const hearts = [
        "♡",
        "♥",
        "♡",
        "♥",
        "♡",
        "♥",
        "♡",
        "♥"
    ];

    hearts.forEach((symbol, index) => {

        const heart = document.createElement("span");

        heart.className = "final-heart";

        heart.textContent = symbol;

        heart.style.left =
            `${25 + Math.random() * 50}%`;

        heart.style.top =
            `${55 + Math.random() * 15}%`;

        heart.style.animationDelay =
            `${index * 0.12}s`;

        cakeScreen.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 2300);

    });

}