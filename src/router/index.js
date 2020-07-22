import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HomeTwo from "../views/HomeTwo.vue";
import About from "../views/About.vue";
import Signin from "../views/Signin.vue";
import Register from "../views/Register.vue";
import EditContact from "../views/EditContact.vue";
import Profile from "../views/Profile.vue";
import ImportContacts from "../views/ImportContacts.vue";
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/home-two",
    name: "HomeTwo",
    component: HomeTwo
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/edit/:contact_id/:task",
    name: "EditContact",
    component: EditContact,
    meta: { requiresAuth: true }
  },
  {
    path: "/import-contacts",
    name: "ImportContacts",
    component: ImportContacts,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  // console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
