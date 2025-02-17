<script setup lang="ts">
import {computed, onMounted, ref, useTemplateRef} from "vue";
import {OngoingState, SlimeHurtKeyframe, SlimeSurpriseKeyframe, SlimeTrembleKeyframe} from "./Slime.tools.ts";
import type { SlimeElementKeyframes } from "./Slime.tools.ts";
import { States } from "./Slime.tools.ts";

const animations: Record<SlimeElementKeyframes, { keyFrames: Keyframe[], options: KeyframeAnimationOptions }> = {
  'hit': SlimeHurtKeyframe,
  'trembling': SlimeTrembleKeyframe,
  'fear': SlimeSurpriseKeyframe
};

const {slimeClick} = defineProps<{slimeClick: () => void}>();
const hitbox = useTemplateRef('hitbox');
const slime = useTemplateRef('slime');

const hitCount = ref<number>(0);
const currentAnimation = ref<Animation>();
const ongoingState = ref<OngoingState>();

onMounted(
() => {
  setInterval(() => {
    if(hitCount.value > 0) hitCount.value -= Math.max(hitCount.value*0.05, 0.1);
  }, 300);
});

const state = computed<States>((): States => {
  let newState: States = States.normal;

  if (ongoingState.value) newState = ongoingState.value.state;
  else if (hitCount.value > 10) newState = States.crying;

  if (state.value !== States.blink && newState !== state.value) setState(States.blink, 100);

  return newState;
});

const face = computed(() => {
  switch (state.value) {
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

function playAnimation(animation: SlimeElementKeyframes) {
  try {
    currentAnimation.value?.finish();
  } catch (error) {
    currentAnimation.value?.cancel();
  }
  currentAnimation.value = slime.value?.animate(animations[animation].keyFrames, animations[animation].options);
}

function setState(state: States, time: number, force = false): Promise<null> | void {
  if (ongoingState.value && !force) {
    return;
  }
  ongoingState.value?.cancel();
  ongoingState.value = new OngoingState(state, () => ongoingState.value = undefined, time);

  return ongoingState.value.observable;
}

function hurtHim(): void {
  hitCount.value += 1;
  playAnimation('hit');
  setState(States.hurt, 500, true)?.then(() => {
    if (hitCount.value < 3) {
      setState(States.outraged, 1000, true);
    }
  });
  slimeClick();
}

function induceFear() {
  const state = setState(States.trembling,5000);
  if (!state) return;
  state.then(() => {currentAnimation.value?.cancel();})
  playAnimation('fear');
  currentAnimation.value?.finished.then(() => {
    playAnimation('trembling');
  });

}

</script>

<template>
  <div id="slime-container">
    {{hitCount}}
    <button
        ref="hitbox"
        @pointerdown="hurtHim"
        @mouseenter="induceFear"
        id="hitbox"
    >
      <span id="slime" ref="slime" :class="{
        trembling: state === States.trembling,
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
</style>
