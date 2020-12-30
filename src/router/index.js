import Vue from "vue";
import VueRouter from "vue-router";

// Example of importing smaller modules
// import exampleRouter from "./modules/example.js"

Vue.use(VueRouter);

const routes = [
  // exampleRouter,       // example of importing modules
  // {
  //   path: "/home",
  //   name: "home",
  //   component: () => import("../views/home.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },

  {
    path: "/",
    name: "home",
    component: () => import("../views/home/home.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.idToken) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
