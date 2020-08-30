import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueSweetalert2 from 'vue-sweetalert2';
import Notifications from 'vue-notification'
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);
Vue.use(Notifications);

new Vue({
  render: h => h(App),
}).$mount('#app')
