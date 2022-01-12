module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowsers: ['Chrome >= 51', 'iOS >= 10'],
    },
    'postcss-pxtorem': {
      rootValue: 20, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'],
    },
  },
}
