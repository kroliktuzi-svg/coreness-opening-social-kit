/* =============================================================
   页面配置区：标题、按钮、颜色与图片路径都集中在这里。
   100 条文案在同目录 coreness-copy.js 中，底层交互在 app.js。
   ============================================================= */

function createCorenessImage(groupNumber, fileName, position) {
  const basePath = `./images/groups/group-${groupNumber}`;
  return {
    src: `${basePath}/original/${fileName}`,
    thumb: `${basePath}/thumb/${fileName}`,
    alt: `重心 CORENESS 第 ${groupNumber} 组图片 ${position + 1}`,
    fit: "cover"
  };
}

function createCorenessImageGroup(groupNumber, name, fileNames) {
  return {
    name,
    images: fileNames.map((fileName, position) => createCorenessImage(groupNumber, fileName, position))
  };
}

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
    /* 四个图库依次对应页面上的第 1、2、3、4 个图片格子。 */
    imagePools: [
      createCorenessImageGroup("01", "第一个格子", [
        "IMG_7832.JPG",
        "IMG_8067.JPG",
        "IMG_8167.JPG",
        "IMG_8174.JPG",
        "IMG_8183.JPG",
        "IMG_8184.JPG"
      ]),
      createCorenessImageGroup("02", "第二个格子", [
        "IMG_8059.JPG",
        "IMG_8201.JPG",
        "IMG_8202.JPG",
        "IMG_8215.JPG",
        "IMG_8225.JPG"
      ]),
      createCorenessImageGroup("03", "第三个格子", [
        "IMG_7782.JPG",
        "IMG_7792.JPG",
        "IMG_7793.JPG",
        "IMG_7798.JPG",
        "IMG_7800.JPG",
        "IMG_7858.JPG",
        "IMG_7906.JPG",
        "IMG_7914.JPG",
        "IMG_7928.JPG",
        "IMG_7959.JPG",
        "IMG_8074.JPG",
        "IMG_8145.JPG",
        "IMG_8029.JPG",
        "IMG_8190.JPG"
      ]),
      createCorenessImageGroup("04", "第四个格子", [
        "IMG_7990.JPG",
        "IMG_8009.JPG",
        "IMG_8323.JPG",
        "IMG_8337.JPG"
      ])
    ]
  },

  copyGroups: window.CORENESS_COPY_GROUPS
};
