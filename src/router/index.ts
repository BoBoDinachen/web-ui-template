import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: "/redirect",
        component: Layout,
        meta: {
            hidden: true
        },
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index.vue")
            }
        ]
    },
    {
        path: "/403",
        component: () => import("@/views/error-page/403.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/404",
        component: () => import("@/views/error-page/404.vue"),
        meta: {
            hidden: true
        },
        alias: "/:pathMatch(.*)*"
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/Dashboard/index.vue"),
                name: "Dashboard",
                meta: {
                    title: "首页",
                    svgIcon: "dashboard",
                    affix: true
                }
            }
        ]
    },
    {
        path: "/personal",
        component: Layout,
        redirect: "/personal/center",
        name: "Personal",
        meta: {
            hidden: true
        },
        children: [
            {
                path: "center",
                component: () => import("@/views/PersonalCenter/index.vue"),
                name: "PersonalCenter",
                meta: {
                    title: "个人中心",
                    hidden: true
                }
            },
            {
                path: "setting",
                component: () => import("@/views/PersonalSetting/index.vue"),
                name: "PersonalSetting",
                meta: {
                    title: "个人设置",
                    hidden: true
                }
            }
        ]
    },
    {
        path: "/goods",
        component: Layout,
        redirect: "/goods/list",
        meta: {
            title: "物品管理",
            elIcon: "Goods"
        },
        children: [
            {
                path: "list",
                component: () => import("@/views/GoodsManage/GoodsList/index.vue"),
                name: "GoodsList",
                meta: {
                    title: "物品列表",
                    svgIcon: "list"
                }
            },
            {
                path: "category",
                component: () => import("@/views/GoodsManage/GoodsCategory/index.vue"),
                name: "CategoryManage",
                meta: {
                    title: "物品分类管理",
                    svgIcon: "classify"
                }
            }
        ]
    },
    {
        path: "/area",
        component: Layout,
        redirect: "/area/index",
        children: [
            {
                path: "index",
                component: () => import("@/views/AreaManage/index.vue"),
                name: "AreaManage",
                meta: {
                    title: "区域管理",
                    elIcon: "MapLocation"
                }
            }
        ]
    }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: "/org",
        component: Layout,
        redirect: "/org/family",
        name: "Org",
        meta: {
            roles: ["root"], // 可以在根路由中设置角色
            title: "组织管理",
            svgIcon: "org"
        },
        children: [
            {
                path: "family",
                component: () => import("@/views/Hello/index.vue"),
                name: "Family",
                meta: {
                    title: "所有家庭",
                    svgIcon: "family"
                }
            },
            {
                path: "team",
                component: () => import("@/views/Hello/index.vue"),
                name: "Team",
                meta: {
                    title: "所有团队",
                    svgIcon: "team"
                }
            }
        ]
    },
    {
        path: "/myTeams",
        component: Layout,
        redirect: "/myTeams/index",
        meta: {
            roles: ["team"] // 可以在根路由中设置角色
        },
        children: [
            {
                path: "index",
                component: () => import("@/views/MyTeams/index.vue"),
                name: "MyTeams",
                meta: {
                    title: "我的团队",
                    svgIcon: "team",
                    alwaysShow: true // 将始终显示根菜单
                }
            }
        ]
    },
    {
        path: "/myFamily",
        component: Layout,
        redirect: "/myFamily/index",
        meta: {
            roles: ["family"] // 可以在根路由中设置角色
        },
        children: [
            {
                path: "index",
                component: () => import("@/views/MyFamily/index.vue"),
                name: "MyFamily",
                meta: {
                    title: "我的家庭",
                    svgIcon: "family",
                    alwaysShow: true // 将始终显示根菜单
                }
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
        redirect: "/404",
        name: "ErrorPage",
        meta: {
            hidden: true
        }
    }
]

const router = createRouter({
    history:
        import.meta.env.VITE_ROUTER_HISTORY === "hash"
            ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
            : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach((route) => {
            const { name, meta } = route
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch (error) {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
    }
}

export default router
