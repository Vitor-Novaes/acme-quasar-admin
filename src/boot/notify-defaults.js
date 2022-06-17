import { Notify } from 'quasar';

Notify.setDefaults({
  position: 'bottom',
  color: 'negative',
  timeout: 1500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }],
});
