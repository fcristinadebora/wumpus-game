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
              <li class="mb-2">Pressione a tecla <b>S</b> para pegar o ouro na casa.</li>
              <li class="mb-2">Se você sentir CHEIRO RUIM, tome cuidado! O wumpus está em uma das casas adjacentes. Se você passar pela casa onde o Wumpus está, será comido e perderá o jogo.</li>
              <li class="mb-2">Se você sentir BRISA, tome cuidado! Há um buraco em uma das casas adjacentes. Se você passar pela casa onde há um buraco, perderá o jogo.</li>
              <li class="mb-2">Você tem 1 flecha disponível para tentar matar o Wumpus:
                <ol>
                  <li>Pressione a tecla <b>A</b></li>
                  <li>Pressione a <b>tecla de direção</b> para direcionar a mira</li>
                  <li>Pressione novamente a tecla <b>A</b></li>
                  
                  <li>Para cancelar, pressione a tecla <b>C</b></li>
                </ol>
              </li>              
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