import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// 서버와 연결할 주소 설정
const serverURL = "http://localhost:3000"; // Express 서버 주소를 설정해주세요

app.config.globalProperties.$serverURL = serverURL;

app.mount("#app");
