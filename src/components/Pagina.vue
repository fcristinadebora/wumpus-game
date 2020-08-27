<template>
  <div class="container-fluid text-center pt-5">
    <div class="col-12">
      <div class="row">
        <div class="col-md-4">
          <h1>Bem-vindo ao Mundo Wumpus</h1>
          <ul class="text-left">
            <li>Use as teclas de direção para mover seu personagem.</li>
            <li>Pressione a barra de espaço para atirar a flexa</li>
            <li>
              Você só pode se mover para a esquerda/direita. Movimentos
              diagonais não são permitidos
            </li>
            <li>
              Cuidado para não ser comido pelo wumpus nem cair nos buracos
            </li>
          </ul>
        </div>

        <div class="col-md-8 d-flex justify-content-center">
          <tabuleiro></tabuleiro>
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