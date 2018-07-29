
//сборка iview
import Vue from 'vue';
import iView from 'iview';

// import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
// import './locale/index.js';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
// Vue.use(iView);
// import { VirtualScroller } from 'vue-virtual-scroller';
import locale from 'iview/dist/locale/uk-UA';
Vue.use(iView, { locale });
import {router} from './router/index';
// добавил Войцеховский
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import VModal from 'vue-js-modal';
Vue.use(VModal);

import Viewer from 'v-viewer';
Vue.use(Viewer);

import VueTippy from 'vue-tippy'
Vue.use(VueTippy)




// Vue.use(iView, { locale });
// Vue.component('virtual-scroller', VirtualScroller);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
    },
    created () {

    }
});

Vue.config.lang = '';
