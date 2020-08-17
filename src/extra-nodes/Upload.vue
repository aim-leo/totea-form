<template lang="pug">
  component(:is="pure ? 'div' : 'el-form-item'" :label="label" :prop="prop")
    el-upload.upload-demo(v-bind="attrs" :http-request="scopeHttpRequest" :file-list="fileList" :limit="attrs.length || attrs.max")
      el-button(:size="attrs.size || 'mini'", type='primary') {{ uploadText }}
      .el-upload__tip(slot='tip') {{ uploadTip }}
</template>
<script>
export default {
  components: {},
  data() {
    return {
      fileList: [],
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
    uploadText: {
      type: String,
      default: "点击上传",
    },
    uploadTip: {
      type: String,
    },
    httpRequest: Function,
    baseUrl: String,
    pure: Boolean,
  },
  computed: {},
  watch: {},
  methods: {
    assignValue() {
      this.fileList = this.value.map((name) => ({
        name,
        url: this.baseUrl + "/" + name,
      }));
    },
    async scopeHttpRequest(data) {
      const form = new FormData();
      form.append(this.attrs.name || "image", data.file);

      const result = await this.httpRequest.post(data.action, form);

      this.$emit("successcbk", result);
      let list = [...this.value];
      list.push(result);

      this.$emit("input", list);

      return result;
    },
  },
  created() {
    this.assignValue();
  },
  mounted() {},
};
</script>

<style lang="less" scoped></style>
