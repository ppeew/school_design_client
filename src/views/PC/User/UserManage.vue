<template>
  <div class="col center-part">
    <header class="bg-light lter wrapper-md">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="'#'">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </header>

    <div
      class="wrapper-md"
      :class="{
        wrap_content: this.$store.state.isMobile === false,
        wrap_content_mobile: this.$store.state.isMobile === true,
      }"
      id="post-panel"
    >
      <div class="row_content">
        <span class="labelVal">用户名：</span>
        <at-input
          status="error"
          size="large"
          :status="nameType"
          v-model="userInfo.name"
          class="row_content_input"
        >
        </at-input>
        <span class="errorNotice">{{ nameNotice }}</span>
      </div>

      <div class="row_content">
        <span class="labelVal">个性签名：</span>
        <at-input
          size="large"
          :status="bioType"
          type="textarea"
          v-model="userInfo.bio"
          class="row_content_input"
          min-rows="2"
          max-rows="4"
          placeholder="这里输入内容，请输入多行"
        ></at-input>
        <span class="errorNotice" v-if="bioNotice">请输入正确的个性签名</span>
      </div>

      <div class="row_content">
        <span class="labelVal"
          >头像：<i>仅支持JPG、PNG、GIF格式，文件小于1M</i></span
        >
        <div class="img_container">
          <div>
            <img
              style="width: 140px; height: 140px"
              :src="userInfo.avatarUrl"
              alt=""
            />
          </div>
          <span class="img_cover" @click="choiceImg">
            <span class="upload_icon">
              <svg
                t="1576639130005"
                class="icon"
                viewBox="0 0 1066 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1859"
                width="40"
                height="40"
              >
                <path
                  d="M806.4 362.666667a38.4 38.4 0 1 1-76.8 0 196.266667 196.266667 0 0 0-392.533333 0 38.4 38.4 0 0 1-76.8 0 273.066667 273.066667 0 1 1 546.133333 0z"
                  fill="#ffffff"
                  p-id="1860"
                ></path>
                <path
                  d="M768 882.858667a38.4 38.4 0 0 1 0-76.8 196.266667 196.266667 0 1 0 0-392.533334 38.4 38.4 0 0 1 0-76.8 273.066667 273.066667 0 1 1 0 546.133334zM277.333333 336.725333a38.4 38.4 0 0 1 0 76.8 196.266667 196.266667 0 1 0 0 392.533334 38.4 38.4 0 0 1 0 76.8 273.066667 273.066667 0 1 1 0-546.133334z"
                  fill="#ffffff"
                  p-id="1861"
                ></path>
                <path
                  d="M484.266667 664.362667a38.4 38.4 0 0 1 76.8 0V896a38.4 38.4 0 1 1-76.8 0v-231.637333z"
                  fill="#ffffff"
                  p-id="1862"
                ></path>
                <path
                  d="M359.509333 691.370667a38.4 38.4 0 0 1-54.613333-53.973334l190.421333-193.024a38.4 38.4 0 0 1 54.698667 0l190.464 193.024a38.4 38.4 0 0 1-54.656 53.973334l-163.157333-165.333334-163.157334 165.333334z"
                  fill="#ffffff"
                  p-id="1863"
                ></path>
              </svg>
            </span>
            <span>上传新头像</span>
          </span>
          <input
            :ref="'filElem'"
            type="file"
            style="display: none"
            @change="getImg"
          />
        </div>
      </div>
      <div class="row_content">
        <el-button
          icon="el-icon-circle-check"
          plain
          type="primary"
          size="large"
          hollow
          @click="openSureMessage"
          >保存</el-button
        >
        <el-button
          icon="el-icon-circle-close"
          plain
          type="warning"
          size="large"
          style="margin-left: 20px"
          hollow
          @click="reloadUserInfoForm"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Cascader,
  Form,
  FormItem,
} from "element-ui";
import axios from "axios";
import { Input } from "at-ui";
import service from "network/axios";
import { apiUrl } from "@/store/index";

export default {
  name: "UserManage",
  components: {
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
    AtInput: Input,
    ElButton: Button,
    ElCascader: Cascader,
    ElForm: Form,
    ElFormItem: FormItem,
  },
  data() {
    return {
      userInfo: {
        avatarUrl: this.$store.state.userInfo.avatarUrl,
        accountId: this.$store.state.userInfo.accountId,
        accountType: this.$store.state.userInfo.accountType,
        id: this.$store.state.userInfo.id,
        name: this.$store.state.userInfo.name,
      },
      nameType: "",
      nameNotice: "",
      realNameType: "",
      realNameNotice: false,
      emailType: "",
      emailNotice: false,
      addrType: "",
      addrNotice: false,
      bioType: "",
      bioNotice: false,
      options: [],
      selectedOptions: [],
    };
  },
  created() {
    var u = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log(u);
    this.userInfo.id = u.id;
    this.userInfo.avatarUrl = u.Image;
    this.userInfo.name = u.username;
    this.userInfo.bio = "爱柴犬的小先生";
  },
  mounted() {},
  methods: {
    choiceImg: function () {
      // console.log(this.$store.state)
      this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
    },
    doUpdate: function () {
      this.$Message({
        message: "正在保存中......",
        type: "success",
        iconClass: "el-icon-loading",
      });
      let url = apiUrl + "/api/v1/user/" + this.userInfo.id;
      let data = {
        username: JSON.parse(sessionStorage.getItem("userInfo")).username,
        age: "18",
        sex: "1",
        image: this.userInfo.avatarUrl,
      };
      var that=this
      axios.put(url, data).then(function (res) {
        if (res.data.code === 200) {
          // that.$util.replaceUserInfo(that)
          that.$Message.closeAll();
          that.$Notify({
            title: "信息保存成功",
            message: "信息保存成功！",
            type: "success",
            duration: 2000,
          });
          that.$router.put("/");
        } else if (res.data.code === 60002) {
          that.$Message.closeAll();
          that.$Notify({
            title: "保存失败",
            message: "签名信息疑似违规，请修改后重试！",
            type: "error",
            duration: 2000,
          });
        } else if (res.data.code === 60003) {
          that.$Message.closeAll();
          that.$Notify({
            title: "保存失败",
            message: "头像图片疑似违规，请修改后重试！",
            type: "error",
            duration: 2000,
          });
        } else {
          that.$Message.closeAll();
          that.$Notify({
            title: "保存失败",
            message: "信息保存失败，请重试！",
            type: "error",
            duration: 2000,
          });
        }
      });
    },
    openSureMessage: function () {
      this.$msgbox
        .confirm("确定保存修改吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.doUpdate();
        });
    },
    getImg: function () {
      const that = this;
      const inputFile = this.$refs.filElem.files[0];
      if (inputFile) {
        if (
          inputFile.size > 1024 * 1024 ||
          (inputFile.type !== "image/jpeg" &&
            inputFile.type !== "image/png" &&
            inputFile.type !== "image/gif")
        ) {
          this.$Notify({
            title: "文件类型错误",
            message: "仅支持JPG、PNG、GIF格式，且小于1M！",
            type: "error",
            duration: 2000,
          });
          return false;
        }
      } else {
        return false;
      }

      //图片上传
      const formData = new FormData();
      formData.append("image", inputFile);
      that.$Message.success("图片上传中！");
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      service({
        method: "post",
        url: apiUrl + "/api/v1/user/upload?type=1&userId=" + userInfo.id,
        data: formData,
      }).then((res) => {
        if (res.status === 200) {
          //   that.$refs.md.$img2Url(pos, res.data.url);
          that.$Message.success("图片上传成功！");

          that.userInfo.avatarUrl = res.data.url;
          userInfo.Image = res.data.url;
          userInfo.image = res.data.url;
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          reloadUserInfoForm();
        } else if (res.data.code === 60001) {
          that.$Message.error("该图片疑似违规，上传失败！");
          that.data.blogContent = that.data.blogContent.substring(
            0,
            that.data.blogContent.lastIndexOf("![")
          );
        } else {
          that.$Message.error("保存失败！请重试！");
          that.data.blogContent = that.data.blogContent.substring(
            0,
            that.data.blogContent.lastIndexOf("![")
          );
        }
      });

      //   let fileReader = new FileReader();
      //   fileReader.readAsDataURL(inputFile);
      //   fileReader.onload = function () {
      //     that.userInfo.avatarUrl = this.result;
      //   };
    },
    reloadUserInfoForm: function () {
      var u = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(u);
      this.userInfo.id = u.id;
      this.userInfo.avatarUrl = u.Image;
      this.userInfo.name = u.username;
      this.userInfo.bio = "爱柴犬的小先生";
    },
  },
};
</script>

<style scoped>
.page-navigator > li > a,
.page-navigator > li > span {
  line-height: 1.42857143;
  padding: 6px 12px;
}
.row_content {
  margin-top: 30px;
}
.row_content > .labelVal {
  font-size: 13px;
  line-height: 1;
  color: gray;
}
.row_content > span > i {
  font-size: 10px;
}

.img_container {
  margin-top: 10px;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  background: #0a0f30;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}
.img_container:hover .img_cover {
  display: block;
}
.img_cover {
  display: none;
  height: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.img_cover > .upload_icon {
  display: block;
  text-align: center;
  margin-top: 38px;
}
.hide {
  display: block;
}
.row_content_input {
  padding-top: 8px;
}
.errorNotice {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
}
</style>
