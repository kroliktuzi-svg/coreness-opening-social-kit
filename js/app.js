(function () {
  "use strict";

  const config = window.SITE_CONFIG;

  if (!config) {
    throw new Error("未找到 SITE_CONFIG，请确认 config.js 已正确加载。");
  }

  const state = {
    copyIndex: -1,
    image2Index: -1,
    image3Index: -1,
    image4Index: -1,
    previousFocus: null,
    toastTimer: null
  };

  const elements = {
    copyLines: document.querySelector("#copy-lines"),
    copyButton: document.querySelector("#copy-button"),
    copyButtonText: document.querySelector("#copy-button-text"),
    imageGrid: document.querySelector("#image-grid"),
    refreshButton: document.querySelector("#refresh-button"),
    refreshButtonText: document.querySelector("#refresh-button-text"),
    imageViewer: document.querySelector("#image-viewer"),
    imageViewerStage: document.querySelector("#image-viewer-stage"),
    imageViewerImage: document.querySelector("#image-viewer-image"),
    imageViewerClose: document.querySelector("#image-viewer-close"),
    toast: document.querySelector("#toast")
  };

  function applyConfig() {
    document.title = config.meta.title;
    document.querySelector('meta[name="description"]').setAttribute("content", config.meta.description);

    const root = document.documentElement;
    const themeVariables = {
      brand: "--brand",
      brandDark: "--brand-dark",
      accent: "--accent",
      pageBg: "--page-bg",
      surface: "--surface",
      ink: "--ink",
      muted: "--muted"
    };

    Object.entries(themeVariables).forEach(([key, variable]) => {
      if (config.theme[key]) root.style.setProperty(variable, config.theme[key]);
    });

    elements.copyButtonText.textContent = config.text.copyButton;
    elements.refreshButtonText.textContent = config.text.refreshButton;
  }

  function randomIndex(length, previousIndex) {
    if (length <= 1) return 0;
    let nextIndex = previousIndex;
    while (nextIndex === previousIndex) {
      nextIndex = Math.floor(Math.random() * length);
    }
    return nextIndex;
  }

  function getNextSelection() {
    state.copyIndex = randomIndex(config.copyGroups.length, state.copyIndex);
    state.image2Index = randomIndex(config.images.image2Pool.length, state.image2Index);
    state.image3Index = randomIndex(config.images.image3Pool.length, state.image3Index);
    state.image4Index = randomIndex(config.images.image4Pool.length, state.image4Index);
    return {
      copy: config.copyGroups[state.copyIndex],
      images: [
        config.images.mainKv,
        config.images.image2Pool[state.image2Index],
        config.images.image3Pool[state.image3Index],
        config.images.image4Pool[state.image4Index]
      ]
    };
  }

  function renderSelection(animate) {
    const cards = elements.imageGrid.querySelectorAll(".image-card");
    if (animate) cards.forEach((card) => card.classList.add("is-changing"));

    window.setTimeout(() => {
      const selection = getNextSelection();
      elements.copyLines.replaceChildren(
        ...selection.copy.map((line) => {
          const paragraph = document.createElement("p");
          paragraph.textContent = line;
          return paragraph;
        })
      );

      elements.imageGrid.replaceChildren(
        ...selection.images.map((image, index) => {
          const figure = document.createElement("figure");
          figure.className = "image-card";
          figure.tabIndex = 0;
          figure.setAttribute("role", "button");
          figure.setAttribute("aria-label", `打开${image.alt}大图`);

          const img = document.createElement("img");
          img.src = image.src;
          img.alt = image.alt;
          img.style.objectFit = image.fit || "cover";
          if (image.fit === "contain") figure.classList.add("logo-placeholder");
          img.loading = index === 0 ? "eager" : "lazy";
          img.decoding = "async";

          figure.addEventListener("click", () => openImage(image));
          figure.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openImage(image);
            }
          });

          figure.append(img);
          return figure;
        })
      );

      elements.copyButtonText.textContent = config.text.copyButton;
    }, animate ? 160 : 0);
  }

  function currentCopyText() {
    return config.copyGroups[state.copyIndex].join("\n");
  }

  async function copyText() {
    const text = currentCopyText();
    try {
      await navigator.clipboard.writeText(text);
    } catch (_error) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const succeeded = document.execCommand("copy");
      textArea.remove();
      if (!succeeded) throw new Error("复制失败");
    }

    elements.copyButtonText.textContent = config.text.copiedButton;
    showToast("小红书文案已复制");
  }

  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    state.toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove("is-visible");
    }, 1800);
  }

  function openImage(image) {
    state.previousFocus = document.activeElement;
    elements.imageViewerImage.src = image.src;
    elements.imageViewerImage.alt = image.alt;
    elements.imageViewer.hidden = false;
    document.body.classList.add("image-viewer-open");
    elements.imageViewerClose.focus();
  }

  function closeImage() {
    if (elements.imageViewer.hidden) return;
    elements.imageViewer.hidden = true;
    document.body.classList.remove("image-viewer-open");
    elements.imageViewerImage.removeAttribute("src");
    if (state.previousFocus && typeof state.previousFocus.focus === "function") {
      state.previousFocus.focus();
    }
  }

  function bindEvents() {
    elements.copyButton.addEventListener("click", copyText);
    elements.refreshButton.addEventListener("click", () => renderSelection(true));
    elements.imageViewerClose.addEventListener("click", closeImage);
    elements.imageViewerStage.addEventListener("click", (event) => {
      if (event.target === elements.imageViewerStage) closeImage();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeImage();
    });
  }

  function validateConfig() {
    if (!Array.isArray(config.copyGroups) || config.copyGroups.length !== 100) {
      console.warn(`建议在 config.js 中保留 100 组文案；当前为 ${config.copyGroups.length} 组。`);
    }
    config.copyGroups.forEach((group, index) => {
      if (!Array.isArray(group) || group.length !== 3) {
        console.warn(`第 ${index + 1} 组文案不是三行。`);
      }
    });
  }

  function init() {
    validateConfig();
    applyConfig();
    bindEvents();
    renderSelection(false);
  }

  init();
})();
