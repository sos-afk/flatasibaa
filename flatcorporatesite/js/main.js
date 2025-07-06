/**
 * 株式会社フラット コーポレートサイト メインJavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // モバイルメニューの制御
  initMobileMenu();
  
  // スクロールアニメーションの初期化
  initScrollAnimations();
  
  // 現在のページをナビゲーションでハイライト
  highlightCurrentPage();
  
  // スティッキーヘッダーの制御
  handleStickyHeader();
  
  // 施工事例ページのフィルター機能
  if (document.querySelector('.filter-btn')) {
    initFilters();
  }
  
  // FAQページのアコーディオン機能
  if (document.querySelector('.faq-item')) {
    initAccordions();
  }
});

/**
 * モバイルメニューの開閉を制御
 */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * スクロールアニメーションを初期化
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // 初期表示時に画面内の要素をアニメーション
  checkVisibility();
  
  // スクロール時にアニメーション
  window.addEventListener('scroll', checkVisibility);
  
  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top + scrollY;
      const elementVisible = 150; // 要素が150px見えたらアニメーション開始
      
      if (scrollY + windowHeight > elementTop + elementVisible) {
        element.classList.add('visible');
      }
    });
  }
}

/**
 * 現在のページをナビゲーションでハイライト
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('header nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // パスが一致する場合、またはトップページの場合
    if (
      (currentPath.endsWith(linkPath) && linkPath !== 'index.html') || 
      (currentPath.endsWith('/') && linkPath === 'index.html')
    ) {
      link.classList.add('text-trust-blue', 'font-medium');
    }
  });
}

/**
 * スクロール時のヘッダー表示を制御
 */
function handleStickyHeader() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール位置が100px以上の場合、ヘッダーに影をつける
    if (scrollTop > 100) {
      header.classList.add('shadow-md');
    } else {
      header.classList.remove('shadow-md');
    }
    
    lastScrollTop = scrollTop;
  });
}

/**
 * 施工事例のフィルター機能
 */
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブクラスの切り替え
      filterButtons.forEach(btn => btn.classList.remove('active', 'bg-trust-blue', 'text-white'));
      button.classList.add('active', 'bg-trust-blue', 'text-white');
      
      const filterValue = button.getAttribute('data-filter');
      
      // 施工事例のフィルタリング
      workItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * FAQのアコーディオン機能
 */
function initAccordions() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  const faqTabs = document.querySelectorAll('.faq-tab');
  
  // アコーディオンの開閉
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      
      // アクティブ状態の切り替え
      question.classList.toggle('active');
      
      // 回答の表示/非表示
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.classList.add('hidden');
      } else {
        answer.classList.remove('hidden');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
  
  // FAQタブの切り替え
  if (faqTabs.length > 0) {
    faqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // アクティブクラスの切り替え
        faqTabs.forEach(t => t.classList.remove('active', 'bg-trust-blue', 'text-white'));
        tab.classList.add('active', 'bg-trust-blue', 'text-white');
        
        const tabValue = tab.getAttribute('data-tab');
        const faqItems = document.querySelectorAll('.faq-item');
        
        // FAQアイテムのフィルタリング
        faqItems.forEach(item => {
          if (tabValue === 'all' || item.getAttribute('data-category') === tabValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}