import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
        meta: {
          hidden: true,
        },
      },
    ],
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
    alias: "/:pathMatch(.*)*",
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "menus-dashboard",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/hello",
    children: [
      {
        path: "/hello",
        component: () => import("@/views/hello/index.vue"),
        name: "Hello",
        meta: {
          title: "示例页面",
          svgIcon: "bug",
        },
      },
    ],
  },
  {
    path: "/exmaple",
    component: Layout,
    redirect: "/exmaple/1",
    meta: {
      title: "示例页面",
      svgIcon: "menus-example",
    },
    children: [
      {
        path: "1",
        component: () => import("@/views/example/example1.vue"),
        name: "Exmaple1",
        meta: {
          title: "示例页面一",
          svgIcon: "menus-example",
          activeMenu:"Exmaple1",
        },
      },
      {
        path: "2",
        component: () => import("@/views/example/example2.vue"),
        name: "Exmaple2",
        meta: {
          title: "示例页面二",
          svgIcon: "menus-example",
          activeMenu:"Exmaple2",
        },
      },
      {
        path: "3",
        component: () => import("@/views/example/example3.vue"),
        name: "Exmaple3",
        meta: {
          title: "地图开发",
          svgIcon: "menus-earth",
          activeMenu:"Exmaple3",
        },
      },
    ],
  },
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true,
    },
  },
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
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
