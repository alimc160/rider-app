import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import axios from 'axios';
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

window.axios = axios;
// window.axios.defaults.withCredentials = true;


window.axios.defaults.baseURL = 'http://127.0.0.1:8000/';

axios.interceptors.response.use(response => {
    return response;
},error => {
    if (error && error.response.status === 401) {
        store.dispatch("LogOut");
        router.push("/login");
        return Promise.resolve();
    }
    return Promise.reject(error);
})



import loader from '@/components/global/loader.vue';

import {vfmPlugin} from 'vue-final-modal';

import mitt from 'mitt';

const emitter = mitt();
window.Emitter = emitter;

const app = createApp({
    extends: App,
    components: {
        loader,
    },
    data() {
        return {
            isLoading: false,
            axiosInterceptor: null,
        };
    },
    mounted() {
        this.enableInterceptor();

        axios.interceptors.request.use(
            (config) => {
                const token = this.$store.state.auth.auth_token;

                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                return config;
            },

            (error) => {
                return Promise.reject(error);
            }
        );
        // this.$store.dispatch("allUserRolesFromDatabase");
    },
    methods: {
        enableInterceptor() {
            let this1 = this;
            this.axiosInterceptor = window.axios.interceptors.request.use((config) => {
                this.isLoading = true;
                return config;
            }, (error) => {
                this.isLoading = false;
                return Promise.reject(error);
            });

            window.axios.interceptors.response.use((response) => {
                this1.isLoading = false;
                return response;
            }, function (error) {
                this1.isLoading = false;
                return Promise.reject(error);
            })
        },

        disableInterceptor() {
            window.axios.interceptors.request.eject(this.axiosInterceptor);
        },
    },

})
    .use(router)
    .use(store)
    .use(VueSweetalert2)
    .use(vfmPlugin({
        key: '$vfm',
        componentName: 'VueFinalModal',
        dynamicContainerName: 'ModalsContainer'
    }));

/*Vue Select*/
import vSelect from "vue-select";

app.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";
app.use(vue3PhotoPreview);
app.mount('#app')
