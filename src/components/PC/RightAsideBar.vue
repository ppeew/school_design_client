<!-- <template>
    <!--首页右侧栏-->
    <aside class="asideBar col w-md bg-white-only bg-auto no-border-xs" role="complementary">
        <div id="sidebar">
            <at-tabs>
                <at-tab-pane label="" name="name1" icon="icon-award">
                    <!--宠物榜单-->
                    <div style="padding-left: 0" class="tab-pane  fade in wrapper-md active" role="tabpanel">
                        <!-- <h5 class="widget-title m-t-none text-md">热门标签</h5> -->
                        <a-divider style="margin: 14px 0"></a-divider>
                        <div>
                            <a-button v-for="(item, i) in this.$store.state.hotTags" type="primary" ghost  style="margin: 4px" size="small"  @click="setHotTagChoice(item)">{{item.tagName}}({{item.tagCount}})</a-button>

                        </div>
                    </div>
                </at-tab-pane>

        </div>
    </aside>
</template> -->

<script>
    import {Tabs, TabPane} from "at-ui"
    import {Tag as ATag,Button as AButton,Divider as ADivider} from "ant-design-vue"
    import service from "../../network/axios"

    export default {
        name: "RightAsideBar",
        components: {
            AtTabs: Tabs,
            AtTabPane: TabPane,
            ATag,
            AButton,
            ADivider
        },
        data(){
            return{
                hotTag:[]
            }
        },
        created() {
            // this
        },

        methods:{
            setHotTagChoice:function (item) {
                this.$store.commit("changeHotTagChoice", item)
                this.$router.replace("/user/blog/hotTag/" + item.tagId)
            }
        }
    }
</script>

<style scoped>
    .at-tabs__pane{

    }
</style>
