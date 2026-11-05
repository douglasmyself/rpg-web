# ⚔️ RPG Dungeon Quest – O Sobrevivente

RPG de combate por turnos que roda direto no navegador (PC, tablet e celular), feito por um pai para jogar com o filho. Um único arquivo: `index.html`.

## Como jogar
- **Solo:** digite o nome, escolha um dos 3 ninjas e sobreviva a 10 salas (chefes nas salas 5 e 10). Cada sala tem 30 segundos: se o tempo acabar, vence quem tiver mais vida (em %).
- **Online (2 jogadores):** um cria a sala e passa o código de 5 caracteres; o outro entra com o código. Vale em qualquer aparelho com navegador.
- **Ações:** Atacar, Habilidade (com recarga), Defender (bloqueia os próximos 2 golpes) e Kit Médico. No PC, use as teclas 1 a 4.

## Rodar / publicar
Abra o `index.html` no navegador, ou ative o **GitHub Pages** (Settings → Pages → branch `main`).

## Como ajudar
Ideias bem-vindas: novos ninjas e inimigos, arte e animações, sons, balanceamento, mais salas e chefes, modo online melhorado. Abra uma *issue* ou um *pull request*.

## Notas técnicas
- Gráficos desenhados em canvas (sem imagens) e sons sintetizados com Web Audio.
- O modo online usa [PeerJS](https://peerjs.com) (conexão direta entre os jogadores, servidor público gratuito só para o encontro).
