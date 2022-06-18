<template>
  <q-page id="details" class="q-pa-sm" padding>
    <div class=" justify-center q-pt-md">
      <div class='text-h6 text-center text-weight-bold q-pb-sm q-mt-xl'> {{ getProduct.name }} </div>
      <div class="col-lg-5 col-md-5 col-sm-12 row q-px-xl q-py-xl justify-center">
        <div class="row q-mt-xl">
          <div
            class="col-xs-4 col-lg-3 col-sm-6 col-xs-12 col-md-4"
            v-for="variant in productVariants"
            :key="variant.id"
          >
            <q-card class="q-mx-md q-my-md">
              <q-img :src='variant.image' class="image-cover" />

              <q-card-section>
                <q-btn fab color="primary" class="absolute" :label='formatPrice(variant.value)'
                  style="top: 0; right: 12px; transform: translateY(-50%);" />

                <div class="row no-wrap justify-end">
                  <div class="col-auto text-grey q-pt-md row no-wrap items-center">
                    {{ variant.sales }} Sales
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                  COD: {{ variant.code }}
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat color="negative">
                  Delete
                </q-btn>
                <q-btn flat color="info">
                  Edit
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { currencyFormat } from 'src/helpers/currency';

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: {},
    }
  },
  computed: {
    ...mapGetters('products', ['getProduct']),
    productVariants() {
      return this.getProduct.variants.sort((a, b) => a.sales - b.sales).reverse();
    },
  },
  methods: {
    ...mapActions('products', ['detailsProduct']),
    formatPrice(value) {
      return currencyFormat(value)
    }
  },
  async beforeMount() {
    await this.detailsProduct(this.$route.params);
  },
};
</script>

<style scoped>
#details
  .image-cover {
    object-fit: cover;
    overflow: hidden;
  }
</style>
