let heroi = { nome: "Guerreiro", hp: 140, hpMax: 140, ataque: 18, pocoes: 2 };
let inimigo = { nome: "Ladrão", hp: 50, ataque: 12 };

function atualizarTela() {
    document.getElementById("hero-hp").innerText = heroi.hp;
    document.getElementById("hero-pots").innerText = heroi.pocoes;
    document.getElementById("enemy-hp").innerText = inimigo.hp;
    document.getElementById("enemy-name").innerText = inimigo.nome;
}

function log(mensagem) {
    const logBox = document.getElementById("log-box");
    logBox.innerHTML += `<br>` + mensagem;
    logBox.scrollTop = logBox.scrollHeight;
}

function atacar() {
    if (heroi.hp <= 0 || inimigo.hp <= 0) return;

    let danoHeroi = Math.floor(Math.random() * 6) + (heroi.ataque - 3);
    inimigo.hp = Math.max(0, inimigo.hp - danoHeroi);
    log(`🗡️ Causaste ${danoHeroi} de dano ao ${inimigo.nome}!`);

    if (inimigo.hp === 0) {
        log(`🏆 Vitória! Derrotaste o ${inimigo.nome}!`);
        document.getElementById("btn-attack").disabled = true;
        document.getElementById("btn-potion").disabled = true;
        atualizarTela();
        return;
    }

    let danoInimigo = Math.floor(Math.random() * 5) + (inimigo.ataque - 2);
    heroi.hp = Math.max(0, heroi.hp - danoInimigo);
    log(`💥 O ${inimigo.nome} contra-atacou e tirou ${danoInimigo} de HP!`);

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
        let cura = 65;
        heroi.hp = Math.min(heroi.hpMax, heroi.hp + cura);
        heroi.pocoes--;
        log(`🧪 Usaste um Kit Médico e recuperaste ${cura} de HP!`);
    } else {
        log(`❌ Não tens mais nenhum Kit Médico!`);
        return;
    }

    let danoInimigo = Math.floor(Math.random() * 5) + (inimigo.ataque - 2);
    heroi.hp = Math.max(0, heroi.hp - danoInimigo);
    log(`💥 Enquanto usavas o Kit Médico, o ${inimigo.nome} atacou e tirou ${danoInimigo} de HP!`);

    atualizarTela();
}

atualizarTela();
