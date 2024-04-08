<template>
  <div style="height: 100vh">
    <div>
      <div class="sc-1duRon-2 pvvuG" style="margin: 0">
        <div
          class="sm-btn-group sc-1duRon-5 dvRHZl sc-17dnj82-0 dfsiVH"
          style="z-index: 9999"
        >
          <span class="switch-tips">已有帐号？请</span>
          <router-link
            to="/login"
            class="sm-button sc-1n784rm-0 sfCUt"
            type="default"
            >登录</router-link
          >
        </div>
      </div>
    </div>
    <div class="sc-1duRon-1 sbfRl">
      <p
        class="sc-1I1iYs-3 kmwMDA"
        style="font-family: serif; font-size: 18px; color: #41464b"
      >
        宠物之家
      </p>
    </div>
    <div class="sc-1duRon-3 cPHJDB">
      <div class="sc-1duRon-4 doAKkT">
        <div class="sc-3JRwrF irtYus">
          <div class="main">
            <div class="title">
              <!--                                <img src="http://localhost/exam/resources/views/img/70.png" style="width: 40%">-->
              <p>注册</p>
            </div>
            <div class="sc-3JRwrF-1 khjAih">
              <div class="form-wrapper">
                <div class="sc-2oZUsG bHHvBK">
                  <form id="form">
                    <div>
                      <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail">
                        <label class="label">昵称</label>
                        <at-input
                          v-model="nickname"
                          :status="nicknameType"
                          :icon="''"
                        ></at-input>
                        <div
                          :class="{
                            errorTips: nicknameType === 'error',
                            successTips: nicknameType === 'success',
                          }"
                        >
                          {{ nicknameTip }}
                        </div>
                      </div>

                      <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail">
                        <label class="label">登录密码</label>

                        <at-input
                          v-model="password"
                          type="password"
                          :status="passwordType"
                          :icon="''"
                        ></at-input>
                        <div
                          :class="{
                            errorTips: passwordType === 'error',
                            successTips: passwordType === 'success',
                          }"
                          id="phoneTip"
                        >
                          {{ passwordTip }}
                        </div>
                      </div>
                      <div class="sc-3ksGSP kPTEpp" type="mobileOrEmail">
                        <label class="label">确认密码</label>
                        <at-input
                          v-model="repassword"
                          type="password"
                          :status="repasswordType"
                          :icon="''"
                        ></at-input>

                        <div
                          :class="{
                            errorTips: repasswordType === 'error',
                            successTips: repasswordType === 'success',
                          }"
                          id="zhibuTip"
                          class="tips"
                        >
                          {{ repasswordTip }}
                        </div>
                      </div>

                      <button
                        class="sm-button submit sc-1n784rm-0 bcuuIb"
                        type="button"
                        @click="doRegist"
                      >
                        立即注册
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from "at-ui";
import { Button } from "at-ui";
import axios from "axios";
import { apiUrl } from "@/store/index"

export default {
  name: "Register",
  data() {
    return {
      yzmSrc: "/api/regist/yzm", //验证码获取地址
      nickname: "", //用户名
      phone: "", //电话
      password: "", //密码
      repassword: "", //重复密码
      imgYzm: "", //图片验证码
      messageCode: "", //短信验证码
      nicknameType: "", //用户名框类型
      phoneType: "", //电话框类型
      passwordType: "", //密码类型
      repasswordType: "", //重复密码类型
      imgYzmType: "", //图片验证码类型
      messageCodeType: "", //短信验证码类型
      nicknameTip: "", //用户名提示
      phoneTip: "", //电话提示
      passwordTip: "", //密码提示
      repasswordTip: "", //重复密码提示
      imgYzmTip: "", //图片验证码提示
      messageCodeTip: "", //短信验证码提示
      messageCodeIsSend: false, //短信验证码是否发送成功
      imgYzmIsRight: "",
      reSendMessageText: "60秒后重新发送",
      checkPhonePos: false,
    };
  },
  watch: {
    password: function (newValue, oldValue) {
      this.checkPassword();
    },
    repassword: function () {
      this.checkRepassword();
    },
    nickname: function () {
      this.checkNickname();
    },
  },
  components: {
    AtInput: Input,
    AtButton: Button,
  },
  methods: {
    doRegist: function () {
      this.$Message({
        message: "正在注册中....",
        duration: 0,
      });
      let val = false;
      let checkPassword = this.checkPassword();
      let checkRePassword = this.checkRepassword();
      const that = this;
      let url = apiUrl + "/api/v1/user";
      console.log(url)
      let data = {
        "username": that.nickname,
        "password": that.password,
        "age": "22",
        "sex": "1",
      };
      that.$Message.closeAll();
      axios.post(url,data).then(function (res) {
        if (res.data.code === 200) {
          that.nicknameType = "success";
          that.nicknameTip = "核验通过！";
          that.$Message({
            message: "注册成功，请返回登录！",
            type: "success",
          });
        } else {
          that.nicknameType = "error";
          that.nicknameTip = "该用户名已被使用！";
          that.$Message({
            message: res.data.msg,
            type: "fail",
          });
        }
      });
    },
    //判断密码
    checkPassword: function () {
      if (this.password.length >= 6) {
        this.passwordType = "success";
        this.passwordTip = "密码强度：" + this.checkStrong(this.password) + "";
        return true;
      } else {
        this.passwordType = "error";
        this.passwordTip = "密码长度6-12位！";
        return false;
      }
    },
    //判断重复密码
    checkRepassword: function () {
      if (this.password === this.repassword) {
        this.repasswordType = "success";
        this.repasswordTip = "匹配成功！";
        return true;
      } else {
        this.repasswordType = "error";
        this.repasswordTip = "两次输入不匹配！";
        return true;
      }
    },
    //判断电话号码
    checkPhone: function () {
      if (this.phone.length >= 11) {
        if (!/^1[345789]\d{9}$/.test(this.phone)) {
          this.phoneType = "error";
          this.phoneTip = "核验失败！";
          return false;
        } else {
          const that = this;
          let url = "/api/regist/checkPhone?phone=" + this.phone;
          axios.get(url).then(function (res) {
            if (res.data.code === 100) {
              that.phoneType = "success";
              that.phoneTip = "核验通过！";
              that.checkPhonePos = true;
            } else {
              that.phoneType = "error";
              that.phoneTip = "该手机号已被注册！";
              that.checkPhonePos = false;
            }
          });
          return this.checkPhonePos;
        }
      } else {
        this.phoneType = "error";
        this.phoneTip = "核验失败！";
        return false;
      }
    },
    //判断用户名
    checkNickname: function () {
      if (this.nickname.length >= 1 && this.nickname.length <= 12) {
        const that = this;
        let url = "/api/regist/checkNickname?nickname=" + this.nickname;
        axios.get(url).then(function (res) {
          if (res.data.code === 100) {
            that.nicknameType = "success";
            that.nicknameTip = "核验通过！";
          } else {
            that.nicknameType = "error";
            that.nicknameTip = "该昵称已被使用！";
          }
        });
      } else {
        this.nicknameType = "error";
        this.nicknameTip = "昵称长度1-12个字符！";
        return false;
      }
    },
    checkStrong: function (sValue) {
      var modes = 0;
      //正则表达式验证符合要求的
      if (sValue.length < 1) return modes;
      if (/\d/.test(sValue)) modes++; //数字
      if (/[a-z]/.test(sValue)) modes++; //小写
      if (/[A-Z]/.test(sValue)) modes++; //大写
      if (/\W/.test(sValue)) modes++; //特殊字符

      //逻辑处理
      switch (modes) {
        case 1:
          return "弱";
          break;
        case 2:
          return "中";
          break;
        case 3:
        case 4:
          return "强";
          break;
      }
      return modes;
    },
  },
};
</script>

<style scoped>
@import "~assets/css/logres/login.css";
label {
  text-align: left;
  text-shadow: none;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", Helvetica,
    Tahoma, Arial, "Microsoft YaHei", 微软雅黑, 黑体, Heiti, sans-serif, SimSun,
    宋体, serif;
  display: block;
  padding: 0;
}
</style>
