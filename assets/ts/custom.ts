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