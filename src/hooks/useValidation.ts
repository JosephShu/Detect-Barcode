const validationHandler = function (types: RegExp, e: Event) {
  const el = e.target as HTMLInputElement;

  if (!el.value.match(new RegExp(types)) || el.value.length === 0)
    el.style.border = "1px solid #e74c3c";
  else el.style.border = "1px solid #7bed9f ";
};

export default validationHandler;
