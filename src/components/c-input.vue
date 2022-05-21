<template>
  <input
    class="custom-input"
    v-for="(obj, i) in props.renderState"
    :key="i"
    :type="obj.type"
    :placeholder="obj.placeholder"
    :class="obj.class"
    style="text-transform: uppercase"
    :maxlength="obj.maxlength"
    :minlength="obj.minlength"
    v-model.lazy="obj.value"
    @keyup="jumpController(obj.maxlength, $event)"
    @change="validationHandler(obj.validation, $event as InputEvent)"
  />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { invoiceTypes } from "@/types";

const props = defineProps({
  renderState: Array as () => invoiceTypes[],
});

const emit = defineEmits(["jump-controller", "validation-handler"]);

const jumpController = function (length: number, $event: KeyboardEvent) {
  emit("jump-controller", length, $event);
};

const validationHandler = function (
  valid: string | number,
  $event: InputEvent
) {
  emit("validation-handler", valid, $event);
};
</script>

<style lang="scss" scoped>
label {
  & .custom-input {
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-left: 10px;
    height: 30px;
    text-align: center;

    &::placeholder {
      text-align: center;
    }
  }

  .title {
    color: #999999;
    text-align: center;
    margin-bottom: 5px;
  }

  .mt-40 {
    margin-top: 40px;
  }

  .input-small {
    width: calc(33% - 12px);
  }

  .input-large {
    width: calc(66% - 12px);
  }

  .input-col-4 {
    width: calc(25% - 12px);
  }

  .input-biggest {
    margin-top: 10px;
    width: calc(100% - 15px);
  }
}
</style>
