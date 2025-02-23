<script setup lang="ts">
import {onMounted, ref, useTemplateRef} from "vue";

const {dragElementId, id} = defineProps({
  dragElementId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
})

const draggable = useTemplateRef<HTMLDivElement>(id as string)
const lastKnownOffsets = ref({x: 0, y: 0});

const moveStart = (e: MouseEvent) => {
  if (!draggable.value) return;
  lastKnownOffsets.value.x = e.clientX - draggable.value.offsetLeft;
  lastKnownOffsets.value.y = e.clientY - draggable.value.offsetTop;
  document.addEventListener('mousemove', handleMove);
  draggable.value.classList.add('prevent-select');
}
const moveEnd = () => {
  draggable?.value?.classList.remove('prevent-select');
  document.removeEventListener('mousemove', handleMove);
}
const handleMove = (e: MouseEvent) => {
  if (draggable?.value) {
    e.preventDefault();
    e.stopPropagation();
    const newChatPos = {
      x: Math.max(Math.min(e.clientX - lastKnownOffsets.value.x, window.innerWidth - draggable.value.offsetWidth), 0),
      y: Math.max(Math.min(e.clientY - lastKnownOffsets.value.y, window.innerHeight - draggable.value.offsetHeight), 0),
    }
    draggable.value.style.left = `${newChatPos.x}px`;
    draggable.value.style.top = `${newChatPos.y}px`;
  }
}

onMounted(() => {
  document.getElementById(dragElementId)?.addEventListener('mousedown', moveStart);
  document?.addEventListener('mouseup', moveEnd);
});
</script>

<template>
  <div :id="id" :ref="id">
    <slot/>
  </div>
</template>

<style scoped>
.prevent-select {
  >* {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
}
</style>
