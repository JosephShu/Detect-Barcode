<template>
  <c-header>
    <div class="month">
      <h4 style="color: #222">
        {{ new Date().getFullYear() }}年{{ new Date().getMonth() + 1 }}月
      </h4>
      <p style="color: #222">
        共{{ subjectInfomations.data.length }}張核銷單,總金額{{
          totalAmount || 0
        }}元
      </p>
    </div>
  </c-header>
  <c-container style="background: #eee; position: relative">
    <template v-if="subjectInfomations.data.length">
      <c-list-item style="background: #fff" />
      <c-button
        @click="customRouter('Invoice')"
        content="+"
        :style="{
          fontSize: '45px',
          position: 'absolute',
          right: '35px',
          bottom: '15px',
          borderRadius: '100px',
          width: '65px',
          height: '65px',
          boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
        }"
      />
    </template>
    <c-loading-spinner v-else />
  </c-container>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onBeforeMount, ref, computed, provide } from "vue";
import { excelTypes } from "@/types";
import CHeader from "@/components/c-header.vue";
import CListItem from "@/components/c-listItem.vue";
import CContainer from "@/components/c-container.vue";
import CLoadingSpinner from "@/components/c-loading-spinner.vue";
import CButton from "@/components/c-button.vue";
import useCustomRouter from "@/hooks/useCustomRouter";

onBeforeMount(() => {
  axios
    .get("http://localhost:3000/api/")
    .then(
      ({ data }) =>
        (subjectInfomations.value.data = data.length ? data : "目前暫無資料")
    );
});

const subjectInfomations = ref({
  data: [] as excelTypes[],
});

const totalAmount = computed(() => {
  if (typeof subjectInfomations.value.data === "object")
    return subjectInfomations.value.data.reduce(
      (acc, obj) => (acc += obj.total),
      0
    );
  return "--";
});

const customRouter = useCustomRouter();

provide("subjectInfomations", subjectInfomations);
</script>

<style lang="scss" scoped>
.month {
  height: 70px;
  left: 0px;
  right: 0px;
  top: 120px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background-color: var(--background-color-primary);
  padding-top: 10px;
  box-sizing: border-box;

  & h4 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 900;
  }

  & p {
    font-family: Noto Sans CJK TC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0px;
    color: #51519b;
  }
}
</style>
