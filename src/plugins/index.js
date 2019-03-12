import vueNativeShare from './vue-native-share.vue';

export default vueNativeShare;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('vue-native-share', vueNativeShare);
}