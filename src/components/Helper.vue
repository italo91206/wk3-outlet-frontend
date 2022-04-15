<template>
  <v-dialog v-model="dialog" persistent max-width="768">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" id="info-button" dark v-bind="attrs" v-on="on">
        <span class="fas fa-info-circle"></span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        <slot name="titulo">
          <p style="color: red">Estou sem título.</p>
        </slot>
      </v-card-title>

      <v-card-text>
        <slot name="texto">
          <p style="color: red">Estou sem texto.</p>
        </slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Entendi
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Helper",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="css">
#info-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  padding: unset;
  min-height: unset;
  min-width: unset;
  font-size: 21px;
}
</style>
