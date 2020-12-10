<template>
  <v-app>
    <v-app-bar
      fixed
      app
      class="elevation-0 primary"
    >
    <v-menu offset-y>
      <template v-slot:activator="{on,attrs}">
        <v-btn 
        icon 
        color="secondary" 
        v-bind="attrs"
        v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
<v-list v-if="$auth.loggedIn">
    <v-list-item v-for="(item, index) in optionsLoggedIn" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
</v-list>
<v-list v-else>
    <v-list-item v-for="(item, index) in optionsAnonymously" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
</v-list>

</v-menu>
</v-app-bar>
<v-main>
    <v-container class="pa-0 ma-0">
        <nuxt />
    </v-container>
</v-main>
</v-app>
</template>

<script>
    export default {
        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                optionsLoggedIn: [{
                    title: 'Click Me'
                }, {
                    title: 'Click Me'
                }, {
                    title: 'Click Me'
                }, {
                    title: 'Click Me 2'
                }, ],
                optionsAnonymously: [{
                    title: 'Click Me'
                }, {
                    title: 'Click Me'
                }, ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'
            }
        }
    }
</script>