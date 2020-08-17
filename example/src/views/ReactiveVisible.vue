<template lang="pug">
  ToteaForm(v-model="form" :schema="schema" @comfirm="onComfirm")
</template>

<script>
export default {
  data() {
    return {
      form: {
        switch: null,
        select: null,
        input: null
      },
      schema: [
        {
          cate: 'switch',
          label: '喜欢运动吗？'
        },
        {
          cate: "select",
          childs: ['足球', '篮球', '其他'],
          label: '请选择你喜欢的运动',
          visible: {
            reactive: true,
            callback: form => form.switch
          }
        },
        {
          cate: "input",
          label: '自定义你喜欢的运动',
          visible: {
            reactive: true,
            callback: form => form.select === '其他'
          }
        }
      ],
    };
  },
  methods: {
    handleChange() {
      console.log("handleChange");
    },
    onComfirm(value) {
      console.log('comfirm', value)
    }
  }
};
</script>
