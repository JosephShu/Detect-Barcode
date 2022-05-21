<template>
  <c-list-container>
    <template v-if="renderState.data[0].id">
      <router-link
        v-for="obj in renderState.data"
        :key="obj.id"
        class="list_item"
        :to="{
          name: 'DetailAndExcel',
          params: { id: JSON.stringify(obj.id) },
        }"
      >
        <div class="list_item_info">
          <section class="flx-alg-center list_item_info_section">
            <c-date
              :month="new Date(obj.time).getMonth() + 1"
              :date="new Date(obj.time).getDate()"
            />
            <span class="list_item_info_type">{{ obj.purpose }}</span>
          </section>
          <section class="list_item_info_section">
            <span class="list_item_info_description">
              {{ obj.subject || "尚未設定科目" }}
            </span>
            <span class="list_item_info_sellerName">
              {{ obj.use || "無詳細資料" }}
            </span>
          </section>
        </div>

        <div class="list_item_amount">
          <span>
            {{ obj.total ? (obj.total * 1).toLocaleString() : "--" }}元
          </span>
        </div>
      </router-link>
    </template>
    <h1 class="abs-center" style="color: #999" v-else>查無資料</h1>
  </c-list-container>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { excelTypes } from "@/types";
import CDate from "@/components/c-date.vue";
import CListContainer from "@/components/c-list-container.vue";

interface renderTypes {
  data: excelTypes[];
}

const renderState = inject("subjectInfomations") as renderTypes;
</script>

<style lang="scss" scopde>
.flx-alg-center {
  align-items: center;
}

.list {
  &_item {
    height: 60px;
    width: 100%;
    max-width: 768px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    text-decoration: none;

    &_info {
      display: flex;
      margin: 0 10px;

      &_section {
        display: flex;
        flex-direction: column;
      }

      &_type {
        width: 140px;
        border-radius: 8px;
        font-size: 10px;
        text-align: center;
        margin-top: 2px;
        background-color: var(--background-color-primary);
        color: #222;
      }

      &_description {
        margin-left: 5px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        color: #37375a;
      }

      &_sellerName {
        margin-left: 5px;
        font-weight: 400;
        color: #999999;
      }
    }
    &_amount {
      margin: 0 10px;
      color: #222;
      & span {
        font-family: Noto Sans CJK TC;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
</style>
