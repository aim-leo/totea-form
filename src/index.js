import Form from "./form";
import FormItem from "./form-item";

function install(Vue, config) {
  const { httpRequest, baseUrl } = configure(config);

  FormItem.install(Vue);

  Form.install(Vue, {
    httpRequest,
    baseUrl,
  });
}

function insetResponseInterceptor({
  config,
  data: { code, message, data } = {},
} = {}) {
  console.log(
    `[after request]: method: ${config.method}, url: ${config.url}, code: ${code}, message: ${message}`
  );

  return data;
}

function configure({
  httpRequest = require("axios"),
  baseUrl,
  responseInterceptor = insetResponseInterceptor,
} = {}) {
  if (baseUrl || responseInterceptor) {
    if (baseUrl && httpRequest.defaults) httpRequest.defaults.baseURL = baseUrl;

    if (
      responseInterceptor &&
      httpRequest.interceptors &&
      httpRequest.interceptors.response
    )
      httpRequest.interceptors.response.use(responseInterceptor);
  }

  return { httpRequest, baseUrl };
}

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue, window.toteaFormConfig);
}

export default {
  install,
  extand: FormItem.extend.bind(FormItem),
  configure,
  Form,
  FormItem,
};
