<script setup lang="ts">
import Upgrade from "./Upgrade.vue";
import {computed, ref} from "vue";
import type ShopItem from "../../core/classes/ShopItem.ts";
import {game} from "../../core/Game.ts";

type UpgradeCategory = "Weapons"| "Upgrades"| "Skins";

function selectCategory(category: UpgradeCategory) {
  selectedCategory.value = category;
}

const selectedCategory = ref<UpgradeCategory>("Weapons");
const itemList = computed(() => {
  switch (selectedCategory.value) {
    case "Weapons":
      return game.value?.shop.availableWeapons;
    case "Upgrades":
      return game.value?.shop.availableUpgrades;
    case "Skins":
      return [];
  }
});
const availableCategoryUpgrades = ref<Record<UpgradeCategory, ShopItem[]>>({
  "Weapons": game.value?.shop.availableWeapons,
  "Upgrades": game.value?.shop.availableUpgrades,
  "Skins": []
});

</script>

<template>
<div id="upgrades">
  <div id="navigator-like">
    <div id="navigator-like-tabs"><span>🧆 Slimy Balls</span><span>📖 Slimypedia</span><a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="https://www.youtube.com/s/desktop/e208051c/img/logos/favicon_32x32.png"/> Youtube</a><span class="nav-tab-active">🛒 Shopping</span></div>
    <span id="navigator-like-url-bar">🔒 https://mall-a-slime.com/shop</span>
  </div>
  <div id="false-shop-header">
    <h2>Welcome to Mall a' Slime !</h2>
    <span>Here, you can buy anything you need to perfectly massacre those naughty slimes.</span>
    <div id="false-shop-header-button-container">
      <button
          v-for="category of Object.keys(availableCategoryUpgrades)"
          :class="{'active': selectedCategory === category}"
          @click="() => selectCategory(category as UpgradeCategory)"
      >{{ category }}</button>
    </div>
  </div>
  <div id="upgrades-container">
    <Upgrade
        v-for="up of itemList"
        :name=up.name
        :image=up.imageUrl
        :desc=up.description
        :image-alt=up.imageAlt
        :price=up.cost
        :id=up.id
    />
  </div>
</div>
</template>

<style scoped>
#upgrades {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow: hidden;
  --mall-a-slime-main-color: #005e0f;
  --mall-a-slime-text-color: #6bde7b;
  --mall-a-slime-text-light-color: #d6f6db;
  --mall-a-slime-bg-color: #c2ffc9;
  --mall-a-slime-accent-color: #2ea840;
  --mall-a-slime-border-color: #6bde7b;
  --mall-a-slime-accent-border-color: #6bde7b;

  background-color: var(--mall-a-slime-bg-color);
  min-height: 860px;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  border: #242424;
}

#false-shop-header {
  height: 80px;
  background-color: var(--mall-a-slime-main-color);
  margin-bottom: 48px;
  border-bottom: 1px solid var(--mall-a-slime-border-color);
  color: var(--mall-a-slime-text-color);
  >h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: 1.6rem;
    font-weight: bold;
    margin: 4px;
  }
  >span {
    font-size: 0.9rem;
    font-style: italic;
  }

  >#false-shop-header-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 9.5px;
    >button {
      width: 128px;
      height: 32px;
      font-size: 1rem;
      border-radius: 0 0 8px 8px;
      background-color: var(--mall-a-slime-border-color);
      color: var(--mall-a-slime-text-light-color);
      border: none;
      transition: var(--slime-animation-style), background-color cubic-bezier(0.3, 0.8, 0.3, 1.3) 0.4s;
      &:hover {
        transform: scaleX(1.1);
        height: 34px;
      }
      &:active {
        transform: scaleX(1);
        height: 32px;
      }
      &.active {
        background-color: var(--mall-a-slime-main-color);
        color: var(--mall-a-slime-text-light-color);
        border: 1px solid var(--mall-a-slime-border-color);
        border-top: none;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}

#upgrades-container {
  overflow-y: auto;
  min-height: calc(860px - 193px);
  max-height: calc(860px - 193px);
}

#navigator-like {
  display: flex;
  flex-direction: column;
  background-color: #242424;
  width: 100%;
  #navigator-like-tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: #363636;
    height: 24px;
    >* {
      text-align: center;
      line-height: 22px;
      font-size: 0.7rem;
      width: 96px;
      background-color: #242424;
      border: 1px solid #363636;
      margin: 2px 2px 0 2px;
      border-radius: 4px 4px 0 0;
      color: #c7c7c7;
      img {
        width: 8px;
      }
      &.nav-tab-active {
        background-color: #242424;
        border-bottom: none;
      }
      &:hover {
        cursor: default;
      }
    }
  }

  #navigator-like-url-bar {
    background-color: white;
    color: #242424;
    margin: 8px;
  }
}
</style>
