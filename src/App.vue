<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

.navbar {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 5px;
    text-decoration: none;

    &.router-link-exact-active {
      color: var(--background-color-primary);
      text-decoration: underline;
    }
  }
}
</style>
