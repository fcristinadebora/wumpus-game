<template>
  <div>
    <img
      class="agente"
      src="@/assets/img/comflecha.png"
      alt="Agente com flecha"
      v-if="temFlecha"
    />
    <img
      class="agente"
      src="@/assets/img/semflecha.png"
      alt="Agente sem flecha"
      v-if="!temFlecha"
    />
  </div>
</template>

<script>
export default {
  props: {
    ultimaLinha: {
      default: 0,
    },
    ultimaColuna: {
      default: 0,
    },
    posicaoInicial: {
      default() {
        return {
          x: 0,
          y: 0,
        };
      },
    },
    temFlecha: {
        default () {
            return true
        }
    }
  },

  data() {
    return {
      posicaoX: 0,
      posicaoY: 0,
    };
  },

  mounted() {
    document.addEventListener("keyup", this.onKeyUp);

    this.posicaoX = this.posicaoInicial.x;
    this.posicaoY = this.posicaoInicial.y;
  },

  methods: {
    changePosicao() {
      this.$emit("change-posicao", {
        novaPosicao: { x: this.posicaoX, y: this.posicaoY },
      });
    },

    pegarOuro() {
      this.$emit("pegar-ouro");
    },

    atirarFlecha(direcao) {
      this.$emit("atirar-flecha", direcao);
    },

    onKeyUp() {
      switch (event.keyCode) {
        case 38:
          if (this.posicaoY <= 0) {
            return false;
          }

          this.posicaoY--;
          console.log("move up");
          break;
        case 40:
          if (this.posicaoY >= this.ultimaLinha - 1) {
            return false;
          }

          this.posicaoY++;

          console.log("move down");
          break;
        case 39:
          if (this.posicaoX >= this.ultimaColuna - 1) {
            return false;
          }

          this.posicaoX++;

          console.log("move left");
          break;
        case 37:
          if (this.posicaoX <= 0) {
            return false;
          }

          this.posicaoX--;

          console.log("move right");
          break;
      }

      if (event.keyCode >= 37 && event.keyCode <= 40) {
        console.log(event.keyCode);
        this.changePosicao();
      }

      if(event.keyCode === 32){
        this.pegarOuro()
      }

      if(event.keyCode === 87){
        this.atirarFlecha('up')
      }
      if(event.keyCode === 65){
        this.atirarFlecha('left')
      }
      if(event.keyCode === 83){
        this.atirarFlecha('down')
      }
      if(event.keyCode === 68){
        this.atirarFlecha('right')
      }
    },
  },
};
</script>

<style lang="scss">
.agente {
  height: 100px;
}
</style>
