<template>
  <div class="container-fluid text-center pt-3">
    <div class="col-12">
      <div class="row">
        <div class="col-md-4 text-left">
          <h3>Bem-vindo ao Mundo de Wumpus</h3>

          <p class="">
            Seu objetivo é <b>pegar o ouro</b> e voltar para a posição inicial (casa verde) com vida.
            <br>
            <br>
            <b>Instruções:</b><br>
            <ol class="text-left pl-3">
              <li class="mb-2">Use as teclas de direção para mover seu personagem.</li>
              <li class="mb-2">A cada movimento, você perde 1 ponto</li>
              <li class="mb-2">Pressione a tecla <b>ESPAÇO</b> para pegar o ouro na casa (ganha 200 pontos)</li>
              <li class="mb-2">Se você sentir CHEIRO RUIM, tome cuidado! O wumpus está em uma das casas adjacentes. Se você passar pela casa onde o Wumpus está perderá 1000 pontos</li>
              <li class="mb-2">Se você sentir BRISA, tome cuidado! Há um buraco em uma das casas adjacentes. Se você passar pela casa onde há um buraco, perderá 200 pontos</li>
              <li class="mb-2">Você tem 1 flecha disponível para tentar matar o Wumpus (ganha 100 pontos): Pressione a tecla <b>W, A, S, ou D para atirá-la em uma direção</b></li>
              <li class="mb-2">Seu objetivo é coletar o ouro e voltar para a posição inicial com a maior pontuação possível</li>
            </ol>

          </p>
        </div>

        <div class="col-md-8">
          <div class="w-100 d-flex justify-content-end">
          <tabuleiro></tabuleiro>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabuleiro from "@/components/Tabuleiro";
export default {
  components: {
    Tabuleiro,
  },
};
</script>