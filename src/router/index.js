import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/components/Auth.vue';
import NotFound from '@/views/Home/NotFound.vue';
import ItemComponent from '@/components/ItemComponent.vue';
import { useUserStore } from '@/stores';

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Home/HomeView.vue'),
    },
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
            {
                path: '/register',
                name: 'Register',
                component: () => import('@/views/auth/RegisterView.vue'),
            },
        ],
    },

    {
        path: '/items',
        name: 'Items',
        component: ItemComponent,
        children: [
            {
                path: '',
                component: () => import('@/views/Items/IndexView.vue'),
            },
            {
                path: 'add',
                name: 'AddItem',
                component: () => import('@/components/Items/AddItem.vue'),
            },
        ],
    },
    {
        path: '/item/:id',
        name: 'Item',
        component: ItemComponent,
        children: [
            {
                path: '',
                name: 'Iteminfo',
                component: () => import('@/components/Items/ViewItem.vue')
            },
            {
                path: 'edit',
                name: 'EditItem',
                component: () => import('@/components/Items/EditItem.vue'),
            },
            {
                path: 'delete',
                name: 'DeleteItem',
                component: () => import('@/components/Items/DeleteItem.vue'),
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
    const auth = useUserStore();
    if (authRequired && !auth.isLoggenIn) {
        const token = localStorage.getItem('Authorization');
        if (token) {
            auth.setBearerToken(token);
            const user = await auth.fetchUserData();
            if (user) return { path: to.fullPath };
            else return { name: 'Login' };
        }
        return { name: 'Login' };
    }
});

export default router;
