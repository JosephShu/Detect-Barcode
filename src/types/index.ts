interface invoiceTypes {
  type: string;
  placeholder: string;
  class: string;
  value: string;
  minlength: number;
  maxlength: number;
  validation: string | number;
}

interface selectionTypes {
  options: string[];
}

interface excelTypes {
  id: string;
  subject: string;
  purpose: string;
  use: string | null;
  time: string;
  total: number;
}

interface productStatesTypes {
  name: string;
  quantity: number;
  amount: number;
  subTotal: number;
}

export { invoiceTypes, selectionTypes, excelTypes, productStatesTypes };
