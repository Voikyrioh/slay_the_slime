<script setup lang="ts">
import {ref} from "vue";

const slimeBalls = ref(0)
function handleUserClickEvent() {
  slimeBalls.value += 1;
}
defineExpose({
  handleUserClickEvent
})
</script>

<template>
  <div>
    <b>{{slimeBalls}}</b>
  </div>
</template>

<style scoped>

</style>
