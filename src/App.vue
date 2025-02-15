<script setup lang="ts">
import Slime from './components/Slime.vue'
import Game from "./components/Game.vue";
import {useTemplateRef} from "vue";
type GameInstance = InstanceType<typeof Game>

const gameComponent = useTemplateRef<GameInstance>('gameComponent');
function handleClick() {
  gameComponent.value?.handleUserClickEvent();
}
</script>

<template>
  <Game ref="gameComponent"></Game>
  <Slime :slime-click="handleClick"></Slime>
</template>

<style scoped>
* {
  --slime-color: #52C232;
  --slime-border: #6FFF6F;
  --slime-hurt: #C25232;
  --slime-hurt-border: #ff7650;
}
</style>
