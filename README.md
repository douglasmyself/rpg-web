# ⚔️ O Sobrevivente — RPG Dungeon Quest

Um RPG de masmorra por turnos que roda direto no navegador, no celular ou no computador. Escolha um ninja, sobreviva a **10 salas**, derrote os **chefes** e entre para o ranking. Também dá para duelar online com um amigo.

▶️ **Jogue agora:** https://douglasmyself.github.io/rpg-web/

---

## ✨ Recursos

- **3 ninjas** com habilidades e animações próprias.
- **10 salas** com inimigos sorteados e **chefes nas salas 5 e 10**.
- **Login com Google**: seu nome, nível e recorde ficam salvos na sua conta.
- **Ranking online** com a melhor pontuação de cada jogador, busca por nome e aba de **Duelos**.
- **Duelo online (2 jogadores)** pela internet, com código de sala.
- **Nível de conta (1 a 6)**: cada vitória completa dá +5% de vida e ataque, inclusive nos duelos.
- **Tutorial** na primeira partida (guardado na conta, aparece só para quem ainda não viu).
- **Pausa** durante a partida, com menu para começar do início, desistir, compartilhar e entrar em contato.
- Funciona como página única, sem instalar nada.

## 🥷 Os ninjas

| Ninja | Vida | Ataque | Habilidade |
|---|---|---|---|
| ⚡ Ninja do Raio | 115 | 20 | **Martelo do Trovão**: o céu escurece e um raio cai com golpe crítico garantido |
| 🔥 Ninja do Fogo | 105 | 21 | **Esfera de Fogo**: bola de fogo que explode e causa grande dano |
| 🌿 Ninja Curandeiro | 150 | 17 | **Palma Curativa**: golpeia e cura 35 de vida |

## 🎮 Como jogar

| Ação | O que faz |
|---|---|
| ⚔️ **Atacar** | Golpe básico, com chance de crítico. |
| 🔮 **Habilidade** | Ataque especial. O número vermelho mostra os turnos de recarga. |
| 🛡️ **Defender** | Bloqueia os **próximos 2 golpes**. Depois, recarga de 4 turnos. |
| 🧪 **Kit Médico** | Cura 65 de vida. Você começa com 3. |

- **Não fique parado:** se a barrinha amarela acabar (5 segundos), o inimigo ataca.
- **Tempo da sala:** 30 segundos. Se acabar, vence quem tiver mais vida proporcional.
- **Entre as salas** você recupera 20% da vida e escolhe uma recompensa: +10% de ataque, +20 de vida máxima, +1 Kit Médico ou +15% de dano da habilidade. Os chefes também dão +1 Kit Médico.
- **Pontuação:** `100 × número da sala + 2 × vida restante` a cada sala vencida, mais 1000 pontos ao zerar a masmorra.
- **Esquivas:** quem se esquiva solta uma risada. 😄

### Inimigos

Cada sala sorteia entre três inimigos com a mesma força, então cada partida é diferente.

| Sala | Possíveis inimigos |
|---|---|
| 1 | Vírus, Rato Gigante, Cobra |
| 2 | Morcego, Lobo, Escorpião |
| 3 | Esqueleto, Zumbi, Vampiro |
| 4 | Goblin, Bruxa, Alienígena |
| 5 👑 | Ogro, Rei Caveira, Gorila Alfa |
| 6 | Aranha, Robô, Polvo |
| 7 | Fantasma, Palhaço Sombrio, Tubarão Fantasma |
| 8 | Golem, Rinoceronte, Mamute |
| 9 | Demônio, Ninja Sombrio, Diabo Alado |
| 10 👑 | Dragão, Tiranossauro, Kraken |

### Duelo online

1. Um jogador escolhe **Jogar online → Criar sala** e passa o código de 5 letras.
2. O outro escolhe **Entrar com código** e digita o código.
3. Os dois escolhem o ninja e o jogo começa. O nível da conta aumenta o poder de cada jogador.
4. Se os dois tiverem o mesmo nome, o jogo acrescenta um código curto da conta, como `Douglas #A3F9`.

> O duelo não pausa, pois o outro jogador continua jogando.

## 🛠️ Tecnologias

- **HTML, CSS e JavaScript puro**, tudo em um único arquivo (`index.html`).
- **Canvas 2D** para o cenário, personagens e efeitos.
- **Web Audio API** para sons e música, sem arquivos de áudio.
- **[PeerJS](https://peerjs.com/)** (WebRTC) para os duelos online.
- **[Firebase](https://firebase.google.com/)**: Authentication (login Google) e Realtime Database (ranking, nível e duelos).

## 🚀 Como rodar

### Localmente
Baixe o `index.html` e abra no navegador. Para o login Google funcionar, o endereço precisa estar autorizado no Firebase, então o ideal é rodar por um servidor local ou pelo GitHub Pages.

### Publicar no GitHub Pages
1. Envie o `index.html` para o repositório.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Acesse `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## 🔥 Configurar o Firebase (para ter login e ranking)

1. No [Console do Firebase](https://console.firebase.google.com/), crie um projeto e adicione um **app Web**.
2. Em **Authentication → Sign-in method**, ative o **Google**.
3. Em **Authentication → Configurações → Domínios autorizados**, adicione o domínio onde o jogo está (por exemplo, `seu-usuario.github.io`).
4. Crie um **Realtime Database** e publique as regras abaixo.
5. No `index.html`, procure `const FB={` e cole os dados do `firebaseConfig` do seu app. Confira também a constante `DB` com a URL do banco.

Enquanto o `apiKey` estiver vazio, o jogo funciona sem login e pede o nome digitado.

<details>
<summary><b>Regras do Realtime Database</b></summary>

```json
{
  "rules": {
    "scores": { ".read": true, ".write": false },
    "best": {
      ".read": true,
      ".indexOn": ["s", "k"],
      "$uid": {
        ".write": "auth != null && auth.uid === $uid",
        ".validate": "newData.hasChildren(['n','k','e','s','d']) && (!data.exists() || newData.child('s').val() > data.child('s').val())",
        "n": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 24" },
        "k": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 24" },
        "e": { ".validate": "newData.isString() && newData.val().length <= 8" },
        "s": { ".validate": "newData.isNumber() && newData.val() > 0 && newData.val() <= 30000" },
        "v": { ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 6" },
        "d": { ".validate": "newData.val() == now" },
        "$other": { ".validate": false }
      }
    },
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid",
        ".validate": "newData.hasChildren(['l'])",
        "l": { ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 6" },
        "t": { ".validate": "newData.isBoolean()" },
        "$other": { ".validate": false }
      }
    },
    "duel": {
      ".read": true,
      ".indexOn": ["w"],
      "$uid": {
        ".write": "auth != null && auth.uid === $uid",
        ".validate": "newData.hasChildren(['n','e','w','g','d'])",
        "n": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 24" },
        "e": { ".validate": "newData.isString() && newData.val().length <= 8" },
        "w": { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= (data.exists() ? data.child('w').val() : 0) + 1" },
        "g": { ".validate": "newData.isNumber() && newData.val() == (data.exists() ? data.child('g').val() : 0) + 1" },
        "v": { ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 6" },
        "d": { ".validate": "newData.val() == now" },
        "$other": { ".validate": false }
      }
    }
  }
}
```

</details>

### O que cada parte do banco guarda

| Caminho | Conteúdo | Quem lê / escreve |
|---|---|---|
| `best/<uid>` | Melhor pontuação da conta (só é trocada por uma maior) | Todos leem, só o dono grava |
| `users/<uid>` | Nível da conta e se já viu o tutorial | Só o dono |
| `duel/<uid>` | Vitórias e partidas de duelo | Todos leem, só o dono grava |
| `scores` | Ranking antigo, somente leitura | Todos leem, ninguém grava |

## 📁 Estrutura

```
rpg-web/
├── index.html      # o jogo inteiro (HTML + CSS + JS)
├── sua-imagem.PNG  # imagem usada na pré-visualização ao compartilhar o link
└── README.md
```

## 🗺️ Ideias para o futuro

- Instalar como app no celular (PWA).
- Modo infinito, loja de itens e conquistas.
- Ranking semanal e entre amigos.
- Placar calculado em servidor, para evitar pontuações falsas.

## 📬 Contato

Dúvidas, sugestões ou bugs: **douglasmyself@outlook.com**

---

Feito com ☕ e muitas partidas de teste.
