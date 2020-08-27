<template>
  <div>
    <table class="tabuleiro margin-auto">
      <tr>
        <td class="comVento">
            
        </td>
        <td>
            <img src="@/assets/img/buraco.png" alt="Ouro" style="width:130px">
        </td>
        <td class="comVento"></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td class="comVento">
            <img src="@/assets/img/gold.gif" alt="Ouro" style="width:100px">
        </td>
        <td>
            <img src="@/assets/img/semflecha.png" alt="Ouro" style="height:100px">
            <img src="@/assets/img/comflecha.png" alt="Ouro" style="height:100px">
        </td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td class="comFedor">
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
            
        </td>
        <td class="comFedor">
        </td>
        <td>
            <img src="@/assets/img/wumpus.gif" alt="Wumpus" style="width:80px">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
table.tabuleiro {
  td {
    width: 130px;
    height: 130px;
    background: url('../assets/img/terra.jpg') 100%;
    background-size: 100%;
    border: 5px solid #ccc;

    }

    .comVento{
        background: url('../assets/img/vento.png') 100% no-repeat, url('../assets/img/terra.jpg');
        background-size: 100%;
    }
    .comFedor{
        background: url('../assets/img/fedor.png') 100% no-repeat, url('../assets/img/terra.jpg');
        background-size: 100%;
    }
}
</style>
