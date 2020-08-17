<template lang="pug">
  el-form(ref="form" :model="value" :rules="rules" v-loading="loading" label-width="120px" label-position="right")
    ToteaFormItem(
      v-for="formItem in scopeSchema"
      :key="formItem.prop"
      v-bind="formItem"
      v-model="value[formItem.prop]"
    )
    el-form-item.totea-form-button-group(style="margin-top: 20px;")
      el-button(:type="comfirmProp.type || 'primary'" v-bind="comfirmProp" @click="onComfirm" v-if="_events.comfirm") {{ comfirmText }}
      el-button(:type="cancelProp.type || 'info'" v-bind="cancelProp" @click="onCancel" v-if="_events.cancel" style="margin-right:10px;") {{ cancelText }}
      el-button(v-for="(item, key) in btn" v-bind="item" :key="key" @click="item.callback") {{ item.text }}
</template>
<script>
import FormUtil from "./util";
export default {
  name: "ToteaForm",
  components: {},
  data() {
    return {
      scopeSchema: [],
      loading: false,
    };
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    schema: {
      type: Array,
      default: () => [],
    },
    rules: {
      // validate rules
      type: Object,
    },
    action: {
      // post address
      type: String,
    },
    comfirmText: {
      type: String,
      default: "确认",
    },
    comfirmProp: {
      type: Object,
      default: () => ({}),
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    cancelProp: {
      type: Object,
      default: () => ({}),
    },
    btn: {
      type: Array,
      default: () => [],
    },
    showLoadingAtIniting: {
      type: Boolean,
      default: false,
    },
    orderList: Array,
    httpRequest: {
      type: Function,
    },
    baseUrl: String,
  },
  watch: {
    schema() {
      this.updateSchema();
    },
  },
  methods: {
    onComfirm() {
      // check rule
      if (this.rules) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.onComfirmSuccess();
          }
        });

        return;
      }

      this.onComfirmSuccess();
    },
    async onComfirmSuccess() {
      this.$emit("comfirm", this.value);

      // if seted action, auto post the result
      if (this.action) {
        const result = await this.httpRequest.post(this.action, this.value);
      }
    },
    onCancel() {
      this.$emit("cancel");
    },
    async updateSchema() {
      if (!this.showLoadingAtIniting) {
        this.scopeSchema = await this.util.formatSchema(false);
        console.log('this.scopeSchema', this.scopeSchema)
        return;
      }

      this.loading = true;
      this.scopeSchema = await this.util.formatSchema();
      console.log('this.scopeSchema', this.scopeSchema)
      this.loading = false;
    },
  },
  created() {
    this.util = new FormUtil(this);
    this.updateSchema();
  },
  mounted() {},
};
</script>
