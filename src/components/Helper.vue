<template>
  <aside class="helper-wrapper">
    <div v-if="!expand" @click="expand = true" id="helper-button">
      <v-icon>far fa-question-circle</v-icon>
    </div>
    
    <aside v-else class="helper-modal" @click="expand = false">
      <slot/>
    </aside>
  </aside>
</template>

<script>
export default {
  name: 'Helper',
  data(){
    return {
      expand: false,
    }
  }
}
</script>

<style lang="css">
#helper-button {
    position: fixed;
    bottom: 15px;
    right: 15px;
}

#helper-button:hover {
    cursor: pointer;
}

.helper-wrapper {
    position: absolute;
    top: 50%;
    background: #fff;
    left: 50%;
    border: solid 1px grey;
    padding: 15px 30px;
}
</style>