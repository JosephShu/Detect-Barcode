<template>
  <div class="container" :class="{ 'justify-content': props.justifyContent }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  justifyContent: Boolean,
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden auto;
}

.justify-content {
  justify-content: center;
}
</style>
