let heroi = { nome: "Guerreiro", hp: 140, hpMax: 140, ataque: 18, pocoes: 2 };
let inimigo = { nome: "Goblin Ladrão", hp: 50, ataque: 12 };

function atualizarTela() {
    document.getElementById("hero-hp").innerText = heroi.hp;
    document.getElementById("hero-pots").innerText = heroi.pocoes;
    document.getElementById("enemy-hp").innerText = inimigo.hp;
    document.getElementById("enemy-name").innerText = inimigo.name;
}

function log(mensagem) {
    const logBox = document.getElementById("log-box");
    logBox.innerHTML += `<br>` + mensagem;
    logBox.scrollTop = logBox.scrollHeight;
}

function atacar() {
    if (heroi.hp <= 0 || inimigo.hp <= 0) return;

    // Dano do herói
    let danoHeroi = Math.floor(Math.random() * 6) + (heroi.ataque - 3);
    inimigo.hp = Math.max(0, inimigo.hp - danoHeroi);
    log(`🗡️ Causaste ${danoHeroi} de dano ao ${inimigo.name}!`);

    if (inimigo.hp === 0) {
        log(`🏆 Derrotaste o ${inimigo.name} com sucesso!`);
        document.getElementById("btn-attack").disabled = true;
        document.getElementById("btn-potion").disabled = true;
        atualizarTela();
        return;
    }

    // Retruca o inimigo
    let danoInimigo = Math.floor(Math.random() * 5) + (inimigo.ataque - 2);
    heroi.hp = Math.max(0, heroi.hp - danoInimigo);
    log(`💥 O ${inimigo.name} contra-atacou e tirou ${danoInimigo} de HP!`);

    if (heroi.hp === 0) {
        log(`💀 Foste derrotado na masmorra... Fim de jogo.`);
        document.getElementById("btn-attack").disabled = true;
        document.getElementById("btn-potion").disabled = true;
    }

    atualizarTela();
}

function usarPocao() {
    if (heroi.hp <= 0 || inimigo.hp <= 0) return;

    if (heroi.pocoes > 0) {
        let cura = 35;
        heroi.hp = Math.min(heroi.hpMax, heroi.hp + cura);
        heroi.pocoes--;
        log(`🧪 Usaste uma poção e recuperaste ${cura} de HP!`);
    } else {
        log(`❌ Não tens mais poções de cura!`);
        return;
    }

    // Inimigo ataca enquanto usas poção
    let danoInimigo = Math.floor(Math.random() * 5) + (inimigo.ataque - 2);
    heroi.hp = Math.max(0, heroi.hp - danoInimigo);
    log(`💥 Enquanto bebias a poção, o ${inimigo.name} atacou e tirou ${danoInimigo} de HP!`);

    atualizarTela();
}

atualizarTela();
