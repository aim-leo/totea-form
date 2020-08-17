<template lang="pug">
  el-form(label-width="120px" label-position="right")
    ToteaFormItem(v-model="input" cate="input")
    ToteaFormItem(v-model="password" cate="password")
    ToteaFormItem(v-model="textarea" cate="textarea")
    ToteaFormItem(v-model="select" cate="select" :childs="likeList")
    ToteaFormItem(v-model="multi_select" cate="multi_select" :childs="likeList")
    //- ToteaFormItem(v-model="radio" cate="radio" :childs="likeList")
    ToteaFormItem(v-model="checkbox" cate="checkbox" :childs="likeList")
    ToteaFormItem(v-model="date" cate="date")
    ToteaFormItem(v-model="time" cate="time")
    ToteaFormItem(v-model="date_range" cate="date_range")
    ToteaFormItem(v-model="datetime" cate="datetime")
    ToteaFormItem(v-model="int" cate="int")
    ToteaFormItem(v-model="float" cate="float")
    ToteaFormItem(v-model="editor" cate="editor")
    ToteaFormItem(v-model="upload" cate="upload" :attrs="{ action: 'upload/image' }")
    ToteaFormItem(v-model="dynamic_tags" cate="dynamic_tags")
</template>

<script>
export default {
  data() {
    return {
      likeList: [
        {
          key: 'lq',
          value: '篮球'
        },
        {
          key: 'zq',
          value: '足球'
        }
      ],
      
      password: null,
      input: null,
      textarea: null,
      select: [],
      multi_select: [],
      checkbox: [],
      radio: null,
      date: null,
      time: null,
      date_range: [],
      datetime: null,
      int: null,
      float: null,
      editor: null,
      upload: [],
      dynamic_tags: []
    }
  },
  methods: {
    handleChange() {
      console.log('handleChange')
    }
  }
}
</script>
