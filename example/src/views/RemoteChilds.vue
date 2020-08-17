<template lang="pug">
  ToteaForm(v-model="form" :schema="schema" @comfirm="onComfirm")
</template>

<script>
export default {
  data() {
    return {
      form: {},
      schema: [
        {
          cate: "input",
          prop: "name",
          label: "商品名称",
        },
        {
          cate: "category",
          prop: "category",
          attrs: {
            options: {
              callback: "/category"
            }
          },
          label: "商品分类",
        },
        {
          cate: "id_select",
          prop: "tag",
          childs: {
            callback: "/tag",
          },
          label: "商品标签",
        },
        {
          cate: "float",
          prop: "price",
          label: "商品价格",
        },
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
  created() {},
};
</script>
