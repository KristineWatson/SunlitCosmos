// 自定义JavaScript - 测试暗色模式切换功能
console.log('=== Custom script loaded ===');

// 等待页面完全加载
window.addEventListener('load', function() {
    console.log('=== Page fully loaded ===');
    
    // 查找暗色模式切换按钮
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    console.log('Desktop dark mode toggle found:', darkModeToggle);
    
    if (darkModeToggle) {
        console.log('Adding click listener to desktop toggle');
        
        // 添加点击事件监听器
        darkModeToggle.addEventListener('click', function(e) {
            console.log('=== Desktop dark mode toggle clicked! ===');
            e.preventDefault();
            e.stopPropagation();
            
            // 获取当前主题
            const currentScheme = document.documentElement.dataset.scheme;
            console.log('Current scheme before toggle:', currentScheme);
            
            // 切换主题
            if (currentScheme === 'dark') {
                document.documentElement.dataset.scheme = 'light';
                console.log('Switched to light mode');
            } else {
                document.documentElement.dataset.scheme = 'dark';
                console.log('Switched to dark mode');
            }
            
            // 保存到localStorage
            const newScheme = document.documentElement.dataset.scheme;
            localStorage.setItem('StackColorScheme', newScheme);
            console.log('Saved to localStorage:', newScheme);
        });
        
        console.log('Click event listener added to desktop dark mode toggle');
    } else {
        console.log('ERROR: Desktop dark mode toggle not found!');
    }
    
    // 查找移动端菜单中的暗色模式切换按钮
    const mobileDarkModeToggle = document.querySelector('#mobile-menu-container #dark-mode-toggle');
    console.log('Mobile dark mode toggle found:', mobileDarkModeToggle);
    
    if (mobileDarkModeToggle) {
        console.log('Adding click listener to mobile toggle');
        
        mobileDarkModeToggle.addEventListener('click', function(e) {
            console.log('=== Mobile dark mode toggle clicked! ===');
            e.preventDefault();
            e.stopPropagation();
            
            // 获取当前主题
            const currentScheme = document.documentElement.dataset.scheme;
            console.log('Current scheme before toggle:', currentScheme);
            
            // 切换主题
            if (currentScheme === 'dark') {
                document.documentElement.dataset.scheme = 'light';
                console.log('Switched to light mode');
            } else {
                document.documentElement.dataset.scheme = 'dark';
                console.log('Switched to dark mode');
            }
            
            // 保存到localStorage
            const newScheme = document.documentElement.dataset.scheme;
            localStorage.setItem('StackColorScheme', newScheme);
            console.log('Saved to localStorage:', newScheme);
        });
        
        console.log('Click event listener added to mobile dark mode toggle');
    } else {
        console.log('ERROR: Mobile dark mode toggle not found!');
    }
    
    // 显示当前主题状态
    const currentScheme = document.documentElement.dataset.scheme;
    console.log('Current theme scheme:', currentScheme);
    console.log('LocalStorage value:', localStorage.getItem('StackColorScheme'));
});

// 监听主题变化事件
window.addEventListener('onColorSchemeChange', function(e: CustomEvent) {
    console.log('=== Color scheme changed event fired ===', e.detail);
});

// 二维码弹出框智能定位
function initQRCodePositioning() {
  const qrCodeIcons = document.querySelectorAll('.menu-social-item.wechat-icon, .menu-social-item.xhs-icon');
  
  qrCodeIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      const popup = this.querySelector('.wechat-qrcode-popup, .xhs-popup');
      if (!popup) return;
      
      // 获取图标和弹出框的位置信息
      const iconRect = this.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // 计算弹出框的宽度（包括padding）
      const popupWidth = 170; // 与CSS中的宽度一致
      
      // 计算图标中心点
      const iconCenterX = iconRect.left + iconRect.width / 2;
      
      // 计算弹出框的理想位置（居中于图标）
      let idealLeft = iconCenterX - popupWidth / 2;
      
      // 检查是否会超出右边界
      if (idealLeft + popupWidth > viewportWidth - 20) {
        // 太靠右，向左弹出
        popup.style.left = 'auto';
        popup.style.right = '0';
        popup.style.transform = 'none';
      } else if (idealLeft < 20) {
        // 太靠左，向右弹出
        popup.style.left = '0';
        popup.style.right = 'auto';
        popup.style.transform = 'none';
      } else {
        // 在中间，居中显示
        popup.style.left = '50%';
        popup.style.right = 'auto';
        popup.style.transform = 'translateX(-50%)';
      }
    });
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initQRCodePositioning();
});

// 窗口大小改变时重新计算
let resizeTimer: number;
window.addEventListener('resize', function() {
  // 延迟执行，避免频繁触发
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initQRCodePositioning, 100);
}); 