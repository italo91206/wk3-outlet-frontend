<template>
  <aside class="helper-wrapper"  :class="{ ativo: expand == true}">
    <div @click="expand = true" id="helper-button">
      <v-icon>far fa-question-circle</v-icon>
    </div>
    
    <aside class="helper-modal">
      <slot/>
      <p @click="expand = false" class="link">
        Entendi
      </p>
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
.link{
  color: rgb(24, 112, 243);
  text-decoration: underline;
  cursor: pointer;
}

#helper-button {
    position: fixed;
    bottom: 15px;
    right: 15px;
}

#helper-button:hover {
    cursor: pointer;
}

/* .helper-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.helper-wrapper.ativo {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
}

.helper-modal{
  border: solid 1px grey;
  padding: 15px 30px;
  opacity: 0;
  visibility: hidden;
  transition: all .2s ease;
  background: #fff;
  width: 800px;
  height: 400px;
  overflow: auto;
  transform: translate(20px, 50%);
  left: 0px;
}

.helper-wrapper .helper-modal{
  opacity: 0;
  visibility: hidden;
  transition: all .2s ease;
}

.helper-wrapper.ativo .helper-modal {
    opacity: 1;
    visibility: visible;
    transition: all .2s ease;
    box-shadow: -5px -4px 20px 200vw rgb(0 0 0 / 73%);
}

.helper-modal.ativo {
  opacity: 1;
  visibility: visible;
  transition: all .2s ease;
}
</style>