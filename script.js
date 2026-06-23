// --- FUNÇÕES DO MENU LATERAL ---
function toggleMenu() {
    playSound('click');
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('open');
    
    // Animação no botão hamburger para fechar
    const btnLines = document.querySelectorAll('.hamburger-line');
    if (menu.classList.contains('open')) {
        btnLines[0].style.transform = "translateY(8px) rotate(45deg)";
        btnLines[1].style.opacity = "0";
        btnLines[2].style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
        btnLines[0].style.transform = "none";
        btnLines[1].style.opacity = "1";
        btnLines[2].style.transform = "none";
    }
}

function openTab(event, tabId) {
    playSound('click');
    
    // Oculta todas as abas
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    
    // Remove 'active' de todos os botões
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    // Mostra a aba clicada e adiciona 'active' no botão
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// --- FECHAR MENU AO CLICAR FORA ---
document.addEventListener('click', function(event) {
    const menu = document.getElementById('side-menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');

    // Verifica se o menu está aberto e se o elemento existe
    if (menu && hamburgerBtn && menu.classList.contains('open')) {
        // Verifica se o clique ocorreu FORA do menu e FORA do botão hamburger
        if (!menu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            
            // Remove a classe que mantém o menu aberto
            menu.classList.remove('open');
            
            // Reseta a animação do botão hamburger para os 3 tracinhos
            const btnLines = document.querySelectorAll('.hamburger-line');
            if(btnLines.length === 3) {
                btnLines[0].style.transform = "none";
                btnLines[1].style.opacity = "1";
                btnLines[2].style.transform = "none";
            }
        }
    }
});

// --- BANCO DE DADOS GLOBAL (Ciências e Lógica) ---
const MASTER_POOL = [
    { q: "Qual o maior planeta do Sistema Solar?", options: ["Júpiter", "Terra", "Marte", "Vênus"], correct: 0 },
    { q: "Qual o símbolo químico da água?", options: ["O2", "CO2", "H2O", "NaCl"], correct: 2 },
    { q: "Na programação, o que é um 'loop'?", options: ["Uma variável", "Uma estrutura de repetição", "Um erro de sintaxe", "Um banco de dados"], correct: 1 },
    { q: "O que nos puxa para o chão?", options: ["Íman", "Inércia", "Gravidade", "Vento"], correct: 2 },
    { q: "Em Lógica, o operador 'AND' (E) resulta em verdadeiro apenas se:", options: ["Ambas as condições forem falsas", "Pelo menos uma for verdadeira", "Ambas as condições forem verdadeiras", "Nenhuma condição for testada"], correct: 2 },
    { q: "Qual planeta é o 'Planeta Vermelho'?", options: ["Marte", "Mercúrio", "Saturno", "Urano"], correct: 0 },
    { q: "O Sol é uma...", options: ["Galáxia", "Planeta", "Estrela", "Buraco Negro"], correct: 2 },
    { q: "A que temperatura a água ferve ao nível do mar (Celsius)?", options: ["50", "90", "100", "120"], correct: 2 },
    { q: "Qual o gás mais comum na nossa atmosfera?", options: ["Oxigénio", "Gás Carbónico", "Nitrogénio", "Hélio"], correct: 2 },
    { q: "Qual estrutura de dados funciona no modelo LIFO (Last In, First Out)?", options: ["Fila (Queue)", "Pilha (Stack)", "Árvore (Tree)", "Grafo (Graph)"], correct: 1 },
    { q: "A Lua é um satélite...", options: ["Artificial", "Natural", "Gasoso", "Solar"], correct: 1 },
    { q: "Qual o tipo de variável que armazena Verdadeiro ou Falso?", options: ["Integer", "String", "Boolean", "Float"], correct: 2 },
    { q: "Quem descobriu a Lei da Gravidade?", options: ["Einstein", "Galileu", "Newton", "Tesla"], correct: 2 },
    { q: "Símbolo químico do Ouro?", options: ["Ag", "Au", "Gd", "Or"], correct: 1 },
    { q: "Em HTML, qual tag cria um link?", options: ["< link >", "< a >", "< href >", "< url >"], correct: 1 },
    { q: "A luz viaja a que velocidade aproximada?", options: ["300.000 km/s", "150.000 km/s", "500 km/s", "1.000 km/s"], correct: 0 },
    { q: "O que significa a sigla 'CSS'?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Simple Styles"], correct: 1 },
    { q: "O que estuda a Termodinâmica?", options: ["Som", "Luz", "Calor", "Eletricidade"], correct: 2 },
    { q: "Partícula atómica com carga positiva?", options: ["Eletrão", "Protão", "Neutrão", "Fotão"], correct: 1 },
    { q: "Qual o índice do primeiro elemento em um Array na maioria das linguagens?", options: ["1", "0", "-1", "Nulo"], correct: 1 },
    { q: "O que é uma Unidade Astronómica (UA)?", options: ["Distância Terra-Lua", "Distância Terra-Sol", "Tamanho do Sol", "Velocidade da Luz"], correct: 1 },
    { q: "Quem escreveu sobre a Relatividade Geral?", options: ["Planck", "Einstein", "Hawking", "Newton"], correct: 1 },
    { q: "Na programação Orientada a Objetos, o que é instanciar?", options: ["Criar uma classe", "Apagar um dado", "Criar um objeto a partir de uma classe", "Gerar um erro"], correct: 2 },
    { q: "O que é entropia?", options: ["Ordem", "Massa", "Desordem", "Calor"], correct: 2 },
    { q: "Símbolo químico do Tungsténio?", options: ["T", "Tu", "W", "Tg"], correct: 2 },
    { q: "Qual função imprime algo na tela em Python?", options: ["console.log()", "print()", "echo()", "write()"], correct: 1 },
    { q: "O efeito Doppler altera o quê numa onda?", options: ["Velocidade", "Frequência", "Amplitude", "Cor"], correct: 1 },
    { q: "O que diz o Princípio de Heisenberg?", options: ["Gravidade", "Relatividade", "Incerteza", "Inércia"], correct: 2 },
    { q: "SQL é uma linguagem utilizada para:", options: ["Criar estilos visuais", "Manipular Banco de Dados", "Programar microcontroladores", "Criar inteligência artificial"], correct: 1 },
    { q: "Qual o estado da matéria dentro de uma Estrela de Neutrons?", options: ["Plasma", "Gás Degenerado", "Sólido", "Líquido"], correct: 1 },
    { q: "Qual o mediador da força eletromagnética?", options: ["Glúon", "Fóton", "Bóson W", "Gráviton"], correct: 1 },
    { q: "O que significa API?", options: ["Application Programming Interface", "Advanced Program Integration", "Algorithmic Process Indicator", "Array Processing Interface"], correct: 0 },
    { q: "O que é o Horizonte de Eventos?", options: ["Fim do Universo", "Borda de Buraco Negro", "Centro do Sol", "Início do Big Bang"], correct: 1 }
];

// --- SISTEMA DE ÁUDIO ---
let audioCtx;
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playSound(type) {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;
    osc.connect(gain); gain.connect(audioCtx.destination);

    if (type === 'click') {
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(); osc.stop(now + 0.1);
    } else if (type === 'correct') {
        osc.frequency.setValueAtTime(523, now); 
        osc.frequency.exponentialRampToValueAtTime(1046, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(); osc.stop(now + 0.3);
    } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.4);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(); osc.stop(now + 0.4);
    } else if (type === 'tick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(); osc.stop(now + 0.05);
    } else if (type === 'gameover') {
        [200, 150, 100, 80].forEach((f, i) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.connect(g); g.connect(audioCtx.destination);
            o.frequency.setValueAtTime(f, now + (i * 0.4));
            g.gain.setValueAtTime(0.2, now + (i * 0.4));
            g.gain.linearRampToValueAtTime(0.001, now + (i * 0.4) + 0.4);
            o.start(now + (i * 0.4)); o.stop(now + (i * 0.4) + 0.5);
        });
    } else if (type === 'victory') {
        [523, 659, 783, 1046].forEach((f, i) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.connect(g); g.connect(audioCtx.destination);
            o.frequency.setValueAtTime(f, now + (i * 0.15));
            g.gain.setValueAtTime(0.1, now + (i * 0.15));
            g.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.15) + 0.4);
            o.start(now + (i * 0.15)); o.stop(now + (i * 0.15) + 0.5);
        });
    }
}

// --- ESTADO DO JOGO ---
let state = {
    level: 1,
    maxLevel: 20,
    lives: 3,
    currentQIdx: 0,
    correctInLevel: 0,
    questions: [],
    availableQuestions: [],
    answered: false,
    selected: null,
    isExtraQuestion: false,
    timerInterval: null
};

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function startGame() {
    playSound('click');
    
    // Inicia a música de fundo com volume agradável
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.2; // 20% do volume para não atrapalhar os efeitos sonoros
        bgMusic.play().catch(e => console.log("Áudio aguardando interação."));
    }

    state.availableQuestions = shuffle([...MASTER_POOL]);
    
    document.getElementById('screen-start').classList.add('hidden');
    document.getElementById('ui-header').classList.remove('hidden');
    document.getElementById('screen-quiz').classList.remove('hidden');
    updateLivesUI();
    startLevel();
}

function updateLivesUI() {
    const box = document.getElementById('lives-box');
    box.innerHTML = '';
    for(let i=1; i<=3; i++) {
        const h = document.createElement('div');
        h.className = `life-heart ${i > state.lives ? 'life-off' : ''}`;
        h.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="${i <= state.lives ? 'var(--neon-red)' : '#333'}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        box.appendChild(h);
    }
}

function startLevel() {
    if(state.availableQuestions.length < 6) {
        state.availableQuestions = shuffle([...MASTER_POOL]);
    }

    state.questions = state.availableQuestions.splice(0, 6);
    state.currentQIdx = 0;
    state.correctInLevel = 0;
    state.isExtraQuestion = false;
    
    document.getElementById('lvl-num').innerText = state.level.toString().padStart(2, '0');
    showQuestion();
}

function showQuestion() {
    state.answered = false;
    state.selected = null;
    const q = state.questions[state.currentQIdx];
    
    if(state.isExtraQuestion) {
        document.getElementById('prog-num').innerText = `EXTRA`;
        document.getElementById('prog-num').style.color = "var(--neon-yellow)";
    } else {
        document.getElementById('prog-num').innerText = `${state.currentQIdx + 1}/5`;
        document.getElementById('prog-num').style.color = "white";
    }

    document.getElementById('q-text').innerText = q.q;
    document.getElementById('feedback-txt').innerText = "";
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('next-btn').innerText = "Confirmar Entrada";

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    q.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = "option-btn p-5 rounded-2xl text-left flex items-center";
        b.innerHTML = `<span class="font-orbitron mr-4 opacity-40">${i+1}</span> ${opt}`;
        b.onclick = () => selectOption(i);
        grid.appendChild(b);
    });
}

// --- LÓGICA DA QUESTÃO EXTRA ---
function triggerExtraIntro() {
    document.getElementById('screen-quiz').classList.add('hidden');
    document.getElementById('screen-extra-intro').classList.remove('hidden');
    playSound('click');
}

function startExtraQuestion() {
    document.getElementById('screen-extra-intro').classList.add('hidden');
    document.getElementById('screen-quiz').classList.remove('hidden');
    
    state.isExtraQuestion = true;
    state.currentQIdx = 5;
    showQuestion();
    startTimer();
}

function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.classList.remove('hidden');
    timerDisplay.classList.add('timer-pulse');
    let timeLeft = 10;
    timerDisplay.innerText = timeLeft + "s";

    state.timerInterval = setInterval(() => {
        timeLeft--;
        if(timeLeft > 0) {
            playSound('tick');
            timerDisplay.innerText = timeLeft + "s";
        } else {
            clearInterval(state.timerInterval);
            timerDisplay.innerText = "0s";
            timerDisplay.classList.remove('timer-pulse');
            timeOutExtra();
        }
    }, 1000);
}

function timeOutExtra() {
    if(state.answered) return;
    state.answered = true;
    playSound('wrong');
    
    const q = state.questions[state.currentQIdx];
    const btns = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback-txt');
    
    btns[q.correct].classList.add('correct');
    feedback.innerText = ">> TEMPO ESGOTADO! AVANÇANDO... <<";
    feedback.style.color = "var(--neon-yellow)";
    
    document.getElementById('next-btn').innerText = "Seguir Fluxo";
    document.getElementById('next-btn').classList.remove('hidden');
}

function selectOption(i) {
    if(state.answered) return;
    playSound('click');
    state.selected = i;
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach((b, idx) => b.classList.toggle('selected', idx === i));
    document.getElementById('next-btn').classList.remove('hidden');
}

function processNext() {
    if(!state.answered) {
        checkAnswer();
    } else {
        if(state.timerInterval) clearInterval(state.timerInterval);
        document.getElementById('timer-display').classList.add('hidden');
        document.getElementById('timer-display').classList.remove('timer-pulse');

        if(state.isExtraQuestion) {
            validateLevelEnd();
        } else {
            state.currentQIdx++;
            if(state.currentQIdx < 5) {
                showQuestion();
            } else {
                if(state.lives < 3 && state.lives > 0) {
                    triggerExtraIntro();
                } else {
                    validateLevelEnd();
                }
            }
        }
    }
}

function checkAnswer() {
    state.answered = true;
    if(state.timerInterval) clearInterval(state.timerInterval);

    const q = state.questions[state.currentQIdx];
    const btns = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback-txt');

    if(state.selected === q.correct) {
        playSound('correct');
        btns[state.selected].classList.add('correct');
        
        if(state.isExtraQuestion) {
            state.lives++;
            updateLivesUI();
            feedback.innerText = ">> VIDA RECUPERADA! <<";
            feedback.style.color = "var(--neon-green)";
        } else {
            state.correctInLevel++;
            feedback.innerText = ">> DADOS SINCRONIZADOS <<";
            feedback.style.color = "var(--neon-green)";
        }
    } else {
        playSound('wrong');
        btns[state.selected].classList.add('wrong');
        btns[q.correct].classList.add('correct');
        
        if(state.isExtraQuestion) {
            feedback.innerText = ">> FALHA. NENHUMA VIDA RECUPERADA <<";
            feedback.style.color = "var(--neon-yellow)";
        } else {
            state.lives--; 
            updateLivesUI();
            feedback.innerText = ">> FALHA CRÍTICA NO NÚCLEO <<";
            feedback.style.color = "var(--neon-red)";

            if(state.lives <= 0) {
                setTimeout(() => endScreen('gameover'), 1000);
                return;
            }
        }
    }
    document.getElementById('next-btn').innerText = "Seguir Fluxo";
}

function validateLevelEnd() {
    if(state.correctInLevel < 3) {
        endScreen('gameover', "Eficiência de dados insuficiente (mínimo 3/5 nas questões principais). Sistema bloqueado.");
        return;
    }

    state.level++;
    if(state.level > state.maxLevel) {
        endScreen('victory');
    } else {
        const grid = document.getElementById('options-grid');
        grid.innerHTML = '';
        document.getElementById('q-text').innerText = `Nível ${state.level-1} superado. A aceder ao Nível ${state.level}...`;
        document.getElementById('feedback-txt').innerText = "NOVA CAMADA DESBLOQUEADA";
        document.getElementById('feedback-txt').style.color = "var(--neon-blue)";
        document.getElementById('next-btn').innerText = "Iniciar Nível " + state.level;
        document.getElementById('next-btn').onclick = () => {
            document.getElementById('next-btn').onclick = processNext;
            startLevel();
        };
    }
}

function endScreen(type, msg) {
    document.getElementById('screen-quiz').classList.add('hidden');
    document.getElementById('screen-extra-intro').classList.add('hidden');
    document.getElementById('ui-header').classList.add('hidden');
    document.getElementById('screen-end').classList.remove('hidden');
    
    const title = document.getElementById('result-title');
    const desc = document.getElementById('result-desc');
    const icon = document.getElementById('result-icon');

    if(type === 'gameover') {
        playSound('gameover');
        title.innerText = "GAME OVER";
        title.style.color = "var(--neon-red)";
        desc.innerText = msg || "A integridade do sistema foi totalmente comprometida.";
        icon.innerText = "⚠️";
    } else {
        playSound('victory');
        title.innerText = "PARABÉNS";
        title.style.color = "var(--neon-green)";
        desc.innerText = "Você concluiu o nível 20! Seu intelecto é superior a qualquer terminal quântico.";
        icon.innerText = "⚛️";
    }
}

// --- ATALHOS DE TECLADO ---
window.addEventListener('keydown', (e) => {
    if(document.getElementById('screen-quiz').classList.contains('hidden')) return;
    if(e.key >= '1' && e.key <= '4') selectOption(parseInt(e.key) - 1);
    if(e.key === 'Enter') {
        const btn = document.getElementById('next-btn');
        if(!btn.classList.contains('hidden')) btn.click();
    }
});

