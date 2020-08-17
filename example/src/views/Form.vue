<template lang="pug">
  ToteaForm(v-model="form" :schema="schema" @comfirm="onComfirm")
</template>

<script>
const likeList = [
  {
    key: "lq",
    value: "篮球",
  },
  {
    key: "zq",
    value: "足球",
  },
];

export default {
  data() {
    return {
      form: {
        password: null,
        input: null,
        textarea: null,
        select: null,
        multi_select: [],
        checkbox: [],
        date: null,
        time: null,
        date_range: [],
        datetime: null,
        int: null,
        float: null,
        editor: null,
        upload: []
      },
      schema: [
        "password",
        "input",
        "textarea",
        {
          cate: "select",
          childs: likeList,
        },
        {
          cate: "multi_select",
          childs: likeList,
        },
        {
          cate: "checkbox",
          childs: likeList,
        },
        "date",
        "time",
        "date_range",
        "datetime",
        "int",
        "float",
        "editor",
        {
          cate: 'upload',
          attrs: {
            action: '/upload/image'
          },
        },
        {
          cate: "dynamic_tags",
          max: 3
        }
      ],
    };
  },
  methods: {
    handleChange() {
      console.log("handleChange");
    },
    onComfirm(value) {
      console.log("comfirm", value);
    },
  },
  created() {}
};
</script>
