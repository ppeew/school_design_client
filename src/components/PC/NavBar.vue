<template>
    <aside id="aside" class="app-aside hidden-xs bg-white b-r"
           :class="{'off-screen animated' : $store.state.isMobile && $store.state.isShowNavBarInMobile}">
        <div class="aside-wrap" layout="column">
            <div class="navi-wrap scroll-y" flex="">
                <!-- user -->
                <div class="clearfix hidden-xs text-center  show" id="aside-user">
                    <div class="dropdown wrapper" style="text-align: center;">
                        <div ui-nav="">
                            <a href="#">
                                <span class="thumb-lg w-auto-folded avatar m-t-sm">
                      <img v-if="this.$store.state.loginType" :src="this.$store.state.userInfo.avatarUrl"
                           class="img-full">
                      <img v-else src="~assets/img/logo.svg" class="img-full">
                    </span>
                            </a>
                        </div>
                        <a href="#">
                <span class="clear">
                  <span class="block m-t-sm">
                    <strong v-if="this.$store.state.loginType" class="font-bold text-lt">-- {{this.$store.state.userInfo.name}} --</strong>
                    <strong v-else class="font-bold text-lt">-- 游客 --</strong>
                  </span>
                  <span v-if="this.$store.state.loginType" class="text-muted text-xs block">{{this.$store.state.userInfo.bio}}</span>
                  <span v-else class="text-muted text-xs block">欢迎访问宠物之家...</span>
                </span>
                        </a>

                    </div>
                </div>
                <el-menu
                        style="border: none;background-color: unset"
                        :unique-opened="true"
                        :default-active="reverseNavBarIndex"
                        class="el-menu-vertical-demo">
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span>社区</span>
                    </li>
                    <router-link to="/user/home">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">宠物生活</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/user/blog/information">

                        <el-menu-item index="2">
                            <i class="el-icon-s-promotion"></i>
                            <span slot="title">宠物资讯</span>
                        </el-menu-item>
                    </router-link>

                    <template v-if="this.$store.state.loginType">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span>管理</span>
                        </li>
                        <el-submenu  index="1">

                            <template slot="title">
                                <i class="user-icon">
                                    <svg t="1576574788301" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="1192" width="24" height="18">
                                        <path d="M324.266667 657.066667c-91.733333-61.866667-130.133333-125.866667-130.133334-211.2 0-19.2-19.2-36.266667-40.533333-36.266667s-40.533333 17.066667-40.533333 36.266667c0 96 40.533333 172.8 123.733333 241.066666-128 87.466667-200.533333 177.066667-234.666667 292.266667-6.4 19.2 8.533333 38.4 29.866667 42.666667 4.266667 0 6.4 2.133333 10.666667 2.133333 19.2 0 34.133333-10.666667 40.533333-27.733333 34.133333-110.933333 106.666667-194.133333 245.333333-279.466667 19.2-10.666667 23.466667-34.133333 10.666667-49.066667-6.4-4.266667-10.666667-8.533333-14.933333-10.666666zM1021.866667 977.066667c-36.266667-115.2-106.666667-204.8-232.533334-290.133334 87.466667-68.266667 128-147.2 128-243.2 0-19.2-19.2-36.266667-40.533333-36.266666-23.466667 0-40.533333 14.933333-40.533333 36.266666 0 87.466667-40.533333 151.466667-130.133334 213.333334-6.4 2.133333-10.666667 6.4-14.933333 10.666666-12.8 17.066667-8.533333 38.4 10.666667 49.066667 138.666667 85.333333 209.066667 166.4 243.2 277.333333 4.266667 14.933333 21.333333 25.6 40.533333 25.6 4.266667 0 6.4 0 10.666667-2.133333 19.2-2.133333 32-21.333333 25.6-40.533333z"
                                              fill="#58666D" p-id="1193"></path>
                                        <path d="M147.2 371.2c23.466667-4.266667 38.4-21.333333 34.133333-40.533333 0 0-19.2-100.266667 53.333334-174.933334 53.333333-55.466667 147.2-83.2 277.333333-83.2s221.866667 27.733333 277.333333 83.2c72.533333 72.533333 53.333333 172.8 53.333334 174.933334-4.266667 19.2 10.666667 38.4 34.133333 40.533333h6.4c19.2 0 36.266667-12.8 40.533333-29.866667 2.133333-6.4 25.6-132.266667-72.533333-232.533333-70.4-70.4-185.6-108.8-341.333333-108.8C356.266667 0 241.066667 38.4 170.666667 110.933333 74.666667 209.066667 98.133333 337.066667 100.266667 341.333333c4.266667 19.2 25.6 32 46.933333 29.866667z"
                                              fill="#58666D" p-id="1194"></path>
                                        <path d="M364.8 345.6c-23.466667 0-40.533333 14.933333-40.533333 36.266667v38.4c0 19.2 19.2 36.266667 40.533333 36.266666s40.533333-14.933333 40.533333-36.266666v-38.4c0-19.2-17.066667-36.266667-40.533333-36.266667zM659.2 345.6c-23.466667 0-40.533333 14.933333-40.533333 36.266667v38.4c0 19.2 19.2 36.266667 40.533333 36.266666 23.466667 0 40.533333-14.933333 40.533333-36.266666v-38.4c0-19.2-19.2-36.266667-40.533333-36.266667zM614.4 497.066667c-19.2-10.666667-44.8-6.4-57.6 10.666666 0 0-17.066667 23.466667-44.8 23.466667-25.6 0-42.666667-21.333333-44.8-21.333333-12.8-17.066667-38.4-21.333333-57.6-10.666667-19.2 10.666667-25.6 32-12.8 49.066667 14.933333 21.333333 55.466667 55.466667 113.066667 55.466666 57.6 0 100.266667-34.133333 115.2-55.466666 12.8-19.2 6.4-40.533333-10.666667-51.2z"
                                              fill="#58666D" p-id="1195"></path>
                                    </svg>
                                </i>
                                <span>个人中心</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item @click="$store.state.isShowUserSecret = !$store.state.isShowUserSecret">
                                    <i class="user-icon">
                                        <svg t="1584444539056" class="icon" viewBox="0 0 1026 1024" version="1.1"
                                             xmlns="http://www.w3.org/2000/svg" p-id="3511" width="32" height="32">
                                            <path d="M 375.93 511.993 c 0 -75.2752 60.8711 -136.103 136.16 -136.073 c 75.3916 0.0299529 136.043 60.951 135.983 136.586 c -0.0599059 74.9191 -61.1374 135.657 -136.329 135.574 c -75.0855 -0.0931873 -135.817 -60.941 -135.813 -136.086 Z"
                                                  fill="#bfbfbf" p-id="3512"></path>
                                            <path d="M 511.998 706.464 C 404.757 706.464 317.536 619.231 317.536 512 C 317.536 404.772 404.769 317.536 511.998 317.536 C 619.226 317.536 706.464 404.772 706.464 512 c -0.00423682 107.231 -87.2376 194.464 -194.466 194.464 Z m 0 -369.068 C 415.717 337.396 337.396 415.721 337.396 512 s 78.3279 174.604 174.602 174.604 c 96.2681 0 174.609 -78.3258 174.609 -174.604 S 608.279 337.396 511.998 337.396 Z"
                                                  fill="#bfbfbf" p-id="3513"></path>
                                        </svg>
                                    </i>
                                    <span>安全设置</span>
                                </el-menu-item>
                                <router-link to="/user/manage">
                                    <el-menu-item index="1-2">
                                        <i class="user-icon">
                                            <svg t="1584444539056" class="icon" viewBox="0 0 1026 1024" version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg" p-id="3511" width="32" height="32">
                                                <path d="M 375.93 511.993 c 0 -75.2752 60.8711 -136.103 136.16 -136.073 c 75.3916 0.0299529 136.043 60.951 135.983 136.586 c -0.0599059 74.9191 -61.1374 135.657 -136.329 135.574 c -75.0855 -0.0931873 -135.817 -60.941 -135.813 -136.086 Z"
                                                      fill="#bfbfbf" p-id="3512"></path>
                                                <path d="M 511.998 706.464 C 404.757 706.464 317.536 619.231 317.536 512 C 317.536 404.772 404.769 317.536 511.998 317.536 C 619.226 317.536 706.464 404.772 706.464 512 c -0.00423682 107.231 -87.2376 194.464 -194.466 194.464 Z m 0 -369.068 C 415.717 337.396 337.396 415.721 337.396 512 s 78.3279 174.604 174.602 174.604 c 96.2681 0 174.609 -78.3258 174.609 -174.604 S 608.279 337.396 511.998 337.396 Z"
                                                      fill="#bfbfbf" p-id="3513"></path>
                                            </svg>
                                        </i>
                                        <span>个人信息管理</span>
                                    </el-menu-item>
                                </router-link>

                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index=“2”>

                            

                            <template slot="title">
                                <i class="user-icon">
                                    <svg t="1584436564053" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="4405" width="24" height="18">
                                        <path d="M510.464 53.76c-259.072 0-471.04 187.392-471.04 416.768 0 140.288 78.848 269.312 210.432 346.624l-33.792 197.632 245.76-130.048c15.872 1.536 33.792 3.072 48.128 3.072 259.072 0 471.04-187.392 471.04-415.232s-211.456-418.816-470.528-418.816z m0 788.48c-15.872 0-33.792-1.536-51.2-3.072h-7.168l-178.688 95.232 25.088-140.288-13.312-7.168C159.232 717.824 83.456 599.552 83.456 471.04c0-204.8 191.488-371.712 427.008-371.712S937.472 266.24 937.472 471.04s-191.488 371.2-427.008 371.2z"
                                              fill="#DEDEDE" p-id="4406"></path>
                                        <path d="M510.464 463.36m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                              fill="#DEDEDE" p-id="4407"></path>
                                        <path d="M257.536 463.36m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                              fill="#DEDEDE" p-id="4408"></path>
                                        <path d="M763.392 463.36m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                              fill="#DEDEDE" p-id="4409"></path>
                                        <path d="M510.464 19.968c-259.072 0-471.04 187.392-471.04 416.768 0 140.288 78.848 269.312 210.432 346.624l-33.792 197.632 245.76-130.048c15.872 1.536 33.792 3.072 48.128 3.072 259.072 0 471.04-187.392 471.04-415.232S769.536 19.968 510.464 19.968z m0 788.48c-15.872 0-33.792-1.536-51.2-3.072h-7.168l-178.688 95.232 25.088-140.288-13.312-7.168c-125.952-68.608-201.728-187.392-201.728-315.904 0-204.8 191.488-371.712 427.008-371.712s427.008 166.912 427.008 371.712-191.488 371.2-427.008 371.2z"
                                              fill="#5A5A5A" p-id="4410"></path>
                                        <path d="M510.464 429.568m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                              fill="#5A5A5A" p-id="4411"></path>
                                        <path d="M257.536 429.568m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                              fill="#5A5A5A" p-id="4412"></path>
                                        <path d="M763.392 429.568m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
                                              fill="#5A5A5A" p-id="4413"></path>
                                    </svg>
                                </i>
                                <span>消息中心</span>
                                <def-badge v-if="this.$store.state.sysPetMessage.unReadCount > 0"
                                           :value="reverseAllMessageCount" type="danger"></def-badge>
                            </template>
                            <el-menu-item-group>
                                <router-link to="/user/notice/system">
                                    <el-menu-item index="3-1">
                                        <i class="user-icon">
                                            <svg t="1584444539056" class="icon" viewBox="0 0 1026 1024" version="1.1"
                                                 xmlns="http://www.w3.org/2000/svg" p-id="3511" width="32" height="32">
                                                <path d="M 375.93 511.993 c 0 -75.2752 60.8711 -136.103 136.16 -136.073 c 75.3916 0.0299529 136.043 60.951 135.983 136.586 c -0.0599059 74.9191 -61.1374 135.657 -136.329 135.574 c -75.0855 -0.0931873 -135.817 -60.941 -135.813 -136.086 Z"
                                                      fill="#bfbfbf" p-id="3512"></path>
                                                <path d="M 511.998 706.464 C 404.757 706.464 317.536 619.231 317.536 512 C 317.536 404.772 404.769 317.536 511.998 317.536 C 619.226 317.536 706.464 404.772 706.464 512 c -0.00423682 107.231 -87.2376 194.464 -194.466 194.464 Z m 0 -369.068 C 415.717 337.396 337.396 415.721 337.396 512 s 78.3279 174.604 174.602 174.604 c 96.2681 0 174.609 -78.3258 174.609 -174.604 S 608.279 337.396 511.998 337.396 Z"
                                                      fill="#bfbfbf" p-id="3513"></path>
                                            </svg>
                                        </i>
                                        <span>系统通知</span>
                                        <def-badge v-if="this.$store.state.sysPetMessage.unReadCount > 0"
                                                   :value="reverseSysMessageCount" type="danger"></def-badge>

                                    </el-menu-item>
                                </router-link>

                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </div>
        </div>
    </aside>
</template>

<script>

    import DefBadge from "../common/Badge"
    import {Badge, Menu, MenuItem, MenuItemGroup, Submenu} from "element-ui"

    export default {
        name: "AsideBar",
        components: {
            DefBadge: DefBadge,
            ElBadge: Badge,
            ElMenu: Menu,
            ElMenuItem: MenuItem,
            ElMenuItemGroup: MenuItemGroup,
            ElSubmenu: Submenu
        },
        computed: {
            reverseSysMessageCount: function () {
                return this.$store.state.sysPetMessage.unReadCount
            },
            reverseAllMessageCount: function () {
                return this.$store.state.sysPetMessage.unReadCount

            },
            reverseNavBarIndex:function () {
                return sessionStorage.getItem('navBarIndex')
            }
        },
        data() {
            return {
                listShowPos: {
                    listOne: false,
                    listTwo: false,
                    listThree: false,
                },
            }
        },
        created() {
            const data = {


        }
        }

    }

</script>

<style scoped>
    .user-icon {
        margin-right: 5px;
        width: 24px;
        height: 18px;
    }


</style>


