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

    // Dano do herói
    let danoHeroi = Math.floor(Math.random() * 6) + (heroi.ataque - 3);
    inimigo.hp = Math.max(0, inimigo.hp - danoHeroi);
    log(`🗡️ Você atacou o ${inimigo.nome} e causou ${danoHeroi} de dano!`);

    if (inimigo.hp === 0) {
        log(`🏆 Vitória! Você derrotou o ${inimigo.nome}!`);
        document.getElementById("btn-attack").disabled = true;
        document.getElementById("btn-potion").disabled = true;
        atualizarTela();
        return;
    }

    // Retruca o inimigo
    let danoInimigo = Math.floor(Math.random() * 5) + (inimigo.ataque - 2);
    heroi.hp = Math.max(0, heroi.hp - danoInimigo);
    log(`💥 O ${inimigo.nome} revidou e te causou ${danoInimigo} de dano!`);

    if (heroi.hp === 0) {
        log(`💀 Você foi derrotado na masmorra... Game Over!`);
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
        log(`🧪 ${heroi.nome} usou um Kit Médico e recuperou ${cura} de Vida!`);
    } else {
        log(`❌ Você não tem mais nenhum Kit Médico!`);
        return;
    }

    // Inimigo ataca enquanto você usa o Kit
    let danoInimigo = Math.floor(Math.random() * 5) + (inimigo.ataque - 2);
    heroi.hp = Math.max(0, heroi.hp - danoInimigo);
    log(`💥 Enquanto você usava o Kit Médico, o ${inimigo.nome} atacou e causou ${danoInimigo} de dano!`);

    atualizarTela();
}

atualizarTela();
