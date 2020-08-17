<template lang="pug">
  component(
    :is="parentNodeType"
    :label="scopedLabel"
    :prop="prop"
    v-show="visible"
  )
    component(
      v-bind="attrs"
      :is="nodeType"
      :value="value"
      @input="$emit('input', $event)"
    )
      component(
        v-if="childCate"
        v-bind="childConf"
        :is="childNodeType"
        v-for="(item, key) in childs"
        :key="key"
        :label="item.value"
        :value="item.key"
      )
</template>

<script>
export default {
  name: "ToteaFormItem",
  props: {
    prefix: {
      type: String,
      default: "el",
    },
    cate: {
      type: String,
      required: true,
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
    value: {
      default: null,
    },
    childConf: {
      type: Object,
      default: () => ({}),
    },
    childs: {
      type: Array,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    httpRequest: {
      type: Function
    },
    baseUrl: String
  },
  computed: {
    parentNodeType() {
      return this.assignPrefix("form-item");
    },
    scopedLabel() {
      return this.label || this.prop || this.attrs.type || this.cate;
    },
    nodeType() {
      return this.assignPrefix(this.cate);
    },
    childCate() {
      return this.childConf.cate;
    },
    childNodeType() {
      return this.assignPrefix(this.childCate);
    }
  },
  methods: {
    assignPrefix(name) {
      return this.prefix + "-" + name;
    },
  },
  created() {}
};
</script>
