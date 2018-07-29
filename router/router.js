import Main from '../views/Main.vue';


export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: 'Главная',
            name: 'home_index',
            component: resolve => {
                require(['../views/pages/home.vue'], resolve);
            }
        },
        {
            path: 'reset',
            title: 'Главная',
            name: 'reset',
            component: resolve => {
                require(['../views/auth/reset.vue'], resolve);
            }
        },
        {
            path: 'contacts',
            title: 'Контакты',
            name: 'contacts',
            component: resolve => {
                require(['../views/pages/contacts.vue'], resolve);
            }
        },
        {
            path: 'volunteering',
            title: 'Волонтерство',
            name: 'volunteering',
            component: resolve => {
                require(['../views/pages/volunteering.vue'], resolve);
            }
        },
        {
            path: 'about',
            title: 'Про нас',
            name: 'about',
            component: resolve => {
                require(['../views/pages/about.vue'], resolve);
            }
        },
        {
            path: 'news',
            title: 'новини',
            name: 'news',
            component: resolve => {
                require(['../views/news/news.vue'], resolve);
            }
        },
        {
            path: 'rating',
            title: 'Рейтинг',
            name: 'rating',
            component: resolve => {
                require(['../views/pages/rating.vue'], resolve);
            }
        },
        {
            path: 'rating/:id',
            title: 'Історія успіху',
            name: 'success_story',
            component: resolve => {
                require(['../views/pages/success_story.vue'], resolve);
            }
        },
        {
            path: 'volunteer/:id',
            title: 'Профіль волонтера',
            name: 'profile_volunteer',
            component: resolve => {
                require(['../views/pages/profile_volunteer.vue'], resolve);
            }
        },
        {
            path: 'news/:id',
            title: 'Вход',
            name: 'single_news',
            component: resolve => {
                require(['../views/news/single_news.vue'], resolve);
            }
        },
        {
            path: 'terms',
            title: 'Контакты',
            name: 'terms',
            component: resolve => {
                require(['../views/pages/terms.vue'], resolve);
            }
        },
        {
            path: 'policy',
            title: 'Контакты',
            name: 'policy',
            component: resolve => {
                require(['../views/pages/policy.vue'], resolve);
            }
        },
        {
            path: 'map',
            title: 'Карта',
            name: 'map',
            component: resolve => {
                require(['../views/pages/map.vue'], resolve);
            }
        },
        {
            path: 'register/customer',
            title: 'Регистрация заказчика',
            name: 'register_customer',
            component: resolve => {
                require(['../views/auth/register_customer.vue'], resolve);
            }
        },
        {
            path: 'register/volunteer',
            title: 'Регистрация волонтера',
            name: 'register_volunteer',
            component: resolve => {
                require(['../views/auth/register_volunteer.vue'], resolve);
            }
        },
        {
            path: 'customer_profile',
            title: 'Вход',
            name: 'customer_profile',
            component: resolve => {
                require(['../views/customer/profile.vue'], resolve);
            }
        },
        {
            path: 'customer_tasks',
            title: 'Вход',
            name: 'customer_tasks',
            component: resolve => {
                require(['../views/customer/tasks.vue'], resolve);
            }
        },
        {
            path: 'customer_add_task',
            title: 'Вход',
            name: 'customer_add_task',
            component: resolve => {
                require(['../views/customer/new_task.vue'], resolve);
            }
        },
        {
            path: 'customer_update_task/:id',
            title: 'Вход',
            name: 'customer_update_task',
            component: resolve => {
                require(['../views/customer/update_task.vue'], resolve);
            }
        },
        {
            path: 'customer_single_task/:id',
            title: 'Вход',
            name: 'customer_single_task',
            component: resolve => {
                require(['../views/customer/single_task.vue'], resolve);
            }
        },
        {
            path: 'customer_map',
            title: 'Вход',
            name: 'customer_map',
            component: resolve => {
                require(['../views/customer/map.vue'], resolve);
            }
        },
        {
            path: 'volunteer_profile',
            title: 'Вход',
            name: 'volunteer_profile',
            component: resolve => {
                require(['../views/volunteer/profile.vue'], resolve);
            }
        },
        {
            path: 'volunteer_tasks',
            title: 'Вход',
            name: 'volunteer_tasks',
            component: resolve => {
                require(['../views/volunteer/tasks.vue'], resolve);
            }
        },
        {
            path: 'volunteer_map',
            title: 'Вход',
            name: 'volunteer_map',
            component: resolve => {
                require(['../views/volunteer/map.vue'], resolve);
            }
        },
        {
            path: 'volunteer_achievement',
            title: 'Вход',
            name: 'volunteer_achievement',
            component: resolve => {
                require(['../views/volunteer/achievement.vue'], resolve);
            }
        },
        {
            path: 'volunteer_single_task/:id',
            title: 'Вход',
            name: 'volunteer_single_task',
            component: resolve => {
                require(['../views/volunteer/single_task.vue'], resolve);
            }
        },
        {
            path: 'customer/:id',
            title: 'Вход',
            name: 'customer',
            component: resolve => {
                require(['../views/volunteer/single_customer.vue'], resolve);
            }
        },

        {
            path: 'admin_map',
            name: 'admin_map',
            component: resolve => {
                require(['../views/admin/map.vue'], resolve);
            },
        },
        {
            name: "admin",
            path: '/admin/',
            redirect: '/admin/tasks',
            component: resolve => {
                require(['../views/admin/admin.vue'], resolve);
            },
            children: [
                {
                    path: 'settings',
                    name: 'admin_settings',
                    component: resolve => {
                        require(['../views/admin/settings.vue'], resolve);
                    },
                },
                {
                    path: 'tasks',
                    name: 'admin_tasks',
                    component: resolve => {
                        require(['../views/admin/tasks/tasks.vue'], resolve);
                    },
                },
                {
                    path: 'tasks/new',
                    name: 'admin_new_task',
                    component: resolve => {
                        require(['../views/admin/tasks/new_task.vue'], resolve);
                    },
                },
                {
                    path: 'task/:id',
                    name: 'admin_single_task',
                    component: resolve => {
                        require(['../views/admin/tasks/task.vue'], resolve);
                    },
                },
                {
                    path: 'task/:id/update',
                    name: 'admin_edit_task',
                    component: resolve => {
                        require(['../views/admin/tasks/edit.vue'], resolve);
                    },
                },

                {
                    path: 'users',
                    name: 'admin_users',
                    component: resolve => {
                        require(['../views/admin/users/users.vue'], resolve);
                    },
                },

                {
                    path: 'user/:id/update',
                    name: 'admin_edit_user',
                    component: resolve => {
                        require(['../views/admin/users/profile.vue'], resolve);
                    },
                },
                {
                    path: 'news',
                    name: 'admin_news',
                    component: resolve => {
                        require(['../views/admin/news/news.vue'], resolve);
                    },
                },
                {
                    path: 'post/new',
                    name: 'admin_add_news',
                    component: resolve => {
                        require(['../views/admin/news/add.vue'], resolve);
                    },
                },
                {
                    path: 'post/:id/update',
                    name: 'admin_edit_news',
                    component: resolve => {
                        require(['../views/admin/news/edit.vue'], resolve);
                    },
                },
                {
                    path: 'pages',
                    name: 'admin_pages',
                    component: resolve => {
                        require(['../views/admin/pages/pages.vue'], resolve);
                    },
                },
                {
                    path: 'page/:id/update',
                    name: 'admin_edit_page',
                    component: resolve => {
                        require(['../views/admin/pages/update.vue'], resolve);
                    },
                },
                {
                    path: 'messages',
                    name: 'admin_messages',
                    component: resolve => {
                        require(['../views/admin/messages/messages.vue'], resolve);
                    },
                },
            ]
        }
    ]
};


export const appRouter = [];

export const routers = [
    otherRouter,
    ...appRouter
];
