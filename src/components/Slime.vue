<script setup lang="ts">
import {computed, onMounted, ref, useTemplateRef} from "vue";

enum States {
  blink,
  crying,
  outraged,
  dead,
  fear,
  hurt,
  normal,
  trembling,
}

const {slimeClick} = defineProps<{slimeClick: () => void}>();
const state = ref<States>(States.normal);
const hitbox = useTemplateRef('hitbox');
const hitCount = ref<number>(0);

onMounted(
  () => {
    setInterval(() => {
      if(hitCount.value > 0) hitCount.value -= 1;
    }, 2000);
  })

const face = computed(() => {
  switch (state.value) {
    case States.fear:
    case States.trembling:
      return '◉﹏◉';
    case States.hurt:
      return '＞︿＜';
    case States.blink:
      return '- ω -';
    case States.outraged:
      return '° Д°';
    case States.crying:
      return '╥ ︿ ╥';
    case States.dead:
      return 'X︿X';
    case States.normal:
    default:
      return '•̀ ω •́';
  }
})

function induceFear() {
  if (state.value === States.normal) state.value = States.fear;
  setTimeout(() =>  {
    if (state.value === States.fear) state.value = States.trembling;
  }, 1000);
}

function leaveAlone() {
  setTimeout(() => {
    if (state.value !== States.normal && !hitbox.value?.matches(':hover')) {
      goToNormal();
    }
  }, 3000);
}

function goToNormal() {
  state.value = States.blink;
  setTimeout(() => {
    state.value = States.normal;
  }, 300);
}

function hurtHim(): void {
  if (state.value === States.hurt) return;
  state.value = States.hurt;
  hitCount.value += 1;
  setTimeout(() => {
    state.value = hitCount.value > 10 ? States.crying: States.outraged;
    setTimeout(() => {
      if ([States.crying, States.outraged].includes(state.value) && !hitbox.value?.matches(':hover')) {
        goToNormal();
      }
    }, 5000);
  }, 600)
  slimeClick();
}

</script>

<template>
  <div id="slime-container">
    <button
        ref="hitbox"
        @pointerdown="hurtHim"
        @mouseenter="induceFear"
        @mouseleave="leaveAlone"
        id="hitbox"
    >
      <span id="slime" :class="{
        owo: state === States.fear,
        trembling: state === States.trembling,
        hurt: state === States.hurt,
      }">{{face}}</span>
    </button>
  </div>
</template>

<style scoped>

#slime-container {
  position: relative;
}

#hitbox {
  height: 200px;
  width: 200px;
  background: none;
  border: none;
  display: block;
  position: absolute;
  bottom: 100px;
  left: calc(50% - (180px / 2));
  border-radius: var(--slime-border-radius);
}

#slime {
  display: block;

  height: 160px;
  width: 180px;

  background-color: var(--slime-color);
  color: var(--slime-face-color);
  border: var(--slime-border);


  transform-origin: bottom center;
  transition: transform var(--slime-animation-style);
  box-shadow: 0 20px 10px rgba(0,0,0,0.8);

  border-radius: var(--slime-border-radius);
  font-size: 3rem;
  padding: 0;
  line-height: 3;
}

/* Small reflection on slime*/
#slime:after {
  content: '';
  position: absolute;
  display: block;
  background-color: rgba(255, 255, 255, 0.3);
  transform: rotate(20deg) translate(36px, -160px) skew(-28deg, 1deg);
  width: 50px;
  height: 20px;
  border-radius: 35% / 50%;
}

#hitbox:hover {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='50' height='60' viewport='0 0 100 100' style='fill:black;font-size:30px;'><text y='50%'>⚔️</text></svg>") 16 0,auto;
}

.owo {
  animation: owo var(--slime-animation-style) both;
}

.hurt {
  animation: ouch var(--slime-animation-style) ;
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
    transform: scaleX(1) scaleY(1);
  }
  50% {
    transform: scaleX(1.1) scaleY(1.6);
  }
  to {
    transform: scaleX(1) scaleY(1);
  }
}

@keyframes ouch {
  from {
    background-color: var(--slime-color);
    border: var(--slime-border);
    color: var(--slime-face-color);
    transform: scaleX(1) scaleY(1);
  }
  50% {
    background-color: var(--slime-hurt-color);
    border: solid var(--slime-hurt-border-color);
    color: var(--slime-hurt-border-color);
    transform: scaleX(1.1) scaleY(0.6);
  }
  to {
    background-color: var(--slime-color);
    border: var(--slime-border);
    color: var(--slime-face-color);
    transform: scaleX(1) scaleY(1);
  }
}
</style>
