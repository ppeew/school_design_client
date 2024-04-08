import Vue from 'vue'
import VueRouter from "vue-router"

import Login from "../components/PC/Login"
import User from "../views/PC/User/User"
import Register from "../components/PC/Register"
import SystemNotice from "../views/PC/User/Notice/SystemNotice"
import adminUtil from "../utils/adminUtil"
import util from "../utils/util"
import AddBlog from "../views/PC/Blog/AddBlog"
import BlogDetail from "../views/PC/Blog/BlogDetail"
import HotTagBlog from "../views/PC/Blog/HotTagBlog"
import MyBlog from "../views/PC/Blog/MyBlog"
import Question from "../views/PC/Blog/Question"
import MyCollection from "../views/PC/Blog/MyCollection"
import CommunityUser from "../views/PC/Admin/CommunityAdmin/CommunityUser"
import CommunityHome from "../views/PC/Admin/CommunityAdmin/CommunityHome"
import AddNews from "../views/PC/Admin/CommunityAdmin/AddNews"
import Information from "../views/PC/Blog/Information"
import InformationDetail from "../views/PC/Blog/InformationDetail"
import CommunityInformation from "../views/PC/Admin/CommunityAdmin/CommunityInformation"
import CommunityInformationDetail from "../views/PC/Admin/CommunityAdmin/CommunityInformationDetail"
import AdminManage from "../views/PC/Admin/AdminManage"
import Error from "../views/PC/Error"
import Error404 from "../views/PC/Error404"
import SystemUser from "../views/PC/Admin/SystemAdmin/SystemUser"
import SystemHome from "../views/PC/Admin/SystemAdmin/SystemHome"
import UserList from "../views/PC/Admin/SystemAdmin/UserList"
import CommunityAdminList from "../views/PC/Admin/SystemAdmin/CommunityAdminList"
import LogList from "../views/PC/Admin/SystemAdmin/LogList"
import axios from "axios"
const Home = ()=> import("views/PC/Home")
const UserManage = ()=> import("views/PC/User/UserManage")
import store from "../store"
Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect:"/login"
    },

    {
        path:"/login",
        component:Login,
        meta:{
            tittle:"登录"
        }
    },
    {
        path:"/regist",
        component:Register,
        meta:{
            tittle:"注册"
        }
    },
    {
        path:"/error",
        component:Error,
        meta:{
            tittle:"出错啦"
        }
    },
    {
        path:"/404",
        component:Error404,
        meta:{
            tittle:"出错啦"
        }
    },

    /**
     * 系统管理员路由
     */
    {
        path:"/admin/system",
        component:SystemUser,
        meta:{
            tittle:"系统管理员首页"
        },
        children:[
            {
                path:"home",
                component:SystemHome,
                meta:{
                    tittle:"系统管理员首页",
                    navBarIndex:"1"
                }
            },
            {
                path:"adminManage",
                component:AdminManage,
                meta:{
                    tittle:"个人信息管理",
                    navBarIndex:"3-2"
                }
            },
            {
                path:"user/user",
                component:UserList,
                meta:{
                    tittle:"社区用户管理",
                    navBarIndex:"1-1"
                }
            },
            {
                path:"user/communityAdmin",
                component:CommunityAdminList,
                meta:{
                    tittle:"社区管理员用户",
                    navBarIndex:"1-2"
                }
            },
            {
                path:"log",
                component:LogList,
                meta:{
                    tittle:"系统日志",
                    navBarIndex:"2-1"
                }
            },


        ]
    },

    /**
     * 社区管理员路由
     */
    {
        path:"/admin/community",
        component:CommunityUser,
        meta:{
            tittle:"社区管理员首页"
        },
        children:[
            {
                path:"home",
                component:CommunityHome,
                meta:{
                    tittle:"社区管理员首页",
                    navBarIndex:"1"
                }
            },
            {
                path:"adminManage",
                component:AdminManage,
                meta:{
                    tittle:"个人信息管理",
                    navBarIndex:"3-2"
                }
            },
            {
                path:"addNews",
                component:AddNews,
                meta:{
                    tittle:"新增宠物资讯",
                    navBarIndex:"2-1"
                }
            },
            {
                path:"listInfo",
                component:CommunityInformation,
                meta:{
                    tittle:"宠物资讯管理",
                    navBarIndex:"2-2"
                }
            },
            {
                path:"detailInfo/:id",
                component:CommunityInformationDetail,
                meta:{
                    tittle:"宠物资讯管理",
                    navBarIndex:"2-2"
                }
            }
        ]
    },
    /**
     * 用户社区路由
     */
    {
        path:"/user/blog",
        component:User,
        meta:{
            tittle:"用户主页"
        },
        children:[
            {
                path:"add",
                component:AddBlog,
                meta:{
                    tittle:"发表新帖",
                    navBarIndex:"1"
                }
            },
            {
                path:"detail/:id",
                component:BlogDetail,
                meta:{
                    tittle:"帖子详情",
                    navBarIndex:"1"
                }
            },
            {
                path:"hotTag/:hotTagId",
                component:HotTagBlog,
                meta:{
                    tittle:"热门标签",
                    navBarIndex:"1"
                }
            },
            {
                path:"myBlog",
                component:MyBlog,
                meta:{
                    tittle:"我的帖子",
                    navBarIndex:"1"
                }
            },

            {
                path:"question",
                component:Question,
                meta:{
                    tittle:"提问",
                    navBarIndex:"1"
                }
            },
            {
                path:"myCollection",
                component:MyCollection,
                meta:{
                    tittle:"我的收藏",
                    navBarIndex:"1"
                }
            },
            {
                path:"information",
                component:Information,
                meta:{
                    tittle:"宠物资讯",
                    navBarIndex:"2"
                }
            },
            {
                path:"detailInfo/:id",
                component:InformationDetail,
                meta:{
                    tittle:"资讯详情",
                    navBarIndex:"1"
                }
            },
        ]
    },
    /**
     * 用户路由
     */
    {
        path:"/user",
        component:User,
        meta:{
            tittle:"用户主页"
        },
        children:[
            {
                path:"errorPage",
                component:Error,
                meta:{
                    tittle:"出错了！"
                }
            },
            {
                path:"home",
                component:Home,
                meta:{
                    tittle:"主页",
                    navBarIndex:"1"
                }
            },
            {
                path: "manage",
                component: UserManage,
                meta: {
                    tittle: "个人信息管理",
                    navBarIndex:"1-2"
                }
            },
            {
                path:"notice/system",
                component:SystemNotice,
                meta:{
                    tittle:"系统通知",
                    navBarIndex:"3-1"

                }
            }

        ]
    }

]
// const unAuthRoute = ["/user/manage","/pet/upload","/pet/petinfo/detail","/pet/petinfo","/admin/home"]
const unAuthRoute = ["/login","/regist","/error","/404","/mobile/login","/mobile/regist"]
const router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to,from,next) => {


    if (to.matched.length === 0) {    //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/404');
    }

    //判断是否是移动端访问
    let isMobile = sessionStorage.getItem('isMobile');

    if(isMobile == null){
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

        isMobile = flag ? 1 : 0
        sessionStorage.setItem("isMobile", isMobile)
    }



    sessionStorage.setItem("navBarIndex",to.meta.navBarIndex)
    store.commit("changeNavBarIndex",to.meta.navBarIndex)
    if (!unAuthRoute.includes(to.path)){
        if (to.path.indexOf("/admin") !== -1){
            if (!sessionStorage.getItem("adminUserInfo")){
                adminUtil.getUserInfo(this);
            }
            document.title = to.meta.tittle
            next()
        }else{
            if (parseInt(isMobile) === 1) {
                if (to.path.indexOf("mobile") === -1) {
                    next('/mobile/user/home');
                }
            }

            //普通用户判断
            if (!sessionStorage.getItem("userInfo")){
                const that = this
                axios.get("/api/user/returnUserInfo").then(function (res) {
                    if (res.data.data) {
                        sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
                        store.commit("changeUserInfo", util.returnUserInfo())
                        store.commit("changeLoginType", true)
                        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                        if(to.path.indexOf("/completeInfo") === -1) {
                            if (userInfo.accountType === 0){
                                if (userInfo.realName == null || userInfo.address === null || userInfo.phone == null || userInfo.location == null || userInfo.email == null) {
                                    // if (parseInt(isMobile) === 1)
                                    //     router.replace("/mobile/completeInfo")
                                    // else
                                    //     router.replace("/completeInfo")

                                }
                            } else {
                                if( userInfo.phone == null || userInfo.realName == null || userInfo.name == null || userInfo.address === null  || userInfo.phone == null  || userInfo.location == null  || userInfo.email == null  ){
                                    // if (parseInt(isMobile) === 1)
                                    //     router.replace("/mobile/completeInfoAuth")
                                    // else
                                    //     router.replace("/completeInfoAuth")
                                }
                            }

                        }
                        document.title = to.meta.tittle
                        next()

                    } else  {

                        router.replace("/login")

                    }
                })
            } else  {
                if (!store.state.loginType) {
                    store.commit("changeUserInfo", util.returnUserInfo())
                    store.commit("changeLoginType", true)
                }
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                if(to.path.indexOf("/completeInfo") === -1) {
                    if (userInfo.accountType === 0){
                        if( userInfo.phone == null || userInfo.realName == null || userInfo.address === null  || userInfo.phone == null  || userInfo.location == null  || userInfo.email == null  ){
                            // if (parseInt(isMobile) === 1)
                            //     router.replace("/mobile/completeInfo")
                            // else
                            //     router.replace("/completeInfo")
                        }
                    } else {
                        if( userInfo.phone == null || userInfo.realName == null || userInfo.name == null || userInfo.address === null  || userInfo.phone == null  || userInfo.location == null  || userInfo.email == null  ){
                            // if (parseInt(isMobile) === 1)
                            //     router.replace("/mobile/completeInfoAuth")
                            // else
                            //     router.replace("/completeInfoAuth")
                        }

                    }

                }
                document.title = to.meta.tittle
                next()
            }

        }

    } else {
        document.title = to.meta.tittle
        if (parseInt(isMobile) === 1) {
            if (to.path.indexOf("mobile") === -1) {
                next('/mobile' + to.path);
            }
        }
        document.title = to.meta.tittle
        next()
    }

})
export default router
