const perguntas = [
    // Perguntas fáceis
    {
        pergunta: "1. O que é uma estrutura de repetição (loop) em programação? (Fácil)",
        opcoes: [
            { id: 'a', texto: "Uma forma de agrupar dados" },
            { id: 'b', texto: "Um bloco de código que é executado várias vezes" },
            { id: 'c', texto: "Uma função que define uma variável" },
            { id: 'd', texto: "Uma instrução condicional" }
        ],
        resposta_correta: "b"
    },
    {
        pergunta: "2. Qual é o principal benefício de usar loops? (Fácil)",
        opcoes: [
            { id: 'a', texto: "Deixar o código mais longo" },
            { id: 'b', texto: "Evitar a repetição de código" },
            { id: 'c', texto: "Declarar variáveis globais" },
            { id: 'd', texto: "Definir novas funções" }
        ],
        resposta_correta: "b"
    },
    {
        pergunta: "3. Qual dos seguintes NÃO é uma aplicação comum de loops? (Fácil)",
        opcoes: [
            { id: 'a', texto: "Automatizar tarefas repetitivas" },
            { id: 'b', texto: "Manipular coleções de dados" },
            { id: 'c', texto: "Definir o tipo de uma variável" },
            { id: 'd', texto: "Percorrer listas" }
        ],
        resposta_correta: "c"
    },
    {
        pergunta: "4. Qual é a sintaxe básica de um loop while em Python? (Fácil)",
        opcoes: [
            { id: 'a', texto: "while (condicao) {}" },
            { id: 'b', texto: "while condicao:" },
            { id: 'c', texto: "loop condicao:" },
            { id: 'd', texto: "do while condicao:" }
        ],
        resposta_correta: "b"
    },
    {
        pergunta: "5. O que acontece se a condição de um loop while nunca se torna falsa? (Fácil)",
        opcoes: [
            { id: 'a', texto: "O programa para com um erro" },
            { id: 'b', texto: "O loop é executado apenas uma vez" },
            { id: 'c', texto: "O programa entra em loop infinito" },
            { id: 'd', texto: "Nada, o programa continua normalmente" }
        ],
        resposta_correta: "c"
    },
    {
        pergunta: "6. Qual é o termo usado para descrever a repetição de um bloco de código em um loop? (Fácil)",
        opcoes: [
            { id: 'a', texto: "Recursão" },
            { id: 'b', texto: "Iteração" },
            { id: 'c', texto: "Delegação" },
            { id: 'd', texto: "Invocação" }
        ],
        resposta_correta: "b"
    },
    {
        pergunta: "7. O que o seguinte loop while faz?  contador = 1; while contador <= 5: print(contador); contador += 1 (Fácil)",
        opcoes: [
            { id: 'a', texto: "Imprime os números de 1 a 5" },
            { id: 'b', texto: "Imprime o número 1 cinco vezes" },
            { id: 'c', texto: "Imprime os números de 1 a 6" },
            { id: 'd', texto: "Não imprime nada" }
        ],
        resposta_correta: "a"
    },
    {
        pergunta: "8. Qual é o perigo de criar um loop infinito? (Fácil)",
        opcoes: [
            { id: 'a', texto: "Pode danificar o hardware do computador" },
            { id: 'b', texto: "Pode causar perda de dados" },
            { id: 'c', texto: "Pode travar o programa e consumir muitos recursos" },
            { id: 'd', texto: "Não há perigo" }
        ],
        resposta_correta: "c"
    },
    // Perguntas difíceis
    {
        pergunta: "9. Em um loop while, onde a condição de parada é verificada? (Difícil)",
        opcoes: [
            { id: 'a', texto: "No final do loop" },
            { id: 'b', texto: "No início de cada iteração" },
            { id: 'c', texto: "Apenas quando o loop termina" },
            { id: 'd', texto: "Aleatoriamente durante o loop" }
        ],
        resposta_correta: "b"
    },
    {
        pergunta: "10. Qual é a principal diferença entre um loop while e uma estrutura condicional if? (Difícil)",
        opcoes: [
            { id: 'a', texto: "Não há diferença, são sinônimos" },
            { id: 'b', texto: "O loop while repete um bloco de código, o if executa o bloco apenas uma vez" },
            { id: 'c', texto: "O if repete um bloco de código, o while executa o bloco apenas uma vez" },
            { id: 'd', texto: "O loop while só pode ser usado com números, o if com strings" }
        ],
        resposta_correta: "b"
    },
];

let perguntaAtual = 0;
let respostasCorretas = 0;
let alunoRespondeu = false;
let historicoRespostas = [];

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementsByClassName("opcao");
const feedbackElemento = document.getElementById("feedback");
const resultadoElemento = document.getElementById("resultado");
const linkContainer = document.getElementById("link-container");
const linkAprovacao = document.getElementById("link-aprovacao");
const proximoPerguntaBotao = document.getElementById("proximo-pergunta");


// Função para verificar se o navegador suporta localStorage (mova para o script.js)
function storageDisponivel() {
    try {
        var storage = window.localStorage,
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return false;
    }
}

let localStorageDisponivel = false;
if (storageDisponivel()) {
    localStorageDisponivel = true;
} else {
    alert('Local storage não está disponível no seu navegador, as respostas não serão salvas.');
}

function carregarHistorico() {
    if (localStorageDisponivel) {
        for (let i = 0; i < perguntas.length; i++) {
            const resposta = localStorage.getItem(`pergunta${i}`);
            if (resposta) {
                const opcaoElemento = document.getElementById(`opcao-${resposta}`);
                if (opcaoElemento) {
                    opcaoElemento.classList.add('opacity-70', 'cursor-not-allowed');
                    opcaoElemento.disabled = true;
                }
                alunoRespondeu = true;
            }
        }
        const respostasCorretasSalvas = localStorage.getItem('respostasCorretas');
        if(respostasCorretasSalvas){
            respostasCorretas = parseInt(respostasCorretasSalvas, 10);
        }
    }
}

function carregarPergunta() {
    const perguntaObj = perguntas[perguntaAtual];
    perguntaElemento.textContent = perguntaObj.pergunta;
    let opcoesEmbaralhadas = [...perguntaObj.opcoes];
    embaralharArray(opcoesEmbaralhadas);

    for (let i = 0; i < opcoesElemento.length; i++) {
        opcoesElemento[i].textContent = opcoesEmbaralhadas[i].texto;
        opcoesElemento[i].dataset.opcao = opcoesEmbaralhadas[i].id;
        opcoesElemento[i].classList.remove("bg-green-500", "bg-red-500", "opacity-70", "cursor-not-allowed");
        opcoesElemento[i].classList.add("bg-gradient-to-r", "from-blue-500", "to-purple-600", "hover:from-blue-600", "hover:to-purple-700", "text-white", "font-semibold", "rounded-xl", "w-full", "p-4", "text-left", "transition-colors", "duration-300", "ease-in-out", "shadow-md", "border", "border-white/20", "cursor-pointer");
        opcoesElemento[i].disabled = false;
    }
    feedbackElemento.className = "mt-6 p-4 rounded-xl text-center font-medium hidden";
    resultadoElemento.classList.add("hidden");
    linkContainer.classList.add("hidden");
    proximoPerguntaBotao.classList.remove("hidden");
    proximoPerguntaBotao.textContent = "Próxima Pergunta";
    alunoRespondeu = false;
}

function selecionarOpcao(opcaoSelecionada, elementoClicado) {
    if (alunoRespondeu) return;

    const respostaCorreta = perguntas[perguntaAtual].resposta_correta;

    if (opcaoSelecionada === respostaCorreta) {
        elementoClicado.classList.remove("bg-gradient-to-r", "from-blue-500", "to-purple-600", "hover:from-blue-600", "hover:to-purple-700");
        elementoClicado.classList.add("bg-green-500", "opacity-70", "cursor-not-allowed");
        respostasCorretas++;
        feedbackElemento.textContent = "Resposta Correta!";
        feedbackElemento.classList.remove("hidden", "bg-red-100", "text-red-700");
        feedbackElemento.classList.add("bg-green-100", "text-green-700");
    } else {
        elementoClicado.classList.remove("bg-gradient-to-r", "from-blue-500", "to-purple-600", "hover:from-blue-600", "hover:to-purple-700");
        elementoClicado.classList.add("bg-red-500", "opacity-70", "cursor-not-allowed");
        feedbackElemento.textContent = "Resposta Incorreta!";
        feedbackElemento.classList.remove("hidden", "bg-green-100", "text-green-700");
        feedbackElemento.classList.add("bg-red-100", "text-red-700");
    }

    for (let i = 0; i < opcoesElemento.length; i++) {
        opcoesElemento[i].disabled = true;
        opcoesElemento[i].classList.remove('cursor-pointer');
    }
    alunoRespondeu = true;
    if (perguntaAtual < perguntas.length - 1) {
        proximoPerguntaBotao.classList.remove("hidden");
    } else {
        mostrarResultado();
    }
    // Salva a resposta no localStorage
    if (localStorageDisponivel) {
        localStorage.setItem(`pergunta${perguntaAtual}`, opcaoSelecionada);
    }
}

function proximaPergunta() {
    perguntaAtual++;
    carregarPergunta();
}

function mostrarResultado() {
    resultadoElemento.textContent = `Você acertou ${respostasCorretas} de ${perguntas.length} perguntas.`;
    resultadoElemento.classList.remove("hidden");
    linkContainer.classList.remove("hidden");
    proximoPerguntaBotao.classList.add("hidden");

    let tentativasFalhas = parseInt(localStorage.getItem('tentativasFalhas')) || 0;

    if (respostasCorretas >= 8) {
        linkAprovacao.textContent = "Acessar Conteúdo Especial";
        linkAprovacao.href = "https://www.programiz.com/online-compiler/7c2eJm3yngqPI";
        localStorage.removeItem('tentativasFalhas');
        localStorage.removeItem('ultimaTentativa');
        if (tentarNovamenteBotao) {
            tentarNovamenteBotao.classList.add("hidden"); // Garante que o botão não apareça em caso de sucesso
        }

        // js-confetti (conforme a documentação)
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            confettiColors: ['#ff0a54','#ff476b', '#ffd700'],
            confettiRadius: 6,
            confettiNumber: 200,
        })
    } else {
        tentativasFalhas++;
        localStorage.setItem('tentativasFalhas', tentativasFalhas);
        localStorage.setItem('ultimaTentativa', Date.now());
        linkAprovacao.textContent = "Revisar Conteúdo";
        linkAprovacao.href = "https://classroom.google.com/c/NzYzMDc2MDI1NzI2/a/NzYzMDc1ODgzMTEy/details";
        const mensagemReprovacao = document.createElement('p');
        mensagemReprovacao.textContent = `Você não conseguiu atingir a pontuação mínima (${respostasCorretas}/${perguntas.length}). Revise o conteúdo e tente novamente. Você tem um limite de 3 tentativas para conseguir o link.`;
        mensagemReprovacao.classList.add("text-red-500", "mt-4");
        resultadoElemento.parentNode.insertBefore(mensagemReprovacao, linkContainer);
        // Limpar respostas anteriores para uma nova tentativa
        for (let i = 0; i < perguntas.length; i++) {
            localStorage.removeItem(`pergunta${i}`);
        }
        if (tentativasFalhas < 3 && tentarNovamenteBotao) {
            tentarNovamenteBotao.classList.remove("hidden"); // Mostra o botão se não atingiu o limite
        } else if (tentativasFalhas >= 3 && tentarNovamenteBotao) {
            tentarNovamenteBotao.classList.add("hidden"); // Oculta o botão se atingiu o limite
            const mensagemLimite = document.createElement('p');
            mensagemLimite.textContent = "Você atingiu o limite de 3 tentativas para este questionário.";
            mensagemLimite.classList.add("text-gray-500", "mt-2");
            resultadoElemento.parentNode.insertBefore(mensagemLimite, linkContainer);
        }
    }
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

carregarHistorico();
carregarPergunta();

for (let i = 0; i < opcoesElemento.length; i++) {
    opcoesElemento[i].addEventListener("click", function() {
        selecionarOpcao(this.dataset.opcao, this); // Passa o dataset.opcao E o elemento
    });
}
proximoPerguntaBotao.addEventListener("click", proximaPergunta);

const tentarNovamenteBotao = document.getElementById('tentar-novamente');

function verificarTempoLimite() {
    const tentativasFalhas = parseInt(localStorage.getItem('tentativasFalhas')) || 0;
    const ultimaTentativa = parseInt(localStorage.getItem('ultimaTentativa')) || 0;
    const tempoAtual = Date.now();
    let tempoEspera = 0;

    if (tentativasFalhas === 1) {
        tempoEspera = 10 * 60 * 1000; // 10 minutos
        return (tempoAtual - ultimaTentativa >= tempoEspera);
    } else if (tentativasFalhas === 2) {
        tempoEspera = 20 * 60 * 1000; // 20 minutos
        return (tempoAtual - ultimaTentativa >= tempoEspera);
    } else if (tentativasFalhas >= 3) {
        return false; // Não pode tentar novamente
    }

    return true; // Pode tentar novamente (0 tentativas ou tempo limite atingido)
}


if (tentarNovamenteBotao) {
    tentarNovamenteBotao.addEventListener('click', () => {
        if (verificarTempoLimite()) {
            perguntaAtual = 0;
            respostasCorretas = 0;
            alunoRespondeu = false;
            carregarPergunta();
            resultadoElemento.classList.add("hidden");
            linkContainer.classList.add("hidden");
            tentarNovamenteBotao.classList.add("hidden");
        } else {
            const tentativasFalhas = parseInt(localStorage.getItem('tentativasFalhas')) || 0;
            const ultimaTentativa = parseInt(localStorage.getItem('ultimaTentativa')) || 0;
            const tempoAtual = Date.now();
            let tempoEspera = 0;
            let mensagemBloqueio = "";

            if (tentativasFalhas === 1) {
                tempoEspera = 10 * 60 * 1000;
                const minutosRestantes = Math.ceil((tempoEspera - (tempoAtual - ultimaTentativa)) / (60 * 1000));
                mensagemBloqueio = `Você poderá tentar novamente em ${minutosRestantes} minutos.`;
            } else if (tentativasFalhas === 2) {
                tempoEspera = 20 * 60 * 1000;
                const minutosRestantes = Math.ceil((tempoEspera - (tempoAtual - ultimaTentativa)) / (60 * 1000));
                mensagemBloqueio = `Você poderá tentar novamente em ${minutosRestantes} minutos.`;
            } else if (tentativasFalhas >= 3) {
                mensagemBloqueio = "Você atingiu o limite de tentativas para este questionário.";
            }

            resultadoElemento.textContent = mensagemBloqueio;
            resultadoElemento.classList.remove("hidden");
            linkContainer.classList.add("hidden");
        }
    });
}
