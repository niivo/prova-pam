//sw
const registerServiceWorker = async() => {
    if ("serviceWorker" in navigator){
        try {
            const registration = await 
            navigator.serviceWorker.register("/sw.js");
            if (registration.active){
                console.log ("Service Worker installed");
            }
            
        }catch (error){
            console.error("Registration failed")
        }
    }
}

registerServiceWorker().then(()=>console.log("oi"));

//js

//
//CRIAR JOGO BASE
//
const caixa = document.querySelectorAll(".caixa");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

//controlar o estado
let player = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivado = true;

//combinações q pode ganhar
const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], // Linhas
    [0,3,6], [1,4,7], [2,5,8], // Colunas
    [0,4,8], [2,4,6]           // Diagonais
];


//funçao para clicar na tela
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (tabuleiro[index] !== "" || !jogoAtivado) return; //verifica se tem algo na box ou se ja acabou
    //atualuzar o array  
    tabuleiro[index] = player;
    event.target.textContent = player;

//
//VERIFICAR O VENCEDOR
//

//mostrar mensagem se ganhoou    
  if (checkWinner()) {
    statusText.textContent = `Jogador ${player} venceu!`;
    jogoAtivado = false;
//se todos quadrados tiverem preenchisdos e n tiver ganhador, é empate
} else if (tabuleiro.every(caixa => caixa !== "")) {
    statusText.textContent = "Empate!";
    jogoAtivado = false;
//se o jogo continuar, mudar jogador
} else {
    player = player === "X" ? "O" : "X";
    statusText.textContent = `Vez do jogador ${player}`;
  }
}

//verifica se as 3 casas tem o msm valor
function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c];
  });
}

//
//RESETAR
//
function resetGame() {
  tabuleiro.fill("");
  caixa.forEach(caixa => caixa.textContent = "");
  player = "X";
  jogoAtivado = true;
  statusText.textContent = `Vez do jogador ${player}`;
}

//fazer comq cada caizar responda ao cjhamado
caixa.forEach(caixa => caixa.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

