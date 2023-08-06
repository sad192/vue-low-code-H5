import { createApp } from 'vue';
import App from './App.vue';

import { setupElementPlus } from './plugins/element-plus';
import { setupVant } from './plugins/vant';

import 'normalize.css';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import 'animate.css';

import router from './router/';
import { setupStore } from './store/';

const app = createApp(App);

// 配置store
setupStore(app);
// 使用element-plus插件
setupElementPlus(app);
// 使用vant插件
setupVant(app);

app.config.globalProperties.$$refs = {};

// if (import.meta.env.DEV) {
window.$$refs = app.config.globalProperties.$$refs;
// }
app.use(router);
// 路由准备完毕再挂载
// 当路由器解析完和初始路由相关的异步钩子和异步组件时，会返回一个Promise
router.isReady().then(() => app.mount('#app'));
