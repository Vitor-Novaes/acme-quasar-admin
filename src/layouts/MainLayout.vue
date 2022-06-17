<template>
  <q-layout id="mainLayout" view="lHh Lpr lFf">
    <q-header elevated="elevated">
      <q-toolbar>
        <q-btn flat="flat" dense="dense" round="round" @click="toggleLeftDrawer" icon="menu" aria-label="Menu"></q-btn>
        <q-toolbar-title>ACME</q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round="round" dense="dense" flat="flat" color="white" icon="fab fa-github" type="a"
            href="https://github.com/Vitor-Novaes" target="_blank"></q-btn>
        </div>
      </q-toolbar>
      <q-drawer class="text-grey-10" v-model="leftDrawerOpen" show-if-above="" bordered="">
        <q-list>
          <q-item to="/" active-class="q-item-no-link-highlighting">
            <q-item-section avatar="">
              <q-icon name="dashboard"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/orders" active-class="q-item-no-link-highlighting">
            <q-item-section avatar="">
              <q-icon name="dashboard"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Orders</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item icon="pages" label="Products">
            <q-list class="q-pl-lg">
              <q-item to="/products" active-class="q-item-no-link-highlighting">
                <q-item-section avatar="">
                  <q-icon name="list"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>List</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/variants" active-class="q-item-no-link-highlighting">
                <q-item-section avatar="">
                  <q-icon name="lock"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Themes</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/categories" active-class="q-item-no-link-highlighting">
                <q-item-section avatar="">
                  <q-icon name="lock"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Categories</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-item to="/client" active-class="q-item-no-link-highlighting">
            <q-item-section avatar="">
              <q-icon name="person"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Clients</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </q-header>
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data: () => ({
    leftDrawerOpen: false,
  }),
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>
