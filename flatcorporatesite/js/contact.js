/**
 * 株式会社フラット コーポレートサイト お問い合わせフォームJavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    initContactForm(contactForm);
  }
});

/**
 * お問い合わせフォームの初期化
 * @param {HTMLFormElement} form - お問い合わせフォーム要素
 */
function initContactForm(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // フォームデータの取得
    const formData = {
      companyName: form.company.value.trim(),
      personName: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      privacyAgreed: form.privacy.checked
    };
    
    // バリデーション
    const validationRules = {
      companyName: { required: true },
      personName: { required: true },
      email: { required: true, email: true },
      phone: { required: true, phone: true },
      message: { required: true },
      privacyAgreed: { required: true }
    };
    
    const validationResult = validateForm(formData, validationRules);
    
    // エラーメッセージをクリア
    clearErrorMessages(form);
    
    if (!validationResult.isValid) {
      // バリデーションエラーの表示
      displayErrors(form, validationResult.errors);
      return;
    }
    
    // フォーム送信処理（実際のAPIエンドポイントに置き換える）
    try {
      // 送信ボタンを無効化
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = '送信中...';
      
      // 実際の環境では、ここでAPIエンドポイントにデータを送信
      // 今回はデモとして、成功したと仮定
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 送信成功時の処理
      form.reset();
      showThankYouMessage(form);
      
      // 送信ボタンを元に戻す
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }, 3000);
      
    } catch (error) {
      // エラー処理
      console.error('送信エラー:', error);
      showErrorMessage(form, 'お問い合わせの送信中にエラーが発生しました。しばらく経ってから再度お試しください。');
      
      // 送信ボタンを元に戻す
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = false;
      submitButton.textContent = '送信する';
    }
  });
}

/**
 * フォームデータのバリデーション
 * @param {Object} formData - フォームデータ
 * @param {Object} rules - バリデーションルール
 * @returns {Object} バリデーション結果
 */
function validateForm(formData, rules) {
  const errors = {};
  let isValid = true;
  
  // 各フィールドのバリデーション
  for (const field in rules) {
    const value = formData[field];
    const fieldRules = rules[field];
    
    // 必須チェック
    if (fieldRules.required && (!value || (typeof value === 'boolean' && !value))) {
      errors[field] = '必須項目です';
      isValid = false;
      continue;
    }
    
    // 値が空の場合は次のフィールドへ
    if (!value && value !== false) continue;
    
    // メールアドレス形式チェック
    if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = '有効なメールアドレスを入力してください';
      isValid = false;
    }
    
    // 電話番号形式チェック
    if (fieldRules.phone && !isValidPhone(value)) {
      errors[field] = '有効な電話番号を入力してください';
      isValid = false;
    }
  }
  
  return { isValid, errors };
}

/**
 * メールアドレスの形式チェック
 * @param {string} email - メールアドレス
 * @returns {boolean} 有効なメールアドレスかどうか
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 電話番号の形式チェック
 * @param {string} phone - 電話番号
 * @returns {boolean} 有効な電話番号かどうか
 */
function isValidPhone(phone) {
  // 数字、ハイフン、括弧、スペースのみを許可
  const phoneRegex = /^[0-9\-() \s]+$/;
  return phoneRegex.test(phone);
}

/**
 * エラーメッセージをクリア
 * @param {HTMLFormElement} form - フォーム要素
 */
function clearErrorMessages(form) {
  // 入力フィールドのエラークラスを削除
  const inputFields = form.querySelectorAll('input, textarea');
  inputFields.forEach(field => {
    field.classList.remove('error');
  });
  
  // エラーメッセージ要素を削除
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(message => {
    message.remove();
  });
  
  // フォーム全体のエラーメッセージを削除
  const formError = form.querySelector('.form-error');
  if (formError) {
    formError.remove();
  }
}

/**
 * エラーメッセージを表示
 * @param {HTMLFormElement} form - フォーム要素
 * @param {Object} errors - エラーメッセージのオブジェクト
 */
function displayErrors(form, errors) {
  for (const field in errors) {
    const inputField = form[field];
    if (!inputField) continue;
    
    // 入力フィールドにエラークラスを追加
    inputField.classList.add('error');
    
    // エラーメッセージ要素を作成
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.textContent = errors[field];
    
    // チェックボックスの場合は親要素の後に追加
    if (inputField.type === 'checkbox') {
      inputField.parentElement.after(errorMessage);
    } else {
      // 通常の入力フィールドの場合は直後に追加
      inputField.after(errorMessage);
    }
  }
  
  // 最初のエラーフィールドにフォーカス
  const firstErrorField = form.querySelector('.error');
  if (firstErrorField) {
    firstErrorField.focus();
  }
}

/**
 * 送信成功メッセージを表示
 * @param {HTMLFormElement} form - フォーム要素
 */
function showThankYouMessage(form) {
  // フォームを非表示
  form.style.display = 'none';
  
  // サンクスメッセージを作成
  const thankYouMessage = document.createElement('div');
  thankYouMessage.className = 'bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center';
  thankYouMessage.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h3 class="text-xl font-bold mb-2">お問い合わせありがとうございます</h3>
    <p class="mb-4">内容を確認の上、担当者より折り返しご連絡いたします。</p>
    <button type="button" class="px-4 py-2 bg-trust-blue text-white rounded hover:bg-opacity-90 transition-colors" id="back-to-form">フォームに戻る</button>
  `;
  
  // フォームの親要素にサンクスメッセージを追加
  form.parentElement.appendChild(thankYouMessage);
  
  // 「フォームに戻る」ボタンのイベントリスナー
  const backButton = document.getElementById('back-to-form');
  backButton.addEventListener('click', () => {
    thankYouMessage.remove();
    form.style.display = 'block';
  });
}

/**
 * エラーメッセージを表示
 * @param {HTMLFormElement} form - フォーム要素
 * @param {string} message - エラーメッセージ
 */
function showErrorMessage(form, message) {
  // 既存のエラーメッセージを削除
  const existingError = form.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
  
  // エラーメッセージ要素を作成
  const errorElement = document.createElement('div');
  errorElement.className = 'form-error bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6';
  errorElement.textContent = message;
  
  // フォームの先頭に追加
  form.prepend(errorElement);
  
  // スクロールしてエラーメッセージを表示
  errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}