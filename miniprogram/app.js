App({
  async onLaunch() {
    this.initcloud()

    this.globalData = {
      // 用于存储待办记录的集合名称
      collection: 'todo',
      // 最大文件上传数量
      fileLimit: 2
    }
  }})