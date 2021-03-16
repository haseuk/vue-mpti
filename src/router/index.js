import Vue from 'vue';
import Router from 'vue-router';
import Intro from "@/components/Intro";
import CardSelect from "@/components/CardSelect";
import Card from "@/components/Card";
import Roulette from "@/components/Roulette";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/intro' },
    { path: '/intro', name: 'intro', component: Intro },
    { path: '/cardSelect', name: 'cardSelect', component: CardSelect },
    { path: '/card/:month', name: 'card', component: Card },
    { path: '/roulette', name: 'roulette', component: Roulette },
  ]
});

export default router;