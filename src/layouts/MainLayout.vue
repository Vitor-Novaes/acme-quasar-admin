<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
        q-toolbar-title ACME
        q-space
        div(class="q-gutter-sm row items-center no-wrap")
          q-btn(round dense flat color="white" icon="fab fa-github" type="a" href="https://github.com/Vitor-Novaes" target="_blank")

          //- q-btn(round flat)
          //- q-avatar(size="26px")
          //- img(src="https://cdn.quasar.dev/img/boy-avatar.png")

      q-drawer.bg-primary.text-white(v-model='leftDrawerOpen' show-if-above='' bordered='')
        q-list
          q-item(to='/' active-class='q-item-no-link-highlighting')
            q-item-section(avatar='')
              q-icon(name='dashboard')
            q-item-section
              q-item-label Dashboard
          q-item(to='/orders' active-class='q-item-no-link-highlighting')
            q-item-section(avatar='')
              q-icon(name='dashboard')
            q-item-section
              q-item-label Orders
          q-expansion-item(icon='pages' label='Products')
            q-list.q-pl-lg
              q-item(to='/products' active-class='q-item-no-link-highlighting')
                q-item-section(avatar='')
                  q-icon(name='list')
                q-item-section
                  q-item-label List
              q-item(to='/variants' active-class='q-item-no-link-highlighting')
                q-item-section(avatar='')
                  q-icon(name='lock')
                q-item-section
                  q-item-label Themes
              q-item(to='/categories' active-class='q-item-no-link-highlighting')
                q-item-section(avatar='')
                  q-icon(name='lock')
                q-item-section
                  q-item-label Categories
          q-item(to='/client' active-class='q-item-no-link-highlighting')
            q-item-section(avatar='')
              q-icon(name='person')
            q-item-section
              q-item-label Clients
      q-page-container(class="bg-grey-2")
        router-view
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
