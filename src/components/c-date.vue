<template>
  <span class="custom-date"
    >{{ props.year ? props.year + "/" : null }}{{ props.month }}/{{
      props.date
    }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  year: Number,
  month: Number,
  date: Number,
});
</script>

<style lang="scss" scoped>
.custom-date {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  color: #5a5a78;
}
</style>
