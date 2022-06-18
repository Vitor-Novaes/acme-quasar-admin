
<template>
  <q-page id="orders" padding>
    <q-dialog v-model="openDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"> Do you really sure to delete this order ?</span>
          <q-card-actions align="right">
            <q-btn flat label="Back" color="primary" v-close-popup></q-btn>
            <q-btn flat label="Delete" color="primary" v-close-popup @click='deleteOrder(itemId)'></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class='text-h4 text-center text-weight-bold q-pb-sm q-mt-xl'> Orders</div>
    <filterCustom class="q-my-md"
      @searchValues="onRequest"
      @reset="reset"
      @clearField="cleanByField"
      resource="Orders"
    />
    <div class="col-12 flex flex-center q-py-md text-left">
      <div class="col">
        <q-btn size="lg"
          class="q-mr-sm"
          flat color="grey-9"
          @click="goToNewOrder"
          btn-lg
        >
          Create Order
        </q-btn>
      </div>
    </div>
    <div class="row q-mx-xl q-my-xl">
      <div class="col-xs-12 col-sm-12 col-md-12">
        <q-table
          color="secondary"
          class="bg-grey-4"
          row-key="id"
          binary-state-sort
          :loading="loading"
          :rows-per-page-options=[10,15,25,50]
          :pagination.sync="pagination"
          @request="onRequest"
          :columns="columns"
          :data="this.getOrders"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <span>{{ col.value }}</span>
              </q-td>
              <q-td auto-width>
                 <q-btn
                  size="md"
                  font-size="sm"
                  color="primary"
                  label="Details"
                  flat
                  icon="link"
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
          name: 'code',
          label: 'Code',
          field: 'code',
          align: 'left',
          sortable: false,
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          type: 'text',
          value: 'status',
          align: 'center',
        },
        {
          name: 'net_value',
          label: 'Value',
          field: 'net_value',
          type: 'text',
          value: 'net_value',
          align: 'left',
          format: net_value => currencyFormat(net_value)
        },
        {
          name: 'payment_date',
          label: 'Pay day',
          field: 'payment_date',
          align: 'center',
          format: payment_date => date.formatDate(payment_date, 'MM/DD/YYYY - HH:mm')
        },

      ],
      pagination: {
        rowsPerPage: 15,
        page: 1,
        rowsNumber: 30,
      },
      search: {
        category: null ,
        sort: null,
        status: null,
      },
      itemId: null,
      openDialog: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('orders', ['getOrders', 'getOrdersPaginate'])
  },
  methods: {
    ...mapActions('orders', [
      'fetchOrders',
      'deleteOrder',
      'uploadOrders',
    ]),

    async deleteOrder(id) {
      try {
        await this.deleteOrder(id);
        Notify.create({
          message: 'Delete successfully',
          color: 'positive',
        });
        this.openDialog = false;
        this.$router.push({ name: 'orders-list' });
      } catch (error) {
        Notify.create({
          message: error,
          color: 'negative',
        });
      }
    },

    dialogConfirmation(id) {
      this.itemId = id;
      this.openDialog = true;
    },
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
      if (props.search) this.search.status = props.search.status;
      await this.getOrdersBack({
        pagination: this.pagination,
        search: this.search,
      });
    },
    async reset() {
      await this.getOrdersBack();
    },
    async getOrdersBack(props) {
      try {
        this.loading = true;
        await this.fetchOrders(props);
        this.pagination.rowsNumber = this.getOrdersPaginate.total_count;
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
      this.$router.push({ name: 'order-details', params: { id: props.id } });
    },
    goToNewOrder() {
      this.$router.push({ name: 'order-new' });
    }
  },
  async mounted() {
    await this.onRequest({ pagination: this.pagination, search: this.search });
  },
};
</script>
