<template>
  <div
    class="list-container"
    :class="{
      'flx-center': props.center,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  center: Boolean,
});
</script>

<style lang="scss" scoped>
.list-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 768px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  overflow: hidden auto;
}

.flx-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
