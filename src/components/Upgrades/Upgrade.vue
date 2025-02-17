<script setup lang="ts">
import SlimeBall from "../assets/SlimeBall.vue";
import type {Upgrade} from "./Upgrade.type.ts";

const {image, imageAlt, name, desc, price} = defineProps<Upgrade>()
</script>

<template>
  <div class="upgrade">
    <span class="upgrade-name">{{name}}</span>
    <img class="upgrade-image" :src=image :alt=imageAlt />
    <p class="upgrade-info">
      {{desc}}
    </p>
    <button class="upgrade-price"><span>Buy for only</span> <b>{{price}}</b><SlimeBall/></button>
  </div>
</template>

<style scoped>
.upgrade {
  border-radius: 8px;
  height: calc(1.4rem + 96px + 48px + 16px);
  display: grid;
  grid-template: 1.4rem 96px 48px / 96px 1fr;
  grid-template-areas: "title title" "image info" "price price";
  background-color: var(--mall-a-slime-main-color);
  border: 3px solid var(--mall-a-slime-accent-border-color);
  color: var(--mall-a-slime-text-color);
  margin: 8px;
  padding: 8px;

  &.disabled {
    filter: grayscale(80%);
    .upgrade-price {
      cursor: not-allowed;
    }
  }
}

.upgrade-image {
  grid-area: image;
  width: 64px;
  height: 64px;
  align-self: center;
  margin: 0 8px;
  transform: scale(1.6) rotate(40deg);
}

.upgrade-name {
  grid-area: title;
  margin-bottom: 8px;
  height: 1.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
}

.upgrade-info {
  grid-area: info;
  color: var(--mall-a-slime-text-color);
    font-size: 1rem;
    margin-top: 8px;
}

.upgrade-price {
  grid-area: price;
  width: 40%;
  min-width: 100px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: row;
  cursor: pointer;
  background-color: var(--mall-a-slime-accent-color);
  border: solid 3px var(--mall-a-slime-accent-border-color);
  border-radius: 8px;
  transition: var(--slime-animation-style);
  span {
    margin-right: 8px;
    color: var(--mall-a-slime-text-light-color);
  }
  b, span {
    font-size: 1.2rem;
    font-weight: bold;
    align-self: center
  }
  b {
    margin-right: -8px;
    color: var(--slime-color);
  }
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
    background-color: var(--mall-a-slime-main-color);
    border-color: var(--mall-a-slime-accent-color);
    filter: grayscale(50%);
  }
}
</style>
