<template>
  <header class="custom-header">
    <font-awesome-icon
      v-show="props.icon"
      @click="router('Main')"
      class="icon"
      :icon="['fas', 'house']"
    />
    <h1 v-if="title" class="custom-header-text">{{ props.title }}</h1>
    <slot v-else></slot>
  </header>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import useCustomRouter from "@/hooks/useCustomRouter";

const props = defineProps({
  title: String,
  icon: Boolean,
});

const router = useCustomRouter();
</script>

<style lang="scss" scoped>
.custom-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  background-color: var(--background-color-primary);

  .icon {
    position: absolute;
    color: #222;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
    cursor: pointer;
  }

  &-text {
    color: #222;
    font-size: 30px;
  }
}
</style>
