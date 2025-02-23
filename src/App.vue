<script setup lang="ts">
import Slime from './components/Slime/Slime.vue'
import Game from "./components/Game.vue";
import {useTemplateRef} from "vue";
import Upgrades from "./components/Upgrades/Upgrades.vue";
import Tablet from "./components/Tablet.vue";
type GameInstance = InstanceType<typeof Game>

const gameComponent = useTemplateRef<GameInstance>('gameComponent');

</script>

<template>
  <div id="game">
    <div id="background">
      <div id="tallgrass"></div>
      <div id="grass"></div>
      <div id="dirt"></div>
    </div>
    <header><h1>Slay the Slime</h1></header>
    <main>
      <Game id="counter-container" ref="gameComponent"></Game>
      <Slime id="slime-container"></Slime>
    </main>
    <Tablet>
      <Upgrades></Upgrades>
    </Tablet>
    <footer>
    </footer>
  </div>
</template>

<style scoped>
* {
  --slime-color: rgba(125, 255, 87, 0.8);
  --slime-face-color: rgba(20, 89, 0, 0.8);
  --slime-border-color: rgba(162, 255, 134, 0.9);
  --slime-hurt-color: rgba(194, 82, 50, 0.80);
  --slime-hurt-border-color: rgba(255, 118, 80, 0.9);
  --slime-border: solid 5px var(--slime-border-color);
  --slime-border-radius: 128px 128px 64px 64px;
  --bg-img-size: 96px;

  --slime-animation-style: cubic-bezier(0.1, 0.8, 0.3, 2.3) 0.4s
}
#game {
  max-width: 1920px;
  min-width: 1200px;
  margin: 0 auto;
  text-align: center;
  height: 100vh;
  display: grid;
  grid-template: 200px 1fr 120px / 1fr 600px;
  grid-template-areas: "h h" "s s" "f f";
}

header {
  grid-area: h;
  background: #67b8ff;
}

header h1 {
  font-size: 7rem;
  margin: 22px;
  color: var(--slime-color);
  -webkit-text-stroke: 2px var(--slime-border-color);
  text-stroke: 2px var(--slime-border-color);
  font-family: 'Press Start 2P', cursive;
  position: absolute;
  left: 30%;
  transform: translate(-50%, 30px);
  text-shadow: -10px 10px 10px rgba(0,0,0,0.4);
  z-index: 2;
}

main {
  grid-area: s;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
}

#background {
  max-width: 1920px;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #67b8ff, #67b8ff, #ffdffb calc(100% - 250px), #5e492f calc(100% - 250px));
  image-rendering: pixelated;
}

#background>#grass {
  position: absolute;
  background:
      0 calc(var(--bg-img-size) * 1) url("/textures/grass.png") repeat-x,
      0 calc(var(--bg-img-size) * 2) url("/textures/grass.png") repeat-x,
      0 calc(var(--bg-img-size) * 3) url("/textures/grass.png") repeat-x;
  width: 100%;
  height: calc(var(--bg-img-size) * 4);
  background-size: var(--bg-img-size);
  bottom: var(--bg-img-size);
}

#background>#tallgrass {
  position: absolute;
  background: top url("/textures/tall_grass.png") repeat-x;
  width: 100%;
  left: 0;
  height: calc(var(--bg-img-size)*4);
  background-size: var(--bg-img-size);
  bottom: var(--bg-img-size);
}

#background>#dirt {
  position: absolute;
  background: top url("/textures/dirt.png")  repeat-x;
  width: 100%;
  height: var(--bg-img-size);
  background-size: var(--bg-img-size);
  bottom: 0;
}

#slime-container {
  height: 100%;
}

#counter-container {
  height: 100px;
  z-index: 1;
}


footer {
  display: block;
  grid-area: f;
}
</style>
