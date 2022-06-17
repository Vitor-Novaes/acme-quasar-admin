
<template lang="pug">
  q-page#orders(padding)
    q-dialog(v-model="openDialog" persistent)
      q-card
        q-card-section(class="row items-center")
          span(class="q-ml-sm") Do you really sure to delete this order ?

        q-card-actions(align="right")
          q-btn(flat label="Back" color="primary" v-close-popup)
          q-btn(
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click='deleteOrder(itemId)'
          )
    .text-h4.text-center.text-weight-bold.q-pb-sm.q-mt-xl Orders
    .col
      q-btn.q-mr-sm(
        flat
        round
        color="primay"
        @click="$router.push({ name: 'new-order' })") New Order
    .row.q-mt-xl
      .col-xs-4.col-sm-6.col-md-4(
        v-for="(item) in getOrders"
      )
        q-card.q-my-md.q-mx-md(
          flat bordered
          class='bg-primary text-white'
        )
          q-card-section
            .text-h6 {{ item.name }}
          q-card-actions(align="right")
            q-btn(
              flat
              @click="dialogConfirmation(item.id)") Delete
            q-btn(
              flat
              @click="$router.push({ name: 'show-doctor', params: { id: item.id } })") Show
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Notify } from 'quasar';

export default {
  data() {
    return {
      itemId: null,
      openDialog: false,
    };
  },
  computed: {
    ...mapGetters('order', ['getOrders'])
  },
  methods: {
    ...mapActions('order', [
      'fetchOrder',
      'deleteOrder',
    ]),

    async deleteOrder(id) {
      try {
        await this.deleteOrder(id);
        Notify.create({
          message: 'Delete successfully',
          color: 'positive',
        });
        this.openDialog = false;
        // this.$router.push({ name: 'orders-list' });
      } catch (error) {
        Notify.create({
          message: error,
          color: 'positive',
        });
      }
    },
    dialogConfirmation(id) {
      this.itemId = id;
      this.openDialog = true;
    },
  },
  async beforeMount() {
    await this.fetchOrders();
  },
};
</script>
