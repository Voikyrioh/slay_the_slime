<script setup lang="ts">
import SlimeBall from "./assets/SlimeBall.vue";
import {game} from "../core/Game.ts";

</script>

<template>
  <div id="counter-container">
    <b id="counter">{{game.getMoney()}}</b><SlimeBall></SlimeBall>
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
  text-shadow: -10px 10px 10px rgba(0, 0, 0, 0.4);
  transition: width var(--slime-animation-style);
  font-family: 'Press Start 2P', cursive;
  color: var(--slime-color);
  -webkit-text-stroke: 2px var(--slime-border-color);
  text-stroke: 2px var(--slime-border-color);
}
#slimeball-icon {
  box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.4);
}

</style>
