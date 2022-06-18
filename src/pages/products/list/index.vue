
<template>
  <q-page id="products" padding>
    <div class='text-h4 text-center text-weight-bold q-pb-sm q-mt-xl'> Products</div>
    <filterCustom class="q-my-md"
      @searchValues="onRequest"
      @reset="reset"
      @clearField="cleanByField"
    />
    <div class="row q-mt-xl">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <q-table
          class="bg-grey-4"
          color="secondary"
          row-key="id"
          binary-state-sort
          :loading="loading"
          :rows-per-page-options=[10,15,25,50]
          :pagination.sync="pagination"
          @request="onRequest"
          :columns="columns"
          :data="this.getProducts"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <span>{{ col.value }}</span>
              </q-td>
              <q-td auto-width>
                 <q-btn
                  size="sm"
                  color="primary"
                  label="Details"
                  flat
                  dense
                  @click="goToDetails(props.row)"
                 ></q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Notify, date } from 'quasar';
import { currencyFormat } from 'src/helpers/currency';
import filterCustom from 'src/components/filter';

export default {
  components: { filterCustom },
  data() {
    return {
      columns: [
        {
          name: 'total_sales',
          label: 'Sales',
          field: 'total_sales',
          value: 'total_sales',
          align: 'center',
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          sortable: false,
        },
        {
          name: 'base_value',
          label: 'Base Value',
          field: 'base_value',
          value: 'base_value',
          align: 'left',
          format: base_value => currencyFormat(base_value)
        },
        {
          name: 'created_at',
          label: 'Created',
          field: 'created_at',
          align: 'left',
          format: created_at => date.formatDate(created_at, 'MM/DD/YYYY - HH:mm')
        },

      ],
      file: null,
      pagination: {
        rowsPerPage: 15,
        page: 1,
        rowsNumber: 30,
      },
      search: {
        category: null ,
        sort: null,
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters('products', ['getProducts', 'getProductsPaginate'])
  },
  methods: {
    ...mapActions('products', [
      'fetchProducts',
    ]),
    cleanByField(field) {
      this[field] = null;
    },
    async onRequest(props) {
      const {
        page,
        rowsPerPage,
      } = props.pagination;

      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      if (props.search) this.search.sort = props.search.sort;
      if (props.search) this.search.category = props.search.category;
      await this.getProductsBack({
        pagination: this.pagination,
        search: this.search,
      });
    },
    async reset() {
      await this.getProductsBack();
    },
    async getProductsBack(props) {
      try {
        this.loading = true;
        await this.fetchProducts(props);
        this.pagination.rowsNumber = this.getProductsPaginate.total_count;
      } catch (error) {
        Notify.create({
          message: error,
          color: 'negative',
        });
      } finally {
        this.loading = false;
      }
    },
    goToDetails(props) {
      this.$router.push({ name: 'product-details', params:{ id: props.id } });
    },
  },
  async mounted() {
    await this.onRequest({ pagination: this.pagination, search: this.search });
  },
};
</script>
