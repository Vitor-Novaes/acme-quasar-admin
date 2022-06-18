
<template>
  <q-page id="orders" padding>
    <div class='text-h4 text-center text-weight-bold q-pb-sm q-mt-xl'> Themes</div>
    <filterCustom class="q-my-md"
      @searchValues="onRequest"
      @reset="reset"
      @clearField="cleanByField"
    />
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
          :data="this.getVariants"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <span v-if="col.name !== 'image'">{{ col.value }}</span>

                <q-avatar rounded v-if="col.name === 'image'" size="5em">
                  <img :src="col.value">
                </q-avatar>
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
import { Notify } from 'quasar';
import { currencyFormat } from 'src/helpers/currency';
import filterCustom from 'src/components/filter';

export default {
  components: { filterCustom },
  data() {
    return {
      columns: [
        {
          name: 'image',
          label: 'Image',
          field: 'image',
          value: 'image',
          align: 'left',
        },
        {
          name: 'code',
          label: 'Code',
          field: 'code',
          align: 'left',
          sortable: false,
        },
        {
          name: 'value',
          label: 'Value',
          field: 'value',
          value: 'value',
          align: 'left',
          format: value => currencyFormat(value)
        },
        {
          name: 'sales',
          label: 'Sales',
          field: 'sales',
          align: 'center',
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
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters('variants', ['getVariants', 'getVariantsPaginate'])
  },
  methods: {
    ...mapActions('variants', ['fetchVariants']),

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
      await this.getVariantsBack({
        pagination: this.pagination,
        search: this.search,
      });
    },
    async reset() {
      await this.getVariantsBack();
    },
    async getVariantsBack(props) {
      try {
        this.loading = true;
        await this.fetchVariants(props);
        this.pagination.rowsNumber = this.getVariantsPaginate.total_count;
      } catch (error) {
        console.log(error);
        Notify.create({
          message: error,
          color: 'negative',
        });
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.onRequest({ pagination: this.pagination, search: this.search });
  },
};
</script>
