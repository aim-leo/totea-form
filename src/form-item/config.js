export const nodes = {
  password: {
    cate: "input",
    attrs: {
      type: "password",
    },
  },
  textarea: {
    cate: "input",
    attrs: {
      type: "textarea",
    },
  },
  select: {
    cate: "select",
    childConf: {
      cate: "option",
    },
  },
  multi_select: {
    cate: "select",
    attrs: {
      multiple: true,
    },
    childConf: {
      cate: "option",
    },
    label: "multi-select",
    childs: {
      valueKey: "name",
      key: "id",
    },
  },
  radio: {
    cate: "radio-group",
    childConf: {
      cate: "radio",
    },
  },
  checkbox: {
    cate: "checkbox-group",
    childConf: {
      cate: "checkbox",
    },
    label: "checkbox",
  },
  time: {
    cate: "time-picker",
  },
  date: {
    cate: "date-picker",
  },
  date_range: {
    cate: "date-picker",
    attrs: {
      type: "daterange",
    },
  },
  datetime: {
    cate: "date-picker",
    attrs: {
      type: "datetime",
    },
  },
  int: {
    cate: "input-number",
    label: "int",
  },
  float: {
    cate: "input-number",
    attrs: {
      precision: 2,
      step: 0.01,
    },
    label: "float",
  },
  id_select: {
    cate: "select",
    childConf: {
      cate: "option",
    },
    childs: {
      valueKey: "name",
      key: "id",
    },
  },
  category: {
    cate: "cascader",
    prop: "category",
    attrs: {
      props: {
        value: "id",
        label: "name",
        emitPath: false,
      },
    },
  },
  editor: {
    component: require("../extra-nodes/Tinymce").default,
    uploadAttrs: {
      action: "/upload/image",
      name: "image",
      listType: "text",
      multiple: true,
      showFileList: false,
      size: "mini",
    },
  },
  upload: {
    component: require("../extra-nodes/Upload").default,
    attrs: {
      action: "/upload/image",
      name: "image",
      listType: "picture",
      multiple: true,
    },
    label: "upload",
  },
  dynamic_tags: {
    component: require("../extra-nodes/DynamicTags").default,
  },
};
