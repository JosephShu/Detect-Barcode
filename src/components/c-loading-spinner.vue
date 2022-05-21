<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  border: 5px solid #ddd;
  border-top: 5px solid var(--background-color-primary);
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
