<template>
  <c-label-container title="發票內容" style="position: relative">
    <c-input
      :render-state="renderState"
      @validation-handler="validationHandler"
    />
    <c-button
      @click.prevent="addState"
      content="+"
      class="custom-border-button"
      style="right: -53px; bottom: -3px"
    />

    <decodeQR />
  </c-label-container>

  <div
    class="list"
    v-for="(state, i) in productStore.product"
    :key="state.name + i"
  >
    <div class="item">
      <span
        v-if="state.name.length > 6"
        style="font-size: 10px"
        @dblclick="changeState(state.name + i, 'name', $event)"
        >{{ state.name }}</span
      >
      <span v-else @dblclick="changeState(state.name + i, 'name', $event)">{{
        state.name
      }}</span>
    </div>
    <div class="item">
      <span @dblclick="changeState(state.name + i, 'quantity', $event)">{{
        state.quantity
      }}</span>
    </div>
    <div class="item">
      <span @dblclick="changeState(state.name + i, 'amount', $event)">{{
        state.amount
      }}</span>
    </div>

    <c-button
      @click.prevent="deleteState(state.name + i)"
      content="-"
      class="custom-border-button"
      style="right: -50px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import cLabelContainer from "@/components/c-label-container.vue";
import CInput from "@/components/c-input.vue";
import CButton from "@/components/c-button.vue";
import decodeQR from "./decodeQR.vue";
import { invoiceTypes, productStatesTypes } from "@/types";
import { useProductsStore } from "@/store/useProductsStore";
import validationHandler from "@/hooks/useValidation";

const renderState = ref<invoiceTypes[]>([
  {
    type: "text",
    placeholder: "用途及名稱",
    class: "input-small",
    value: "",
    minlength: 1,
    maxlength: 300,
    validation:
      "^[A-Za-z\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]*$",
  },
  {
    type: "text",
    placeholder: "數量",
    class: "input-small",
    value: "",
    minlength: 1,
    maxlength: 300,
    validation: "^[0-9]*$",
  },
  {
    type: "text",
    placeholder: "單價",
    class: "input-small",
    value: "",
    minlength: 1,
    maxlength: 300,
    validation: "^[0-9]*$",
  },
]);

const productStore = useProductsStore();

const addState = function () {
  if (
    !renderState.value[0].value ||
    !renderState.value[1].value ||
    !renderState.value[2].value
  )
    return;

  const newValue: productStatesTypes = {
    name: renderState.value[0].value,
    quantity: +renderState.value[1].value,
    amount: +renderState.value[2].value,
    subTotal: +renderState.value[1].value * +renderState.value[2].value,
  };

  productStore.addProducts(newValue);

  renderState.value[0].value =
    renderState.value[1].value =
    renderState.value[2].value =
      "";
};

const changeState = function (
  id: string | number,
  candiate: string,
  event: Event
) {
  const obj = productStore.product.filter(
    (obj: productStatesTypes, i: number) => obj.name + i === id
  );
  const el = event.target as HTMLElement;
  const parent = el.parentElement as HTMLElement;
  const input = document.createElement("input");

  //eslint-disable-next-line
  //@ts-ignore
  input.value = obj[0][candiate];

  el.style.display = "none";
  input.style.width = "calc(100% - 12px)";
  parent.appendChild(input);
  input.focus();

  const eventFunction = (e: KeyboardEvent) => {
    if (e.code !== "Enter") return;
    const element = e.target as HTMLInputElement;

    //eslint-disable-next-line
    //@ts-ignore
    obj[0][candiate] = element.value;
    input.style.display = "none";
    el.style.display = "block";
  };

  input.addEventListener("keyup", eventFunction);

  if (input.style.display === "none")
    input.removeEventListener("keyup", eventFunction);
};

const deleteState = function (id: string) {
  productStore.deleteProducts(id);
};
</script>

<style lang="scss" scoped>
.list {
  width: calc(100% - 12px);
  margin: 10px 0 0 10px;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: calc(33% - 12px);
  height: 30px;
  margin-left: 10px;
}

.custom-border-button {
  font-size: 15px;
  position: absolute;
  right: -53px;
  bottom: -3px;
  border-radius: 100px;
  width: 30px;
  height: 30px;
}
</style>
