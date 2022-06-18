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
          <q-btn size="lg" class="q-mr-sm" color="grey-9" @click="dialogImport" btn-lg icon="upload">
            Import CSV
          </q-btn>
        </div>
      </div>
    </div>

    <div class="col-sm-12 q-my-xl q-mx-xl">
      <div class="row q-my-md justify-between q-mx-md">
        <div class='text-h4 text-left text-weight-bold q-pb-sm q-mt-xl'> Only for better model visualization</div>
      </div>
      <q-separator inset />
      <div class="row q-my-md justify-between q-mx-md">
        <div class='text-h6 text-left text-weight-bold q-pb-sm q-mt-xl'>
          PATCH/DELETE/POST aren't implemented here yet. Please access API documentation in that button
        </div>
        <div class='q-pb-sm q-mt-xl'>
          <q-btn class="btn-md" label="API DOC" color="primary" target='_blank' @click="gotToDocs" icon="link">
          </q-btn>
        </div>
      </div>
      <q-separator inset />
      <div class="row q-my-md justify-between q-mx-md">
        <div class='text-h6 text-left text-weight-bold q-pb-sm q-mt-xl'> Client Module only API</div>
      </div>
      <q-separator inset />
      <div class="row q-my-md justify-between q-mx-md">
        <div class='text-h6 text-left text-weight-bold q-pb-sm'>Devise auth not implemented</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import { Notify } from 'quasar';

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
    gotToDocs() {
      return window.open('https://documenter.getpostman.com/view/5798364/UzBmM6xj', '_blank').focus()
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
