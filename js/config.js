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
    /* 第 1 张固定；后续上传正式主图时只替换 src，并将 fit 改为 cover */
    mainKv: {
      src: "./images/coreness-logo.png",
      alt: "重心 CORENESS 品牌标志",
      label: "品牌 LOGO · 固定",
      fit: "contain"
    },

    /* 第 2 张随机池 */
    image2Pool: [
      { src: "./images/coreness-logo.png", alt: "第 2 张图片占位", label: "图片 02 · 待替换", fit: "contain" }
    ],

    /* 第 3 张随机池 */
    image3Pool: [
      { src: "./images/coreness-logo.png", alt: "第 3 张图片占位", label: "图片 03 · 待替换", fit: "contain" }
    ],

    /* 第 4 张随机池 */
    image4Pool: [
      { src: "./images/coreness-logo.png", alt: "第 4 张图片占位", label: "图片 04 · 待替换", fit: "contain" }
    ]
  },

  copyGroups: window.CORENESS_COPY_GROUPS
};
