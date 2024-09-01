// pages/log/index.js

//index.js
//获取应用实例
Page({
  /**
   * 页面的初始数据
   */
  data:{
    code:"0",
    location:[],
    imageUrl: "",
    userName:"",
    userPass:"",
  },

  methods: {
    onChange(event) {
      console.log('radio', event.detail);
    },
  },

  /* 登录校验操作 */
  login: function () {
    if (this.data.userName === "admin" && this.data.userPass === "123123") {
      wx.navigateTo({
        url: '/pages/list/index',
        success: function(res) {
          console.log('router1 success');
        },
        fail: function(res) {
          console.log('router1 fail');
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'none'
      })
    }
  },
})