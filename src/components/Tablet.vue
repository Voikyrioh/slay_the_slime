<script setup lang="ts">

import Upgrades from "./Upgrades/Upgrades.vue";
import Draggable from "./Draggable.vue";
</script>

<template>
  <Draggable id="tablet" drag-element-id="tablet-handle">
    <div id="tablet-title"><span>SlimeTab</span></div>
    <Upgrades></Upgrades>
    <div id="tablet-handle" ref="tablet-handle">
      <div id="false-button"></div>
    </div>
  </Draggable>
</template>

<style scoped>
#tablet-title {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: bold;
  color: #646464;
}

#tablet {
  padding: 8px 16px;
  border-radius: 16px;
  background: #161616;
  min-width: 640px;
  min-height: 964px;
  width: 640px;
  height: 964px;
  position: absolute;
  top: 15%;
  right: 5%;
  box-shadow: 0 0 50px rgba(255, 2555, 255, 0.4);
  z-index: 10;
}
#tablet-handle {
  width: 100%;
  height: 48px;
  cursor: grab;
}
#tablet-handle:active {
  cursor: grabbing;
}
#false-button {
  width: 48px;
  height: 48px;
  border: 3px solid #424242;
  background-color: #242424;
  border-radius: 50%;
  margin: 8px auto 0;
}
</style>
