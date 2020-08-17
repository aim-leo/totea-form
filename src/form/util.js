import get from "lodash.get";
import set from "lodash.set";
import has from "lodash.has";
// import orderBy from "lodash.orderby";

import {
  isString,
  isObject,
  isFunc,
  isArray,
  isPromise,
  isType,
} from "../helper";

import formItem from "../form-item";

// function uppercaseFirstStr(str) {
//   if (!isString(str)) throw new Error('str expected a string')

//   return str[0].toUpperCase() + str.substr(1)
// }

// function defineEnumerablePropertry(target, key, value) {
//   Object.defineProperty(target, key, {
//     value,
//     enumerable: false,
//   });
// }

function transformArrayPropName(list, tList) {
  if (!isArray(list)) {
    throw new Error(`list expected a list, got a ${list}`);
  }
  if (!isArray(tList)) {
    throw new Error(`tList expected a list, got a ${tList}`);
  }
  for (const key in list) {
    for (const t of tList) {
      if (!isArray(tList)) {
        throw new Error(`tList expected a list contain list, got a ${tList}`);
      }
      const [origin, target] = t;

      if (!isString(origin, target)) {
        throw new Error(
          `tList expected a list contain list<string>, got a ${tList}`
        );
      }

      const result = {
        ...list[key],
        [target]: list[key][origin],
      };

      delete result[origin];

      list.splice(key, 1, result);
    }
  }

  return list;
}

export default class FormUtil {
  constructor(node) {
    this.$node = node;

    this._registerWatcher = (target, callback) => {
      node.$watch(target, callback);
    };
  }

  async formatSchema(isAsync = true) {
    let result = [];

    for (let item of this.$node.schema) {
      // format item to object
      if (isString(item)) {
        item = {
          cate: item,
          prop: item,
        };
      }

      if (isObject(item) && !("prop" in item)) {
        item.prop = item.cate;
      }

      // mapping formItem preset to prop, so you can encapsulation you own component
      const { props } = formItem.format(item);

      item = props;

      // visible | childs can be a <boolean> | <function> | <promise> | { relative: true | array<string>, callback: <function> | <promise> }
      // if it is disposable, it will calculate at component init
      // if it is a relative, we will handle it as reactive prop
      // so we need register a watcher to auto update the prop when form's value changed
      if (isAsync) {
        await this._handleVariableVisible(item);
        await this._handleVariableChilds(item);
        await this._handleVariableAttrsOption(item);
      } else {
        this._handleVariableVisible(item);
        this._handleVariableChilds(item);
        this._handleVariableAttrsOption(item);
      }

      if (isFunc(item.normalise)) {
        item = item.normalise(item);
      }

      set(item, "httpRequest", this.$node.httpRequest);
      set(item, "baseUrl", this.$node.baseUrl);

      console.log('this.$node.baseUrl', this.$node.baseUrl)

      result.push(item);
    }

    // base on rule and formtype, sort the schema
    result = this._sortSchema(result);

    return result;
  }

  _sortSchema(list) {
    const result = [];
    const listKeys = list.map((s) => s.prop);
    // if seted orderList
    if (this.$node.orderList) {
      this.$node.orderList.map((item) => {
        const propIndex = listKeys.indexOf(item);

        if (propIndex !== -1) {
          result.push(list[propIndex]);
          list[propIndex] = null;
        }
      });
    }

    // remove useless item
    list = list
      .filter((s) => !!s)
      .map((s) => {
        let order = this._propIsRequired(s.prop) ? 10000 : 0;

        if (s.cate === "upload") order -= 1000;
        if (s.cate === "editor") order -= 1000;
        if (s.cate === "input") {
          order +=
            isObject(s.attrs) && s.attrs.type === "textarea" ? -500 : 1000;
        }

        s.order = order;
        return s;
      });

    list.sort((a, b) => b.order - a.order);

    // sort other item
    // if the scope is required, move it to start
    // list.sort((a, b) => {
    //   const aIsRequired = this._propIsRequired(a.prop);
    //   const bIsRequired = this._propIsRequired(b.prop);

    //   if (aIsRequired && !bIsRequired) return -1;
    //   if (!aIsRequired && bIsRequired) return 1;

    //   // if is upload form type, move it to end
    //   if (a.cate === "upload" && b.cate !== "upload") return 1;
    //   if (a.cate !== "upload" && b.cate === "upload") return -1;

    //   return 0;
    // });

    result.push(...list);

    return result;
  }

  _getFirstRule(prop) {
    const rules = (this.$node.rules || {})[prop] || [];
    return rules[0];
  }

  _propIsRequired(prop) {
    const rule = this._getFirstRule(prop);
    return isObject(rule) && "required" in rule;
  }

  _handleVariableVisible(item) {
    return this._handleVariableProp("visible", item, {
      emptyState: false,
    });
  }

  _handleVariableChilds(item) {
    return this._handleVariableProp("childs", item, {
      onReactivePropChange: () => {
        // when reactive prop changed, clear chose
        this.$node.value[item.prop] = null;
      },
      emptyState: [],
    });
  }

  _handleVariableAttrsOption(item) {
    return this._handleVariableProp("attrs.options", item, {
      onReactivePropChange: () => {
        // when reactive prop changed, clear chose
        this.$node.value[item.prop] = null;
      },
      emptyState: [],
    });
  }

  async _handleVariableProp(
    path,
    item,
    { onReactivePropChange, emptyState } = {}
  ) {
    const eumerablePropkey = path + "_origin_prop_name";

    const getFunctionalPropResult = async () => {
      const { callback, key, valueKey, normalise } = get(
        item,
        eumerablePropkey
      );
      let result = callback;

      if (isString(result)) {
        result = (
          await this.$node.httpRequest(this.$node.baseUrl + "/" + result)
        ).list;
      }

      if (isFunc(result)) {
        result = result(this.$node.value);
      }

      if (isPromise(result)) {
        result = await result;
      }

      // if defined key || valueKey, should transform it
      if (key !== undefined || valueKey !== undefined) {
        transformArrayPropName(result, [
          [key, "key"],
          [valueKey, "value"],
        ]);
      }

      if (isFunc(normalise)) {
        result = normalise(result);
      }

      return result;
    };

    const getWatcherList = (relative) => {
      if (relative === true) {
        return [() => getFunctionalPropResult()];
      }

      if (isArray(relative)) {
        // check every prop is exsist
        for (const key of relative) {
          if (!(key in this.$node.value))
            throw new Error(`relative include a unexist prop: ${key}`);
        }

        return relative.map((s) => `value.${s}`);
      }
    };

    if (!isString(path)) {
      throw new Error(`key expected a string, but got a ${path}`);
    }

    if (!isObject(item)) {
      throw new Error(`item expected a object, but got a ${item}`);
    }

    if (!has(item, path)) return;

    if (isType(get(item, path), emptyState)) return;

    if (isFunc(get(item, path))) {
      set(item, path, {
        callback: get(item, path),
      });
    }

    if (isObject(get(item, path))) {
      // save origin prop
      set(item, eumerablePropkey, get(item, path));

      // if reactive
      if (get(item, path).reactive) {
        const watcherList = getWatcherList(get(item, path).reactive);
        for (const watcherFn of watcherList) {
          // then register a watcher
          this._registerWatcher(watcherFn, async () => {
            set(item, path, await getFunctionalPropResult());

            if (isFunc(onReactivePropChange))
              onReactivePropChange(get(item, path));
          });
        }
      }
      // init as emptyState
      set(item, path, emptyState);

      // calculate init state
      set(item, path, await getFunctionalPropResult());
    }
  }
}
