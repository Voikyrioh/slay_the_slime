<script setup lang="ts">
import Upgrade from "./Upgrade.vue";
import type { Upgrade as UpgradeType } from "./Upgrade.type";
import {ref} from "vue";

const upgradesAvailables = ref<UpgradeType[]>([
  {
    desc: "chopchop does what any chopchop would do, like chopping small slimes or chopping wood",
    image: "/upgrades/chopchop.png",
    imageAlt: "Big axe with slime residue",
    name: "Chopchop",
    price: 25
  },
  {
    desc: "chopchop does what any chopchop would do, like chopping small slimes or chopping wood",
    image: "/upgrades/chopchop.png",
    imageAlt: "Big axe with slime residue",
    name: "Chopchop",
    price: 25
  }
])

</script>

<template>
<div id="upgrades">
  <Upgrade v-for="up of upgradesAvailables" :name=up.name :image=up.image  :desc=up.desc  :image-alt=up.imageAlt :price=up.price></Upgrade>
</div>
</template>

<style scoped>
#upgrades {
  display: flex;
  flex-direction: column;
}
</style>
