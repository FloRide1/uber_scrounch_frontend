import 'vuetify/styles'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi-svg'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    icons: { defaultSet: 'fa', aliases, sets: { mdi, md, fa } },
    components,
    directives,
    theme: { defaultTheme: 'dark' }
})
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')
