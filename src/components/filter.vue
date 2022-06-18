<template>
  <div id="v-filter">
    <div class="row flex justify-center">
      <div class="col-xs-12 col-sm-3 col-md-3 q-ml-lg">
        <q-select
          v-model="search.category"
          filled
          dense
          options-dense
          map-options
          clearable
          label="Category"
          align="center"
          :value="search.category"
          :options="optionsCategories"
          @clear="resetOnClear('search.category')"
        >
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3 q-ml-lg">
        <q-select
          v-model="search.sort"
          clearable
          filled
          dense
          options-dense
          map-options
          emit-value
          label="Sort"
          align="center"
          :value="search.sort"
          :options="optionsSort"
          @clear="resetOnClear('search.sort')"
        >
        </q-select>
      </div>
      <div v-if="resource === 'Orders'" class="col-xs-12 col-sm-3 col-md-3 q-ml-lg">
        <q-select
          v-model="search.status"
          clearable
          filled
          dense
          options-dense
          map-options
          label="Status"
          align="center"
          :value="search.status"
          :options="optionsStatus"
          @clear="resetOnClear('search.status')"
        >
        </q-select>
      </div>
    </div>
    <div class="row col-12 q-mt-lg flex items-baseline justify-center">
      <div class="text-center q-px-md q-my-sm">
        <q-btn
          class="btn-sm"
          label="filter"
          color="primary"
          @click="emitSearchValues"
        ></q-btn>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'filterCustom',
  data() {
    return {
      search: {
        sort: '',
        category: '',
        status: '',
      },
    };
  },
  props: {
    resource: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters('categories', ['getCategories']),
    optionsSort() {
      return [
        { label: 'MOST SOLD', value: 'DESC'},
        { label: 'LESS SOLD', value: 'ASC' },
      ]
    },
    optionsCategories() {
      const categories = this.getCategories;
      return categories.map((category) => category.name);
    },
    optionsStatus() {
      return ['SENT', 'WAITING', 'PRODUCTION', 'CANCELED', 'POSTING']
    }
  },
  async beforeMount() {
    await this.fetchCategories();
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),

    resetOnClear(field) {
      if (!this[field]) {
        this[field] = null;
        this.$emit('clearField', field)
      }
    },
    emitSearchValues() {
      this.$emit('searchValues', {
        search: this.search,
        pagination: {
          rowsPerPage: 15,
          page: 1,
          rowsNumber: 30,
        }
      });
    },
  },
};
</script>

<style lang='stylus'>
#v-filter
  .btn
    width: 150px

</style>
