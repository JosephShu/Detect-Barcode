<template>
  <label class="upload-button">
    <font-awesome-icon class="icon" :icon="['fas', 'file-arrow-up']" />
    <input type="file" ref="input" @change="decryptHandler" />
  </label>
</template>

<script lang="ts" setup>
import { productStatesTypes } from "@/types";
import { useProductsStore } from "@/store/useProductsStore";

if (!("BarcodeDetector" in window)) {
  alert("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");
}

const { addProducts } = useProductsStore();

//eslint-disable-next-line
//@ts-ignore
const barcodeDetector = new window.BarcodeDetector({
  formats: ["code_39", "codabar", "ean_13", "aztec", "data_matrix", "qr_code"],
});

interface barcodeObject {
  boundingBox: any;
  cornerPoints: [];
  format: string;
  rawValue: string;
}

interface invoice {
  characterSet: string;
  itemString: string[];
  items: productStatesTypes[];
}

const iconvBase64 = function (itemString: string[]) {
  for (let i = 0; i < itemString.length; i++) {
    if (i % 3 === 0) {
      itemString[i] = decodeURIComponent(atob(itemString[i]));
    }
  }
  return itemString;
};

const iconvBig5 = async function (itemString: string[]) {
  for (let i = 0; i < itemString.length; i++) {
    if (i % 3 === 0) {
      const buffer = await new Blob([itemString[i]]).arrayBuffer();

      itemString[i] = new TextDecoder("big5").decode(buffer);
    }
  }
  return itemString;
};

const decode = async function (img: HTMLImageElement) {
  const barcodes: barcodeObject[] = await barcodeDetector.detect(img);

  if (!barcodes.length) throw "解密失敗,請確認照片是否平整及清晰";

  let rawValues: string[] = [];

  barcodes.forEach((barcode) => {
    if (barcode.rawValue.slice(0, 2) === "**") {
      rawValues = [...rawValues, barcode.rawValue.trim().slice(2)];
    } else {
      rawValues = [barcode.rawValue.trim(), ...rawValues];
    }
  });

  const qrcodeElements = rawValues.join("").split(":");

  const eInvoice: invoice = {
    characterSet: qrcodeElements[4],
    itemString: qrcodeElements.slice(5),
    items: [],
  };

  //Big 5 --> Utf-8
  if (eInvoice.characterSet === "0") {
    eInvoice.itemString = await iconvBig5(eInvoice.itemString);
  }

  //Base64 --> Utf-8
  if (eInvoice.characterSet === "2") {
    eInvoice.itemString = iconvBase64(eInvoice.itemString);
  }

  const itemTemplate = {
    name: "",
    amount: 0,
    quantity: 0,
    subTotal: 0,
  };

  eInvoice.itemString.forEach((el, i) => {
    if (i % 3 === 0 && el) itemTemplate.name = el;
    if (i % 3 === 1 && el) itemTemplate.quantity = +el;
    if (i % 3 === 2 && el) {
      itemTemplate.amount = +el;
      itemTemplate.subTotal = itemTemplate.amount * itemTemplate.quantity;

      const deepClone = JSON.parse(JSON.stringify(itemTemplate));
      eInvoice.items = [...eInvoice.items, deepClone];
    }
  });

  return eInvoice;
};

const createImg = function (files: FileList) {
  return new Promise((resolve) => {
    const img = document.createElement("img");

    if (!FileReader || !files || !files.length) return;
    const fr = new FileReader();
    fr.onload = () => {
      img.src = fr.result as string;

      resolve(img);
    };
    fr.readAsDataURL(files[0]);
  });
};

const decryptHandler = async function (e: Event) {
  try {
    const el = e.target as HTMLInputElement;
    const files = el.files as FileList;
    const extension = files[0].name.split(".").pop() as string;

    if (extension !== "jpg" && extension !== "png")
      throw "請確認上傳的檔案類型";

    const img = (await createImg(files)) as HTMLImageElement;

    const { items } = await decode(img);

    addProducts(items);
  } catch (err) {
    alert(err);
  }
};
</script>

<style lang="scss" scoped>
.upload-button {
  position: absolute;
  right: -100px;
  width: 30px;
  height: 30px;
  font-size: 15px;
  background-color: var(--background-color-primary);
  border-radius: 100px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

  & > .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & input {
    transform: translateY(500%);
    opacity: 0;
    visibility: 0;
  }
}
</style>
