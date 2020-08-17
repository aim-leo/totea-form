<template lang="pug">
  el-form-item(:label="label")
    el-tag(:key='tag', v-for='tag in value', closable='', :disable-transitions='false', @close='handleClose(tag)' type="warning")
      | {{tag}}
    el-input.input-new-tag(v-if='inputVisible && canAdd', v-model='inputValue', ref='saveTagInput', size='small', @keyup.enter.native='handleInputConfirm', @blur='handleInputConfirm')
    el-button.button-new-tag(v-else-if="canAdd", size='small', @click='showInput' type="primary" plain) + {{ addText }}
</template>
<script>
export default {
  components: {},
  data() {
    return {
      inputVisible: false,
      inputValue: "",
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "dynamic-tags",
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
    addText: {
      type: String,
      default: '新增'
    },
    max: Number
  },
  computed: {
    canAdd() {
      return this.max === undefined || this.value.length < this.max
    }
  },
  watch: {},
  methods: {
    handleClose(tag) {
      this.value.splice(this.value.indexOf(tag), 1)
      this.$emit("input", this.value);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.$emit("input", this.value.concat(inputValue));
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
</style>
