/* eslint-disable vue/multi-word-component-names */
import uploader from 'src/uploader';
import store from 'src/store';

let plugin = {};

plugin.install = function (_Vue, _store) {
  _Vue.component('uploader', uploader);
  _store.registerModule('imgstore', store);
};

export default plugin;
