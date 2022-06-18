<template>
  <q-page id="details" class="q-pa-sm" padding>
    <div class="col-sm-12 q-my-xl q-mx-xl">
      <div class="row q-my-md justify-between q-mx-md">
        <div class='text-h4 text-left text-weight-bold q-pb-sm q-mt-xl'> CODE: {{ getOrder.code }} </div>
        <div class='q-pb-sm q-mt-xl'>
          <q-chip class="text-left text-weight-bold float-right text-white text-capitalize" :label="getOrder.status"
            color="primary"></q-chip>
        </div>
      </div>
      <q-separator inset />
      <div class="q-my-md justify-left q-ml-md">
        <span>{{ getOrder.client.name }}: {{ getOrder.client.email }}</span>
      </div>
      <div class="row col-lg-5 col-md-5 col-sm-12 q-px-xl q-py-xl justify-left">
        <div class="col-xs-4 col-lg-3 col-sm-6 col-md-4" v-for="register in getOrder.registers">
          <q-card class="q-mx-md q-my-md">
            <q-img :src='register.product.variant.image' class="image-cover" />

            <q-card-section>
              <q-btn fab color="primary" class="absolute" :label='formatPrice(register.product.variant.value)'
                style="top: 0; right: 12px; transform: translateY(-50%);" />

              <div class="row no-wrap justify-end">
                <div class="col-auto text-grey q-pt-md row no-wrap items-center">
                  {{ register.quantity }}x Quantity
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-h6" style="font-size: medium;">
                Product: {{ register.product.name }}
              </div>
              <q-separator inset />
              <div class="text-overline q-mt-md">
                Theme: {{ register.product.variant.code }}
              </div>
            </q-card-section>
            <q-card-actions vertical class="justify-around">
              <q-btn flat> {{ formatPrice(register.quantity * register.product.variant.value) }} </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="flex justify-end q-px-md q-py-md">
        <div class="col-sm-12 col-md-3 text-h6 text-weight-bold text-grey-9">
          Total Value: {{ formatPrice(getOrder.net_value) }}
        </div>
      </div>
      <div class="flex justify-end q-px-md q-py-md">
        <q-btn
          label="Back"
          flat
          color="primary"
          @click="$router.push({ name: 'orders-list' })"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { currencyFormat } from 'src/helpers/currency';

export default {
  name: 'OrderDetails',
  data() {
    return {
      order: {},
    }
  },
  computed: {
    ...mapGetters('orders', ['getOrder']),
    // productVariants() {
    //   return this.getProduct.variants.sort((a, b) => a.sales - b.sales).reverse();
    // },
  },
  methods: {
    ...mapActions('orders', ['detailsOrder']),
    formatPrice(value) {
      return currencyFormat(value)
    }
  },
  async beforeMount() {
    await this.detailsOrder(this.$route.params);
  },
};
</script>

<style scoped>
#details .image-cover {
  object-fit: cover;
  overflow: hidden;
}
</style>
