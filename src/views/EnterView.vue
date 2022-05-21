<template>
  <c-header title="輸入" :icon="true" />
  <c-container :justify-content="true">
    <form @submit.prevent="submitHandler" class="enterinvoice-form">
      <c-label-container
        style="
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding-right: 13px;
        "
      >
        <c-button
          content="手動輸入"
          @click.prevent="
            () => {
              autoPilot = false;
            }
          "
        />
        <c-button
          content="輸入發票"
          @click.prevent="
            () => {
              autoPilot = true;
            }
          "
        />
      </c-label-container>
      <c-label-container title="科目及用途">
        <c-selection
          @selected-value="(value) => (state.subjectValue = value)"
          :options="renderState.subjectSelection.options"
        />
        <c-selection
          style="margin-top: 10px"
          @selected-value="(value) => (state.purposeValue = value)"
          :options="renderState.purposeSelection.options"
        />
        <c-input
          :renderState="renderState.use"
          @validation-handler="validationHandler"
        />
      </c-label-container>

      <invoice v-if="autoPilot" />
      <manualEnter v-else />

      <div
        :style="{
          display: 'flex',
          marginTop: '50px',
          marginBottom: '50px',
          width: '100%',
          justifyContent: 'center',
        }"
      >
        <c-button content="提交" />
      </div>
    </form>
  </c-container>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref } from "vue";
import { invoiceTypes, selectionTypes } from "@/types";
import { useProductsStore } from "@/store/useProductsStore";
import validationHandler from "@/hooks/useValidation";
import axios from "axios";
import CHeader from "@/components/c-header.vue";
import CContainer from "@/components/c-container.vue";
import CLabelContainer from "@/components/c-label-container.vue";
import CInput from "@/components/c-input.vue";
import CSelection from "@/components/c-selection.vue";
import CButton from "@/components/c-button.vue";
import manualEnter from "@/components/manualEnter.vue";
import invoice from "@/components/invoice.vue";

// State, Types and Handler for Render

interface renderTypes {
  use: invoiceTypes[];
  subjectSelection: selectionTypes;
  purposeSelection: selectionTypes;
}

const autoPilot = ref(false);

const renderState = ref<renderTypes>({
  use: [
    {
      type: "text",
      placeholder: "用途",
      class: "input-biggest",
      value: "",
      minlength: 1,
      maxlength: 300,
      validation:
        "^[A-Za-z\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]*$",
    },
  ],
  subjectSelection: {
    options: [
      "請選擇",
      "一般行政-行政管理-01人員維持費",
      "一般行政-行政管理-02一般業務",
      "都市發展業務-都市設計工作",
      "都市發展業務-綜合規劃工作",
      "都市發展業務-都市計畫工作",
      "都市發展業務-都市行政工作",
      "都市發展業務-都市更新工作",
      "代收保管金專戶",
      "代收保管品專戶",
    ],
  },
  purposeSelection: {
    options: [
      "請選擇",
      "業務費-教育訓練費",
      "業務費-通訊費",
      "業務費-資訊服務費",
      "業務費-其他業務租金",
      "業務費-稅捐及規費",
      "業務費-保險費",
      "業務費-臨時人員酬金",
      "業務費-按日按件計資酬金",
      "業務費-委辦費",
      "業務費-物品",
      "業務費-一般事務費",
      "業務費-房屋建築養護費",
      "業務費-車輛及辦公器具養護費",
      "業務費-設施及機械設備養護費",
      "業務費-國內旅費",
      "業務費-特別費",
    ],
  },
});

// State, Types and Handler for Ajax
interface stateTypes {
  use: ComputedRef<string>;
  subjectValue: string;
  purposeValue: string;
}

const state = ref<stateTypes>({
  use: computed(() => {
    return renderState.value.use.map((obj) => obj.value).join("");
  }),
  subjectValue: "",
  purposeValue: "",
});

const submitHandler = function () {
  let guard = true;

  if (
    !state.value.use ||
    !state.value.subjectValue ||
    !state.value.purposeValue
  ) {
    alert("欄位不能為空");
    guard = false;
    return;
  }
  const proudctStore = useProductsStore();

  proudctStore.product.forEach((obj) => {
    if (!obj.amount || !obj.quantity || !obj.name) {
      alert("欄位不能為空123");
      console.log(obj.amount, obj.quantity, obj.name);
      guard = false;
      return;
    }
    if (
      typeof +obj.amount !== "number" ||
      typeof +obj.quantity !== "number" ||
      isNaN(obj.amount) ||
      isNaN(obj.quantity)
    ) {
      alert("數量及價格必須為數字");
      guard = false;
      return;
    }
  });

  if (!guard) return;

  const data = {
    use: state.value.use,
    subject: state.value.subjectValue,
    purpose: state.value.purposeValue,
    time: Date.now(),
    product: proudctStore.product,
    total: proudctStore.product.reduce((acc, obj) => {
      return acc + obj.subTotal;
    }, 0),
  };

  axios({
    method: "post",
    url: "http://localhost:3000/api/",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then(() => alert("新增成功"))
    .catch((err) => console.error(err));

  renderState.value.use.map((obj) => (obj.value = ""));
  state.value.subjectValue = state.value.purposeValue = "";
  proudctStore.clearProducts();
};
</script>

<style lang="scss" scoped>
.enterinvoice-form {
  height: 767px;
  max-width: 375px;
  background-color: #fff;

  @media screen and (max-width: 376px) {
    padding: 50px 10px 0 10px;
  }
}

.selection {
  display: flex;
  align-items: center;

  &-title {
    font-size: 20px;
    color: #222;
    margin-right: 5px;
  }
}
</style>
