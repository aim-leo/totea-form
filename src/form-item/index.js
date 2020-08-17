import merge from "deepmerge";

import FormItem from "./FormItem";

import { nodes } from "./config";

import { isString, isObject, isFunc, isArray, isNumber } from "../helper";
// eslint-disable-next-line
function isVueComponent(node) {
  return isObject(node) && isFunc(node.render);
}

class ToteaFormItem {
  constructor() {
    this._presets = nodes;
  }

  extend(cate, config) {
    if (!isString(cate)) {
      throw new Error(`cate expected a string, but got a ${cate}`);
    }

    if (!isObject(config)) {
      throw new Error(
        `config expected a object | component, but got a ${config}`
      );
    }

    this._presets[cate] = config;
  }

  install(Vue) {
    Vue.component("ToteaFormItem", {
      functional: true,
      render: this.render.bind(this),
    });
  }

  format(props) {
    const preset = this._presets[props.cate];

    if (!preset)
      return {
        component: FormItem,
        props,
      };

    if (isVueComponent(preset)) {
      return {
        component: preset,
        props,
      };
    }

    if (isObject(preset) && isVueComponent(preset.component)) {
      delete props.component;
      return {
        component: preset.component,
        props: merge(preset, props),
      };
    }

    delete props.cate;
    return {
      component: FormItem,
      props: merge(preset, props),
    };
  }

  render(h, context) {
    const { component, props } = this.format(context.props);

    // check props childs
    if (isArray(props.childs)) {
      props.childs = props.childs.map((item) => {
        if (isString(item) || isNumber(item)) return { key: item, value: item };

        if (isObject(item) && "key" in item && "value" in item) return item;

        throw new Error(`prop: ${props.prop}, childs expected a array, contain key and value prop`);
      });
    }

    return h(
      component,
      {
        ...context.data,
        props,
      },
      context.children
    );
  }
}

export default new ToteaFormItem();
