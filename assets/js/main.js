// Site-wide interactive helpers: copy-to-clipboard, skill bar animation, resume utilities
document.addEventListener('DOMContentLoaded', function () {
  // Copy buttons (email/phone)
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const selector = btn.getAttribute('data-copy');
      const el = document.querySelector(selector);
      if (!el) return;
      const text = el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 1400);
      } catch (e) {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 1400);
      }
    });
  });

  // Animate skill bars when visible
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = parseInt(bar.dataset.value || '0', 10);
          bar.style.width = value + '%';
          bar.classList.add('animated');
          io.unobserve(bar);
        }
      });
    }, {threshold: 0.25});
    skillBars.forEach(b => { b.style.width = '0%'; io.observe(b); });
  }

  // Print view
  const printBtn = document.getElementById('print-resume');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // Toggle details
  const toggleBtn = document.getElementById('toggle-collapse');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.querySelectorAll('details').forEach(d => d.open = !d.open);
    });
  }
});
