<script setup lang="ts">
import {ref} from "vue";
import SlimeBall from "./SlimeBall.vue";

const slimeBalls = ref(0)
function handleUserClickEvent() {
  slimeBalls.value += 1;
}
defineExpose({
  handleUserClickEvent
})
</script>

<template>
  <div id="counter-container">
    <b id="counter">{{slimeBalls}}</b><SlimeBall></SlimeBall>
  </div>
</template>

<style scoped>
#counter-container {
  align-self: center;
  display: flex;
  justify-content: space-around;
  width: fit-content;
  transition: width var(--slime-animation-style);
}

#counter {
  font-size: 3rem;
  line-height: 1.75;
  width: fit-content;
  transition: width var(--slime-animation-style);
  font-family: 'Press Start 2P', cursive;
  color: var(--slime-color);
  -webkit-text-stroke: 2px var(--slime-border-color);
  text-stroke: 2px var(--slime-border-color);
}

</style>
