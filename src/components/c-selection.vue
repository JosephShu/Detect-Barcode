<template>
  <select class="custom-selection" @input="emitSelectedValue">
    <option v-for="(el, i) in props.options" :key="i" :value="el">
      {{ el }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from "vue";

const props = defineProps({
  title: String,
  options: Array as PropType<string[]>,
});
const emit = defineEmits(["selectedValue"]);

const emitSelectedValue = function (e: Event) {
  const selectElement = e.target as HTMLSelectElement;

  emit("selectedValue", selectElement.value);
};
</script>

<style lang="scss" scoped>
.custom-selection {
  border-radius: 5px;
  border: 1px solid #ddd;
  height: 30px;
  text-align: center;
  width: calc(100% - 15px);
  margin-left: 10px;
}
</style>
