import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import store from "../store";

const routes = [
    {
        path: "/login",
        name: "Login",
        component:()=> import(/* webpackChunkName: 'login' */'@/views/Login.vue'),
        meta: {guest: true},
    },
    {
        path: '/',
        component:()=> import('@/components/Dash.vue'),
        meta: {requiresAuth: true},
        children: [
            {
                path: '/dashboard',
                alias: '',
                component: import(/* webpackChunkName: 'Dashboard' */'@/views/Dashboard.vue'),
                name: 'Dashboard',
                meta: {description: 'Overview of environment'}
            },
            {
                path: '/vehicle-types',
                name: 'Vehicle-types',
                component: () => import(/* webpackChunkName: 'Vehicle-types' */'@/views/VehicleTypeView.vue'),
            },
            {
                path: '/riders',
                name: 'Riders list',
                component: () => import(/* webpackChunkName: 'Riders-list' */'@/views/rider/ListingView'),
            },
            {
                path: '/rider/detail/:id',
                name: 'Rider-detail',
                component: () => import(/* webpackChunkName: 'Rider-detail' */'@/views/rider/DetailsView')
            },
            {
                path: '/vehicle-categories',
                name: 'Vehicle-categories',
                component: () => import(/* webpackChunkName: 'Vehicle-categories' */'@/views/VehicleCategoryView')
            },
            {
                path: '/vehicle-companies',
                name: 'Vehicle-companies',
                component: () => import(/* webpackChunkName: 'Vehicle-companies' */'@/views/VehicleCompaniesView')
            },
        ]
    },

];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next("/");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router
