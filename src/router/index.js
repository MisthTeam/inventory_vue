import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/components/Auth.vue';
import NotFound from '@/views/Home/NotFound.vue';

const routes = [
    {
        path: '/auth',
        name: 'Auth',
        component: AuthView,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/auth/LoginView.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired) {
        return { name: 'Login' };
    }
});

export default router;
