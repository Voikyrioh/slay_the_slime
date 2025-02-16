<script setup lang="ts">
import Upgrade from "./Upgrade.vue";
import type { Upgrade as UpgradeType } from "./Upgrade.type";
import {ref} from "vue";

type UpgradeCategory = "Weapons"| "Upgrades"| "Skins";

function selectCategory(category: UpgradeCategory) {
  selectedCategory.value = category;
}

const upgradesWeapons: UpgradeType[] = [
  {
    desc: "chopchop does what any chopchop would do, like chopping wood or innocent baby slimes and their family...",
    image: "/upgrades/chopchop.png",
    imageAlt: "Big axe with slime residue",
    name: "Chopchop",
    price: 25,
    id: 1
  }
];

const selectedCategory = ref<UpgradeCategory>("Weapons");
const availableCategoryUpgrades = ref<Record<UpgradeCategory, UpgradeType[]>>({
  "Weapons": upgradesWeapons,
  "Upgrades": [],
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
    <span>here you can buy anything you want to perfectly massacre those naughty slimes.</span>
    <div id="false-shop-header-button-container">
      <button
          v-for="category of Object.keys(availableCategoryUpgrades)"
          :class="{'active': selectedCategory === category}"
          @click="() => selectCategory(category as UpgradeCategory)"
      >{{ category }}</button>
    </div>
  </div>
  <Upgrade
      v-for="up of availableCategoryUpgrades[selectedCategory]"
      :name=up.name
      :image=up.image
      :desc=up.desc
      :image-alt=up.imageAlt
      :price=up.price
      :id=up.id
  />
</div>
</template>

<style scoped>
#upgrades {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

#false-shop-header {
  height: 80px;
  background-color: #363636;
  margin-bottom: 48px;
  border-bottom: 1px solid #242424;
  >h2 {
    font-family: 'Press Start 2P', cursive;
    font-size: 1.6rem;
    font-weight: bold;
    margin: 4px;
    color: var(--slime-color);
    -webkit-text-stroke: 1px var(--slime-border-color);
    text-stroke: 1px var(--slime-border-color);
  }
  >span {
    color: #c7c7c7;
    font-size: 0.8rem;
    font-style: italic;
  }
  >#false-shop-header-button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
    >button {
      width: 128px;
      height: 32px;
      font-size: 1rem;
      border-radius: 0 0 25px 25px;
      background-color: #242424;
      border: none;
      &.active {
        background-color: #363636;
        border: 1px solid #242424;
        border-top: none;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
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
