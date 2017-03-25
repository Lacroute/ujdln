import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en.json'
import fr from './fr.json'

let locales = {
  fr: fr,
  en: en
}

Vue.use(VueI18n)
Vue.config.lang = 'fr'

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
