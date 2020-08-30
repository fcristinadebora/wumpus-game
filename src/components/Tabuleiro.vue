<template>
  <div>
    <div class="row">
      <div class="col-6 mb-2 text-left">
        <button class="btn btn-warning" id="btnReiniciar" @click="reiniciarJogo">
          Reiniciar Jogo
        </button>
      </div>
      <div class="col-6 mb-2 text-right pt-2">
        <h4 class="text-lg pontos">
          <span v-if="goldColleted">
            <img src="@/assets/img/gold.gif" alt="Ouro coletado" style="height:25px">
          |
          </span>
          <span>
            {{ temFlecha? '1' : '0' }} <img src="@/assets/img/arrow.png" alt="Flecha" style="height:25px">
          </span>
          | {{ pontos }} <span class="text-muted">pts</span>
          </h4>
      </div>
    </div>

    <table class="tabuleiro margin-auto">
      <tr></tr>
      <tr v-for="(linha, y) in tabuleiro" :key="y">
        <td
          v-for="(coluna, x) in linha"
          :key="x"
          :class="getCoordenadaClass(x, y)"
        >
          <agente
            v-if="hasAgent(x, y)"
            @change-posicao="handleAgenteChangePosicao"
            @pegar-ouro="pegarOuro"
            @atirar-flecha="atirarFlecha"
            :tem-flecha="temFlecha"
            :class="
              coluna.hasWumpus || coluna.hasHole || coluna.hasGold
                ? 'sobrepor'
                : null
            "
            :ultima-linha="config.linhas"
            :ultima-coluna="config.colunas"
            :posicao-inicial="agente.posicao"
          ></agente>

          <span v-if="coluna.descoberto">
            <img
              src="@/assets/img/wumpus.gif"
              alt="Wumpus"
              style="width:80px"
              v-if="coluna.hasWumpus"
            />
            <img
              src="@/assets/img/buraco.png"
              alt="Buraco"
              style="width:110px"
              v-if="coluna.hasHole"
            />
            <img
              src="@/assets/img/gold.gif"
              alt="Ouro"
              style="width:100px"
              v-if="coluna.hasGold"
            />
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Agente from "@/components/Agente";
export default {
  components: {
    Agente,
  },

  data() {
    return {
      pontos: 0,
      config: {
        linhas: 4,
        colunas: 6,
      },
      tabuleiro: [],
      agente: null,
      wumpus: [
        { x: 0, y: 0 },
        { x: 4, y: 2 },
      ],
      holes: [
        { x: 1, y: 2 },
        { x: 2, y: 0 },
      ],
      gold: [{ x: 4, y: 1 }],
      temFlecha: true,
      goldColleted: false
    };
  },

  mounted() {
    this.resetGame();
  },

  methods: {
    resetGame() {
      this.getTabuleiro();
      this.setPosicaoInicial();
      this.putWumpus();
      this.putHoles();
      this.putGold();
      this.pontos = 0;
      this.temFlecha = true;
    },

    getTabuleiro() {
      var tabuleiro = [];

      for (var y = 0; y < this.config.linhas; y++) {
        tabuleiro[y] = [];
        for (var x = 0; x < this.config.colunas; x++) {
          tabuleiro[y].push({
            taVento: false,
            temFedor: false,
            descoberto: false,
            isInicial: false,
            hasWumpus: false,
          });
        }
      }

      this.tabuleiro = tabuleiro;
    },

    setPosicaoInicial() {
      const x = 0;
      const y = this.config.linhas - 1;

      this.agente = {
        posicao: {
          x: x,
          y: y,
        },
      };

      this.tabuleiro[y][x].descoberto = true;
      this.tabuleiro[y][x].isInicial = true;
    },

    handleAgenteChangePosicao(posicao) {
      this.agente = {
        posicao: {
          x: posicao.novaPosicao.x,
          y: posicao.novaPosicao.y,
        },
      };

      if(this.tabuleiro[this.agente.posicao.y][
        this.agente.posicao.x
      ].isInicial && this.goldColleted){
        this.$swal.fire({
          title: "Você venceu!",
          text: "Conseguiu coletar o ouro e voltar para a posição inicial. Sua pontuação é: " + this.pontos,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Reiniciar jogo"
        })
        .then((result) => {
          if (result.value) {
            this.resetGame();
          }
        });
        return true
      }

      this.tabuleiro[this.agente.posicao.y][
        this.agente.posicao.x
      ].descoberto = true;

      this.pontos--;

      this.sentirBrisa(this.agente.posicao.x, this.agente.posicao.y);
      this.sentirFedor(this.agente.posicao.x, this.agente.posicao.y);
      this.cairBuraco(this.agente.posicao.x, this.agente.posicao.y);
      this.encontrarWumpus(this.agente.posicao.x, this.agente.posicao.y);
    },

    hasAgent(x, y) {
      if (this.agente && this.agente.posicao) {
        return this.agente.posicao.x == x && this.agente.posicao.y == y;
      }

      return false;
    },

    getCoordenadaClass(x, y) {
      if (!this.tabuleiro[y][x].descoberto) {
        return "undiscovered";
      }

      if (this.tabuleiro[y][x].isInicial) {
        return "inicial";
      }

      if (this.tabuleiro[y][x].temFedor && this.tabuleiro[y][x].taVento) {
        return "comFedor taVento";
      }

      if (this.tabuleiro[y][x].temFedor) {
        return "comFedor";
      }

      if (this.tabuleiro[y][x].taVento) {
        return "taVento";
      }
    },

    getCoordenadasBackground(x, y) {
      var bg = [];
      if (this.tabuleiro[y][x].temFedor) {
        return bg.push('url("../assets/img/vento.png") 100% no-repeat;');
      }

      if (this.tabuleiro[y][x].temFedor) {
        return bg.push('url("../assets/img/vento.png") 100% no-repeat;');
      }

      if (this.tabuleiro[y][x].taVento) {
        return "taVento";
      }
    },

    putWumpus() {
      this.wumpus.forEach((pos) => {
        this.tabuleiro[pos.y][pos.x].hasWumpus = true;

        if (this.tabuleiro[pos.y - 1]) {
          this.tabuleiro[pos.y - 1][pos.x].temFedor = true;
        }
        if (this.tabuleiro[pos.y + 1]) {
          this.tabuleiro[pos.y + 1][pos.x].temFedor = true;
        }
        if (this.tabuleiro[pos.y][pos.x + 1]) {
          this.tabuleiro[pos.y][pos.x + 1].temFedor = true;
        }
        if (this.tabuleiro[pos.y][pos.x - 1]) {
          this.tabuleiro[pos.y][pos.x - 1].temFedor = true;
        }
      });
    },

    putHoles() {
      this.holes.forEach((pos) => {
        this.tabuleiro[pos.y][pos.x].hasHole = true;

        if (this.tabuleiro[pos.y - 1]) {
          this.tabuleiro[pos.y - 1][pos.x].taVento = true;
        }
        if (this.tabuleiro[pos.y + 1]) {
          this.tabuleiro[pos.y + 1][pos.x].taVento = true;
        }
        if (this.tabuleiro[pos.y][pos.x + 1]) {
          this.tabuleiro[pos.y][pos.x + 1].taVento = true;
        }
        if (this.tabuleiro[pos.y][pos.x - 1]) {
          this.tabuleiro[pos.y][pos.x - 1].taVento = true;
        }
      });
    },

    putGold() {
      this.gold.forEach((pos) => {
        this.tabuleiro[pos.y][pos.x].hasGold = true;
      });
    },

    reiniciarJogo() {
      this.$swal
        .fire({
          title: "Tem certeza?",
          text: "Todo o progresso do jogo será perdido!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, reiniciar!",
        })
        .then((result) => {
          if (result.value) {
            this.resetGame(); 
          }
        });
    },

    sentirBrisa(x, y) {
      if (this.tabuleiro[y][x].taVento) {
        this.$notify({
          group: "foo",
          title: "ATENÇÃO! Você sentiu BRISA",
          type: "info",
          text: "Tome cuidado! há um buraco por perto.",
        });
      }
    },

    sentirFedor(x, y) {
      if (this.tabuleiro[y][x].temFedor) {
        this.$notify({
          group: "foo",
          title: "ATENÇÃO! Você sentiu FEDOR",
          type: "success",
          text: "Tome cuidado! há um wumpus por perto.",
        });
      }
    },

    cairBuraco(x, y) {
      if (this.tabuleiro[y][x].hasHole) {
        this.$swal
          .fire({
            title: "Você caiu no buraco!",
            text: "Perdeu 20 pontos!",
            icon: "error",
          })
          .then(() => {
            this.pontos = this.pontos - 20;
          });
      }
    },

    encontrarWumpus(x, y) {
      if (this.tabuleiro[y][x].hasWumpus) {
        this.$swal
          .fire({
            title: "Você encontrou o wumpus!",
            text: "Perdeu 1 000 pontos!",
            icon: "error",
          })
          .then(() => {
            this.pontos = this.pontos - 1000;
          });
      }
    },

    pegarOuro() {
      if (
        this.tabuleiro[this.agente.posicao.y][this.agente.posicao.x].hasGold
      ) {
        this.$swal
          .fire({
            title: "Você pegou o ouro!",
            text: "Ganhou 200 pontos!",
            icon: "success",
          })
          .then(() => {
            this.pontos = this.pontos + 200;
          });
        
        this.tabuleiro[this.agente.posicao.y][this.agente.posicao.x].hasGold = false
        this.goldColleted = true
      }
    },

    atirarFlecha(direcao) {
      var atingido = false;
      var i = 0;
      if (direcao === "left") {
        for (i = this.agente.posicao.x; i >= 0; i--) {
          if (this.tabuleiro[this.agente.posicao.y][i].hasWumpus) {
            this.killWumpus()

            atingido = true;
          }
        }
      }
      if (direcao === "right") {
        for (i = this.agente.posicao.x; i < this.config.colunas; i++) {
          if (this.tabuleiro[this.agente.posicao.y][i].hasWumpus) {
            this.killWumpus()

            atingido = true;
          }
        }
      }
      if (direcao === "up") {
        for (i = this.agente.posicao.y; i >= 0; i--) {
          if (this.tabuleiro[i][this.agente.posicao.x].hasWumpus) {
            this.killWumpus()

            atingido = true;
          }
        }
      }
      if (direcao === "down") {
        for (i = this.agente.posicao.y; i < this.config.linhas; i++) {
          if (this.tabuleiro[i][this.agente.posicao.x].hasWumpus) {
            this.killWumpus()

            atingido = true;
          }
        }
      }

      if (!atingido) {
        this.$swal
          .fire({
            title: "Sua flecha não atingiu nada",
            text: "Você não tem mais nenhuma flecha disponível",
            icon: "info",
          })
          .then(() => {
            this.pontos = this.pontos + 100;
          });
      }

      this.temFlecha = false;
    },

    killWumpus() {
      this.wumpus.forEach((pos) => {
        this.tabuleiro[pos.y][pos.x].hasWumpus = false;

        if (this.tabuleiro[pos.y - 1]) {
          this.tabuleiro[pos.y - 1][pos.x].temFedor = false;
        }
        if (this.tabuleiro[pos.y + 1]) {
          this.tabuleiro[pos.y + 1][pos.x].temFedor = false;
        }
        if (this.tabuleiro[pos.y][pos.x + 1]) {
          this.tabuleiro[pos.y][pos.x + 1].temFedor = false;
        }
        if (this.tabuleiro[pos.y][pos.x - 1]) {
          this.tabuleiro[pos.y][pos.x - 1].temFedor = false;
        }

        this.$swal
          .fire({
            title: "Você matou o wumpus!",
            text: "Ganhou 100 pontos!",
            icon: "success",
          })
          .then(() => {
            this.pontos = this.pontos + 100;
          });
      });
    },
  },
};
</script>

<style lang="scss">
.sobrepor {
  img {
    position: relative;
    margin-bottom: -70px;
    z-index: 9;
  }
}
</style>

<style lang="scss" scoped>
table.tabuleiro {
  background: url("../assets/img/terra.jpg") repeat;
  background-size: 120px;

  td {
    width: 130px;
    height: 130px;
    background-size: 100%;
    border: 5px solid #ccc;
  }

  .inicial {
    background-color: rgb(0 99 17 / 0.6);
  }
  .taVento {
    background: url("../assets/img/vento.png") 100% no-repeat;
    background-position: center;
    background-size: 80%;
  }
  .comFedor {
    background: url("../assets/img/fedor.png") 100% no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .taVento.comFedor {
    background: url("../assets/img/fedor.png") center no-repeat,
      url("../assets/img/vento.png") center no-repeat;
    background-size: 80%, 100%;
  }
  .undiscovered {
    background: url("../assets/img/interrogacao.png") 100% no-repeat;
    background-size: 90%;
    background-position: center;
  }
}

.pontos {
  font-family: fantasy;
}
</style>
