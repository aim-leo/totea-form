import Form from "./Form";

function install(Vue, { httpRequest, baseUrl }) {
  Vue.component("ToteaForm", {
    functional: true,
    render(h, context) {
      console.log(context.props)
      if (baseUrl !== undefined && !("baseUrl" in context.props)) {
        context.props.baseUrl = baseUrl
      }

      if (httpRequest !== undefined && !("httpRequest" in context.props)) {
        context.props.httpRequest = httpRequest;
      }

      return h(
        Form,
        {
          ...context.data,
          props: context.props,
        },
        context.children
      );
    },
  });
}

export default {
  install,
};
