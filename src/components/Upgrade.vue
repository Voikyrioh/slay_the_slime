<script setup lang="ts">
import SlimeBall from "./SlimeBall.vue";
import type {Upgrade} from "./Upgrade.type.ts";

const {image, imageAlt, name, desc, price} = defineProps<Upgrade>()
</script>

<template>
  <div class="upgrade">
    <img class="upgrade-image" :src=image :alt=imageAlt />
    <div class="upgrade-info">
      <span>{{name}}</span>
      <p>{{desc}}</p>
    </div>
    <span class="upgrade-price"><b>{{price}}</b><SlimeBall/></span>
  </div>
</template>

<style scoped>
.upgrade {
  height: 96px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.upgrade-image {
  width: 64px;
  height: 64px;
  align-self: center;
  margin: 0 8px;
  image-rendering: pixelated;
}

.upgrade-info {
  display: flex;
  flex-direction: column;
  color: #c7c7c7;
  span {
    font-size: 1.2rem;
    font-weight: bold;
    height: 1.2rem;
  }
  p {
    height: 100%;
    margin-top: 8px;
  }
}

.upgrade-price {
  display: flex;
  flex-direction: row;
  b {
    font-size: 1.4rem;
    font-weight: bold;
    align-self: center;
    margin-right: -8px;
    color: var(--slime-color);
    -webkit-text-stroke: 1px var(--slime-border-color);
    text-stroke: 1px var(--slime-border-color);
  }
}
</style>
