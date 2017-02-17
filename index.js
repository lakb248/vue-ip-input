import Vue from 'vue';
import vueIpInput from './src/vue-ip-input.vue';

new Vue({
    el: '#container',
    components: {
        'vue-ip-input': vueIpInput
    },
    data() {
        return {
            ip: '127.0.0.1'
        };
    },
    methods: {
        ipChange(ip) {
            this.ip = ip;
        },
        changeIp() {
            this.ip = '1.1.1.1';
        }
    }
});
