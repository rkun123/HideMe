<template>
  <v-app id="app">
    <v-app-bar
      app
      dense
      color="deep-purple accent-4"
    >
      <v-icon>mdi-heart</v-icon>
      <v-toolbar-title>Hide Me</v-toolbar-title>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
