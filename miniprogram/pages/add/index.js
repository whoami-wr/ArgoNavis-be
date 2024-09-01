/* 新增待办页面 */

Page({
  // 保存编辑中待办的信息
  data: {
    title: '',
    desc: '',
    files: [],
    fileName: '',
    freqOptions: ['学习', '运动','社交','其他'],
    freq: 0,
    mode: '',
    datetimeVisible: false,
    datetime: new Date('2021-12-23').getTime(),
    datetimeText: '',
    cityText: '',
    city2Text: '',
    cityValue: [],
    city2Value: [],
    cityTitle: '',
    city2Title: '',
    citys: [
      { label: '重要且紧急', value: '重要且紧急' },
      { label: '重要不紧急', value: '重要不紧急' },
      { label: '不重要且紧急', value: '不重要且紧急' },
      { label: '不重要不紧急', value: '不重要不紧急' },
    ],
    leiText: '',
    lei2Text: '',
    leiValue: [],
    lei2Value: [],
    leiTitle: '',
    lei2Title: '',
    leis: [
      { label: '学习', value: '学习' },
      { label: '社交', value: '社交' },
      { label: '作业', value: '作业' },
      { label: '运动', value: '运动' },
      { label: '其他', value: '其他' },
    ],
  },

  // 表单输入
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  // 响应事件状态选择器
  onChooseFreq(e) {
    this.setData({
      freq: e.detail.value
    })
  },

  // 保存待办
  async saveTodo() {
    // 对输入框内容进行校验
    if (this.data.title === '') {
      wx.showToast({
        title: '事项标题未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 10) {
      wx.showToast({
        title: '事项标题过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '事项描述过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    const db = await getApp().database()
    // 在数据库中新建待办事项，并填入已编辑对信息
    db.collection(getApp().globalData.collection).add({
      data: {
        title: this.data.title,       // 待办标题
        desc: this.data.desc,         // 待办描述
        files: this.data.files,       // 待办附件列表
        freq: Number(this.data.freq), // 待办完成情况（提醒频率）
        star: false
      }
    }).then(() => {
      wx.navigateBack({
        delta: 0,
      })
    })
  },

  // 重置所有表单项
  resetTodo() {
    this.setData({
      title: '',
      desc: '',
      files: [],
      fileName: '',
      freq: 0,
      mode: '',
      datetimeVisible: false,
      datetime: new Date('2024-8-1').getTime(),
      datetimeText: '',
      cityText: '',
      city2Text: '',
      cityValue: [],
      city2Value: [],
      cityTitle: '',
      city2Title: '',
      citys: [
      { label: '重要且紧急', value: '重要且紧急' },
      { label: '重要不紧急', value: '重要不紧急' },
      { label: '不重要且紧急', value: '不重要且紧急' },
      { label: '不重要不紧急', value: '不重要不紧急' },
      ],
      leiText: '',
      lei2Text: '',
      leiValue: [],
      lei2Value: [],
      leiTitle: '',
      lei2Title: '',
      leis: [
        { label: '学习', value: '学习' },
        { label: '社交', value: '社交' },
        { label: '作业', value: '作业' },
        { label: '运动', value: '运动' },
        { label: '其他', value: '其他' },
      ],
    })
  },

  //截止日期
  showPicker(e) {
    const { mode } = e?.currentTarget?.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const { value } = e?.detail;
    const { mode } = this.data;

    console.log('confirm', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });

    this.hidePicker();
  },

  onColumnChange(e) {
    console.log('pick', e?.detail?.value);
  },

//jibie
  onColumnChange1(e) {
    console.log('picker pick:', e);
},

  onPickerChange(e) {
  const { key } = e.currentTarget.dataset;
  const { value } = e.detail;

  console.log('picker change:', e.detail);
  this.setData({
    [`${key}Visible`]: false,
    [`${key}Value`]: value,
    [`${key}Text`]: value.join(' '),
  });
},

onPickerCancel(e) {
  const { key } = e.currentTarget.dataset;
  console.log(e, '取消');
  console.log('picker1 cancel:');
  this.setData({
    [`${key}Visible`]: false,
  });
},

onTitlePicker() {
  this.setData({ cityVisible: true, cityTitle: '选择事件重要等级' });
},

onWithoutTitlePicker() {
  this.setData({ city2Visible: true, city2Title: '' });
},

//leixing
onColumnChange2(e) {
  console.log('picker pick:', e);
},

onPickerChange2(e) {
const { key } = e.currentTarget.dataset;
const { value } = e.detail;

console.log('picker change:', e.detail);
this.setData({
  [`${key}Visible`]: false,
  [`${key}Value`]: value,
  [`${key}Text`]: value.join(' '),
});
},

onPickerCancel2(e) {
const { key } = e.currentTarget.dataset;
console.log(e, '取消');
console.log('picker1 cancel:');
this.setData({
  [`${key}Visible`]: false,
});
},

onTitlePicker2() {
  this.setData({ leiVisible: true, leiTitle: '选择事件类别' });
},

onWithoutTitlePicker2() {
  this.setData({ lei2Visible: true, lei2Title: '' });
},
})