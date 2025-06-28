// Giscus 自定义主题配置
// 使Giscus与网站颜色协调一致

interface GiscusTheme {
  light: string;
  dark: string;
}

// 向日葵主题色彩
const sunflowerTheme: GiscusTheme = {
  light: 'light',
  dark: 'dark_dimmed'
};

// 自定义主题色彩
const customTheme: GiscusTheme = {
  light: 'light',
  dark: 'dark_dimmed'
};

// 监听主题变化并更新Giscus主题
function updateGiscusTheme() {
  const giscusFrame = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
  if (!giscusFrame) return;

  const currentTheme = document.documentElement.getAttribute('data-scheme') || 'light';
  const theme = currentTheme === 'dark' ? sunflowerTheme.dark : sunflowerTheme.light;

  giscusFrame.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: theme,
        },
      },
    },
    'https://giscus.app'
  );
}

// 初始化Giscus主题
function initGiscusTheme() {
  // 监听主题切换事件
  window.addEventListener('onColorSchemeChange', updateGiscusTheme);
  
  // 监听来自Giscus的消息
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://giscus.app') return;
    
    // 当Giscus加载完成时，设置主题
    if (event.data.giscus?.resize) {
      updateGiscusTheme();
    }
  });
  
  // 初始设置主题
  setTimeout(updateGiscusTheme, 1000);
}

// 添加向日葵主题样式
function addSunflowerStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .giscus {
      --sunflower-primary: #4caf50;
      --sunflower-secondary: #ff9800;
      --sunflower-accent: #ffeb3b;
    }
    
    .giscus-frame {
      border-radius: 12px !important;
      border: 1px solid var(--border) !important;
      background: var(--body-background) !important;
    }
    
    [data-theme="light"] .giscus-frame {
      background: #ffffff !important;
      border-color: #e1e5e9 !important;
    }
    
    [data-theme="dark"] .giscus-frame {
      background: #1a1a1a !important;
      border-color: #333 !important;
    }
    
    .giscus::before {
      content: "🌻 评论";
      display: block;
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--heading-color);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--link-color);
    }
    
    @media (max-width: 768px) {
      .giscus::before {
        font-size: 1.1rem;
        margin-bottom: 0.8rem;
      }
    }
  `;
  document.head.appendChild(style);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  addSunflowerStyles();
  initGiscusTheme();
});

// 导出函数供其他模块使用
export { updateGiscusTheme, initGiscusTheme, addSunflowerStyles }; 