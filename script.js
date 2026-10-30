class Personagem {
  constructor(nome, classe, hp, ataque, pocoes) {
    this.nome = nome;
    this.classe = classe;
    this.hp = hp;
    this.hp_maximo = hp;
    this.ataque = ataque;
    this.pocoes = pocoes;
  }

  esta_vivo() {
    return this.hp > 0;
  }

  usar_pocao() {
    if (this.pocoes > 0) {
      let cura = 65;
      this.hp = Math.min(this.hp_maximo, this.hp + cura);
      this.pocoes -= 1;
      imprimir(`\n🧪 ${this.nome} usou um Kit Médico e recuperou ${cura} de Vida! Vida atual: ${this.hp}/${this.hp_maximo}`);
      imprimir(`Kit Médico restantes: ${this.pocoes}`);
    } else {
      imprimir("\n❌ Você não tem mais nenhum Kit Médico!");
    }
  }
}

class Inimigo {
  constructor(nome, hp, ataque, experiencia) {
    this.nome = nome;
    this.hp = hp;
    this.ataque = ataque;
    this.experiencia = experiencia;
  }

  esta_vivo() {
    return this.hp > 0;
  }
}

const outputDiv = document.getElementById("output");
const inputElem = document.getElementById("input");

let estado = "INICIO";
let heroi = null;
let nomeHeroi = "";
let faseAtual = 0;
const totalFases = 3;
let inimigoAtual = null;

const catalogo_inimigos = [
  { nome: "Ladrão", hp: 50, ataque: 12, exp: 20 },
  { nome: "Trapaceiro", hp: 80, ataque: 18, exp: 40 },
  { nome: "Goblin Espectral", hp: 60, ataque: 15, exp: 30 },
  { nome: "Orc Guerreiro", hp: 90, ataque: 22, exp: 60 },
  { nome: "Esqueleto Guerreiro", hp: 70, ataque: 16, exp: 35 },
  { nome: "Assassino das Sombras", hp: 85, ataque: 20, exp: 50 },
  { nome: "Dragão das Sombras (Chefe)", hp: 110, ataque: 28, exp: 100 }
];

function imprimir(texto) {
  outputDiv.textContent += texto + "\n";
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function iniciarJogo() {
  imprimir("========================================");
  imprimir("        ⚔️  O SOBREVIVENTE  ⚔️");
  imprimir("========================================");
  imprimir("Digite o nome do seu herói: ");
  estado = "AGUARDANDO_NOME";
}

function proximaSala() {
  faseAtual++;
  if (faseAtual > totalFases) {
    imprimir("\n========================================");
    imprimir(`🏆 PARABÉNS🏆 ${heroi.nome}! VOCÊ ZEROU A MASMORRA!`);
    imprimir("========================================");
    estado = "FIM";
    return;
  }

  imprimir(`\n----------------------------------------`);
  imprimir(`🚪 Entrando na Sala ${faseAtual}...`);
  
  let dadosAleatorios = catalogo_inimigos[Math.floor(Math.random() * catalogo_inimigos.length)];
  inimigoAtual = new Inimigo(dadosAleatorios.nome, dadosAleatorios.hp, dadosAleatorios.ataque, dadosAleatorios.exp);
  
  imprimir(`⚠️  Um ${inimigoAtual.nome} selvagem apareceu para o combate!`);
  
  exibirStatusEOpcoes();
  estado = "COMBATE";
}

function exibirStatusEOpcoes() {
  imprimir(`\n--- Status ---`);
  imprimir(`❤️  ${heroi.nome} (Vida: ${heroi.hp}/${heroi.hp_maximo}) | Kit Médico: ${heroi.pocoes}`);
  imprimir(`👹 ${inimigoAtual.nome} (Vida: ${inimigoAtual.hp})`);
  imprimir("--------------");
  imprimir("1. Atacar");
  imprimir("2. Usar Kit Médico");
  imprimir("Escolha sua ação (1-2): ");
}

function processarEntrada() {
  let valor = inputElem.value.trim();
  inputElem.value = "";
  if (estado === "FIM") return;

  if (estado === "AGUARDANDO_NOME") {
    if (!valor) return;
    nomeHeroi = valor;
    imprimir(valor);
    imprimir("\nEscolha a sua Classe:");
    imprimir("1. Guerreiro (Mais Vida, ataque equilibrado)");
    imprimir("2. Mago (Ataque mais forte, menos Vida)");
    imprimir("Opção (1 ou 2): ");
    estado = "AGUARDANDO_CLASSE";
  } 
  else if (estado === "AGUARDANDO_CLASSE") {
    imprimir(valor);
    if (valor === "2") {
      heroi = new Personagem(nomeHeroi, "Mago", 100, 25, 3);
    } else {
      heroi = new Personagem(nomeHeroi, "Guerreiro", 140, 18, 2);
    }
    imprimir(`\n✨ ${heroi.nome} o Seu ${heroi.classe} entrou na Masmorra com ${heroi.hp} de Vida e ${heroi.pocoes} Kits Médico!`);
    faseAtual = 0;
    proximaSala();
  } 
  else if (estado === "COMBATE") {
    imprimir(valor);
    if (valor === "1") {
      let dano_causado = randomInt(heroi.ataque - 5, heroi.ataque + 5);
      inimigoAtual.hp -= dano_causado;
      imprimir(`\n🗡️ Você atacou o ${inimigoAtual.nome} e causou ${dano_causado} de dano!`);

      if (inimigoAtual.esta_vivo()) {
        let dano_recebido = randomInt(inimigoAtual.ataque - 3, inimigoAtual.ataque + 3);
        heroi.hp -= dano_recebido;
        imprimir(`💥 O ${inimigoAtual.nome} revidou e te causou ${dano_recebido} de dano!`);
      } else {
        imprimir(`\n🏆 Vitória!🏆 Você derrotou o ${inimigoAtual.nome}!`);
        imprimir(`🎉 Sala ${faseAtual} superada com sucesso!`);
        proximaSala();
        return;
      }
    } 
    else if (valor === "2") {
      heroi.usar_pocao();
      if (inimigoAtual.esta_vivo()) {
        let dano_recebido = randomInt(inimigoAtual.ataque - 3, inimigoAtual.ataque + 3);
        heroi.hp -= dano_recebido;
        imprimir(`💥 Enquanto você usava o Kit Médico, o ${inimigoAtual.nome} atacou e causou ${dano_recebido} de dano!`);
      }
    } 
    else {
      imprimir("❌ Ação inválida! Perdeu a vez.");
    }

    if (!heroi.esta_vivo()) {
      imprimir("\n💀 Você foi derrotado na masmorra... Game Over!");
      estado = "FIM";
      return;
    }

    exibirStatusEOpcoes();
  }
}

inputElem.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    processarEntrada();
  }
});

iniciarJogo();
