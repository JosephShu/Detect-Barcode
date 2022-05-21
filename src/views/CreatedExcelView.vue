<template>
  <c-header title="詳細內容" :icon="true"></c-header>
  <c-container style="background: #eee" :justify-content="true">
    <c-list-container
      style="background: #fff"
      :center="states.id ? false : true"
    >
      <template v-if="states.id">
        <div class="title-container">
          <c-date
            class="custom-date-position"
            :year="new Date(states.time).getFullYear()"
            :month="new Date(states.time).getMonth() + 1"
            :date="new Date(states.time).getDate()"
          />
          <p class="subject-style">{{ states.subject }}</p>
          <p class="purpose-style">{{ states.purpose }}</p>
          <p>{{ states.use }}</p>
        </div>
        <div class="detail-container">
          <div class="details-name">
            <p>名稱</p>
            <p>數量</p>
            <p>單價</p>
            <p>總價</p>
          </div>

          <div class="details" v-for="obj in states.product" :key="obj.name">
            <p>
              {{ obj.name }}
            </p>
            <p>
              {{ obj.quantity }}
            </p>
            <p>
              {{ obj.amount }}
            </p>
            <p>
              {{ obj.subTotal }}
            </p>
          </div>
          <div class="detail-total">
            <p>{{ stringTotal }}元</p>
          </div>
        </div>
        <c-button @click="download" class="button-position" content="下載" />
      </template>
      <c-loading-spinner v-else />
    </c-list-container>
  </c-container>
</template>

<script lang="ts" setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import CHeader from "@/components/c-header.vue";
import CContainer from "@/components/c-container.vue";
import CListContainer from "@/components/c-list-container.vue";
import CLoadingSpinner from "@/components/c-loading-spinner.vue";
import CButton from "@/components/c-button.vue";
import CDate from "@/components/c-date.vue";
import { productStatesTypes } from "@/types";
import { computed } from "@vue/reactivity";

interface types {
  subject: string;
  purpose: string;
  use: string | null;
  product: productStatesTypes[];
  time: string;
  id: number | string;
  total: number;
}

const states = ref<types>({
  subject: "",
  purpose: "",
  use: "" || null,
  product: [],
  time: "",
  id: "",
  total: 0,
});

const stringTotal = computed(() => {
  return states.value.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

onBeforeMount(() => {
  const route = useRoute();

  axios(`http://localhost:3000/api/${route.params.id}`).then(
    (res) => (states.value = res.data)
  );
});

const download = async function () {
  try {
    const { use, purpose, subject, product } = states.value;

    const items = JSON.parse(JSON.stringify(product));

    items.map((obj: any) => {
      delete obj.subTotal;

      return obj;
    });

    const res = axios.post(`http://localhost:8080/api`, {
      use,
      purpose,
      subject,
      items,
    });

    const { data } = await res;
    const a = document.createElement("a");
    a.href = data.url;

    a.click();
  } catch (err) {
    alert(err);
  }
};
</script>

<style lang="scss" scoped>
.title-container {
  position: relative;
  height: 150px;
  padding: 20px;

  &::before {
    content: "";
    position: absolute;
    width: 60%;
    height: 3px;
    background-color: #eee;
    bottom: 0;
    left: 0;
  }

  & .custom-date-position {
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: 25px;
  }

  & > p {
    font-size: 20px;
    margin-top: 15px;
  }
}

.detail-container {
  position: relative;

  & > div {
    position: relative;
    display: flex;
    justify-content: space-around;

    & > p {
      width: calc(25% - 5px);
      text-align: center;
    }
  }

  & .details-name {
    margin: 20px 0;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #eee;
      bottom: -5px;
      left: 0;
    }
  }

  & .detail-total {
    margin-top: 40px;
    justify-content: end;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #eee;
      top: -10px;
      left: 0;
    }
  }
}

.button-position {
  position: absolute;
  right: 30px;
  bottom: 40px;
}
</style>
