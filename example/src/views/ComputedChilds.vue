<template lang="pug">
  ToteaForm(v-model="form" :schema="schema" @comfirm="onComfirm")
</template>

<script>
const option = {
  广东: {
    广州: ['天河', '增城'],
    深圳: ['南山', '罗湖']
  },
  湖南: {
    长沙: ['芙蓉', '天心'],
    株洲: ['荷塘', '天元']
  }
}
export default {
  data() {
    return {
      form: {
        province: null,
        city: null,
        county: null
      }
    };
  },
  computed: {
    cityList() {
      return Object.keys(option[this.form.province] || {})
    },
    countyList() {
      const cityList = option[this.form.province]

      if (!cityList) return []

      return cityList[this.form.city] || []
    },
    schema() {
      return [
        {
          cate: "select",
          prop: 'province',
          childs: Object.keys(option),
          label: '省'
        },
        {
          cate: "select",
          prop: 'city',
          childs: this.cityList,
          label: '市'
        },
        {
          cate: "select",
          prop: 'county',
          childs: this.countyList,
          label: '区'
        },
      ]
    }
  },
  methods: {
    handleChange() {
      console.log("handleChange");
    },
    onComfirm(value) {
      console.log('comfirm', value)
    }
  }
};
</script>
