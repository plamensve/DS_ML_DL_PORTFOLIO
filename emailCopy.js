  document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-email');
    if (!copyBtn) return;
    const email = 'svetoslavov.dev@gmail.com';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.classList.add('copied');
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="icon">✅</span> Copied';
        setTimeout(() => { copyBtn.innerHTML = original; copyBtn.classList.remove('copied'); }, 1400);
      } catch (e) {
        window.prompt('Copy email manually:', email);
      }
    });
  });