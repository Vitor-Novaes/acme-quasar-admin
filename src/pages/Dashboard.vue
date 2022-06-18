<template>
  <q-page class="bg-grey" id="home" padding="padding">

    <q-dialog v-model="importDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-input @input="val => { file = val[0] }" filled type="file" hint="CSV file" />
          <q-card-actions align="right">
            <q-btn flat label="Back" color="primary" v-close-popup></q-btn>
            <q-btn flat label="Upload" color="primary" v-close-popup @click='submitFile'></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row">
      <div class="col-12 flex flex-center q-py-md text-center">
        <div class="col">
          <q-btn size="lg" class="q-mr-sm" flat color="grey-9" @click="dialogImport" btn-lg>
            Import CSV
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HomeIndex',
  data() {
    return {
      importDialog: false,
      file: null,
    }
  },
  methods: {
    ...mapActions('orders', ['uploadOrders']),
    dialogImport() {
      this.importDialog = true;
    },
    async submitFile() {
      try {
        this.$q.loading.show({
          message: 'Processing Data File. Hang on ...'
        })
        await this.uploadOrders(this.file)

        Notify.create({
          message: 'Uploaded successfully',
          color: 'positive',
        });
      } catch (error) {
        Notify.create({
          message: error.response.data.errors.message,
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide()
      }
    },
  }
}

</script>
