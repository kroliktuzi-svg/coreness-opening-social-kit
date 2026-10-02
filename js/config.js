/* =============================================================
   页面配置区：标题、按钮、颜色与图片路径都集中在这里。
   100 条文案在同目录 coreness-copy.js 中，底层交互在 app.js。
   ============================================================= */

window.SITE_CONFIG = {
  meta: {
    title: "重心 CORENESS｜小红书发布助手",
    description: "随机生成重心 CORENESS 小红书文案与配图，支持一键复制和换一组。"
  },

  theme: {
    brand: "#0b0a0a",
    brandDark: "#0b0a0a",
    accent: "#0b0a0a",
    pageBg: "#242424",
    surface: "#ffffff",
    ink: "#0b0a0a",
    muted: "#707070"
  },

  text: {
    copyButton: "复制整段文案",
    copiedButton: "文案已复制",
    refreshButton: "换一组"
  },

  images: {
    /* 第 1 张固定 */
    mainKv: {
      src: "./images/content/01-necklace.jpg",
      alt: "重心 CORENESS 水晶项链上身展示",
      label: "水晶项链",
      fit: "cover"
    },

    /* 第 2 张随机池 */
    image2Pool: [
      { src: "./images/content/02-styling.jpg", alt: "重心 CORENESS 水晶首饰上手展示", label: "水晶首饰穿搭", fit: "cover" }
    ],

    /* 第 3 张随机池 */
    image3Pool: [
      { src: "./images/content/03-bracelet.jpg", alt: "重心 CORENESS 水晶手串展示", label: "水晶手串", fit: "cover" }
    ],

    /* 第 4 张随机池 */
    image4Pool: [
      { src: "./images/content/04-earring.jpg", alt: "重心 CORENESS 水晶耳饰上身展示", label: "水晶耳饰", fit: "cover" }
    ]
  },

  copyGroups: window.CORENESS_COPY_GROUPS
};
