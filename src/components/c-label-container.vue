<template>
  <label>
    <h2 class="mt-40 title">{{ props.title }}</h2>
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style lang="scss" scoped>
.title {
  color: #999999;
  text-align: center;
  margin-bottom: 5px;
}

.mt-40 {
  margin-top: 40px;
}
</style>
