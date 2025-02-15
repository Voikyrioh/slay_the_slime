<script setup lang="ts">
import {computed, ref} from "vue";

enum States {
  normal,
  fear,
  trembling,
  hurt,
  crying,
}

const {slimeClick} = defineProps<{slimeClick: () => void}>();
const state = ref<States>(States.normal);

const face = computed(() => {
  switch (state.value) {
    case States.fear:
    case States.trembling:
      return 'OwO';
    case States.hurt:
      return '>w<';
    case States.crying:
      return 'T w T';
    case States.normal:
    default:
      return '^o^'
  }
})

function induceFear() {
  if (state.value === States.normal) state.value = States.fear;
  setTimeout(() =>  {
    if (state.value === States.fear) state.value = States.trembling;
  }, 1000);
}

function leaveAlone() {
  state.value = States.normal;
}

function hurtHim(): void {
  if (state.value === States.hurt) return;
  state.value = States.hurt;
  setTimeout(() => {
    state.value = States.crying;
    setTimeout(() => {
      if (state.value === States.crying) leaveAlone()
    }, 5000);
  }, 600)
  slimeClick();
}

</script>

<template>
  <button
      @pointerdown="hurtHim"
      @mouseenter="induceFear"
      @mouseleave="leaveAlone"
      :class="{
        owo: state === States.fear,
        trembling: state === States.trembling,
        hurt: state === States.hurt,
      }"
      id="slime"
  >
    {{face}}
  </button>
</template>

<style scoped>

button {
  background-color: var(--slime-color);
  border: solid var(--slime-border);
  color: var(--slime-border);
  border-radius: 128px 128px 64px 64px;
  height: 160px;
  width: 180px;
  font-size: 3rem;
  padding: 0;
  text-align: center;
  transition: transform cubic-bezier(0.1, 0.8, 0.3, 2.3) 0.4s;
}

button:hover {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>⚔️</text></svg>") 16 0,auto;
}

.owo {
  animation: owo cubic-bezier(0.1, 0.8, 0.3, 2.3) 0.4s both;
}

.hurt {
  animation: ouch cubic-bezier(0.1, 0.8, 0.3, 2.3) 0.4s ;
}

.trembling {
  animation: trembling ease-in-out 0.2s infinite;
}

@keyframes trembling {
  from {
    transform: translateX(0);
  }
  33% {
    transform: translateX(-4px);
  }
  66% {
    transform: translateX(4px);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes owo {
  from {
    transform: scale(1);
    font-size: 3rem;
    height: 160px;
    width: 180px;
  }
  50% {
    transform: scale(1.3);
    font-size: 2rem;
    height: 160px;
    width: 120px;
  }
  to {
    transform: scale(1);
    font-size: 3rem;
    height: 160px;
    width: 180px;
  }
}

@keyframes ouch {
  from {
    background-color: var(--slime-color);
    border: solid var(--slime-border);
    color: var(--slime-border);
    height: 160px;
    width: 180px;
  }
  50% {
    background-color: var(--slime-hurt);
    border: solid var(--slime-hurt-border);
    color: var(--slime-hurt-border);
    height: 120px;
    width: 200px;
  }
  to {
    background-color: var(--slime-color);
    border: solid var(--slime-border);
    color: var(--slime-border);
    height: 160px;
    width: 180px;
  }
}
</style>
