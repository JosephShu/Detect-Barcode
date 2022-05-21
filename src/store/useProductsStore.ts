import { defineStore } from "pinia";
import { productStatesTypes } from "@/types";

export const useProductsStore = defineStore("product", {
  state: () => {
    return {
      product: [] as productStatesTypes[],
    };
  },
  actions: {
    addProducts(newValue: productStatesTypes | productStatesTypes[]) {
      if (!Array.isArray(newValue)) this.product = [...this.product, newValue];

      if (Array.isArray(newValue) && newValue.length)
        this.product = [...this.product, ...newValue];
    },
    deleteProducts(id: string) {
      this.product = this.product.filter((obj, i) => obj.name + i !== id);
    },
    clearProducts() {
      this.product = [];
    },
  },
});
