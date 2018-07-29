import Vue from 'vue';
import Locales from './locale';
import uaLocale from 'iview/src/locale/lang/uk-UA';
import ruLocale from 'iview/src/locale/lang/ru-RU';

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'uk-UA' || navLang === 'ru-RU') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'uk-UA';
//
Vue.config.lang = lang;
console.log('Vue.config.lang = ' + lang);
//
// // 多语言配置
const locales = Locales;
const mergeUA = Object.assign(uaLocale, locales['uk-UA']);
const mergeRU = Object.assign(ruLocale, locales['ru-RU']);
Vue.$i18n.setLocaleMessage('uk-UA', mergeUA);
Vue.$i18n.setLocaleMessage('ru-RU', mergeRU);
console.log('Vue.locale  load');