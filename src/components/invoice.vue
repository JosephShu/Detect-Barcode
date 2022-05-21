<template>
  <c-label-container title="發票號碼">
    <c-input
      :renderState="renderState.invoiceNumber"
      @jump-controller="jumpHandler"
      @validation-handler="validationHandler"
    />
  </c-label-container>
  <c-label-container title="開立時間">
    <c-input
      :renderState="renderState.createdTime"
      @jump-controller="jumpHandler"
      @validation-handler="validationHandler"
    />
  </c-label-container>
  <c-label-container title="四位隨機碼">
    <c-input
      :renderState="renderState.randomNumber"
      @jump-controller="jumpHandler"
      @validation-handler="validationHandler"
    />
  </c-label-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CLabelContainer from "@/components/c-label-container.vue";
import CInput from "@/components/c-input.vue";
import validationHandler from "@/hooks/useValidation";

const renderState = ref({
  invoiceNumber: [
    {
      type: "text",
      placeholder: "兩碼英文",
      class: "input-small",
      value: "",
      minlength: 2,
      maxlength: 2,
      validation: "^[A-Za-z]*$",
    },
    {
      type: "text",
      placeholder: "8碼發票號碼",
      class: "input-large",
      value: "",
      minlength: 8,
      maxlength: 8,
      validation: "^[1-9]*$",
    },
  ],
  createdTime: [
    {
      type: "text",
      placeholder: "西元年 : 1999",
      class: "input-small",
      value: "",
      minlength: 4,
      maxlength: 4,
      validation: "^[0-9]*$",
    },
    {
      type: "text",
      placeholder: "月份 : 03",
      class: "input-small",
      value: "",
      minlength: 2,
      maxlength: 2,
      validation: "^(0[1-9]|1[012])$",
    },
    {
      type: "text",
      placeholder: "日期 : 02",
      class: "input-small",
      value: "",
      minlength: 2,
      maxlength: 2,
      validation: "^(0[1-9]|1[0-9]|2[0-9]|3[01])$",
    },
  ],
  randomNumber: [
    {
      type: "text",
      placeholder: "第一位",
      class: "input-col-4 ",
      value: "",
      minlength: 1,
      maxlength: 1,
      validation: "^[0-9]*$",
    },
    {
      type: "text",
      placeholder: "第二位",
      class: "input-col-4 ",
      value: "",
      minlength: 1,
      maxlength: 1,
      validation: "^[0-9]*$",
    },
    {
      type: "text",
      placeholder: "第三位",
      class: "input-col-4 ",
      value: "",
      minlength: 1,
      maxlength: 1,
      validation: "^[0-9]*$",
    },
    {
      type: "text",
      placeholder: "第四位",
      class: "input-col-4 ",
      value: "",
      minlength: 1,
      maxlength: 1,
      validation: "^[0-9]*$",
    },
  ],
});

const jumpHandler = function (maxLength: number, e: KeyboardEvent) {
  const inputEl = e.target as HTMLInputElement;
  const sibling = inputEl.nextElementSibling as HTMLInputElement;

  if (inputEl.value.length === maxLength && sibling && e.code !== "Tab")
    sibling.focus();
};
</script>
