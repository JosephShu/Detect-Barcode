<template>
  <button class="c-button">{{ props.content }}</button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  content: String,
});
</script>

<style lang="scss" scoped>
.c-button {
  width: 160px;
  height: 40px;
  background-color: var(--background-color-primary);
  border: none;
  cursor: pointer;
  color: #222;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}
</style>
