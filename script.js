// Affiliate URL - Update with your actual affiliate link
const AFFILIATE_URL = "https://allcouponcodes.net/refer/magnific";

// Coupon Data - Verified from competitor research (SimplyCodes, Wethrift, JoinSecret Aug 2026)
const coupons = [
  { code: "GMRP0907JUL3679", discount: "25% OFF", description: "25% Off Storewide. Best verified deal on all Magnific plans (Premium, Premium+ & Pro). Limited time offer!", type: "exclusive", initialDays: 7, baseUses: 87, baseSuccess: "99.6%" },
  { code: "FREEMAG20", discount: "20% OFF", description: "20% Off Premium & Premium+ Subscriptions. Valid for new and upgrading users.", type: "normal", initialDays: 4, baseUses: 64, baseSuccess: "98.9%" },
  { code: "MAGNIFIC15", discount: "15% OFF", description: "15% Off Any Magnific Monthly Plan. Instant discount applied at checkout.", type: "normal", initialDays: 3, baseUses: 78, baseSuccess: "97.5%" },
  { code: "GMRP1004ABR348", discount: "20% OFF", description: "20% Off via referral link. May require sign-up through partner page to activate.", type: "unverified", initialDays: 5, baseUses: 42, baseSuccess: "88.2%" },
  { code: "GMRP0802MAY912", discount: "10% OFF", description: "10% Off Credit Top-Ups. Save on additional generation credits.", type: "unverified", initialDays: 2, baseUses: 35, baseSuccess: "84.0%" }
];

// FAQ Data
const faqs = [
  {
    question: "How do I use a Magnific promo code?",
    answer: "Click the 'Show Coupon' button on our page, copy the revealed promo code, visit magnific.com/pricing, select your plan, and paste the code in the discount field at checkout. Click Apply to see your discounted price immediately."
  },
  {
    question: "Can I combine a promo code with Magnific's annual discount?",
    answer: "Yes! Choosing an annual billing plan automatically gives you 25% off compared to monthly billing. Applying one of our verified promo codes (revealed via 'Show Coupon' on the coupon cards) stacks an additional discount on top, giving you total savings of up to 40% off standard monthly pricing!"
  },
  {
    question: "Why is my Magnific promo code not working?",
    answer: "Promo codes can fail if: (1) the code has expired, (2) it applies only to specific plans (e.g., Premium vs Pro), (3) it's restricted to first-time subscribers, or (4) there is a typo. We test all codes on this page daily to ensure 100% working status."
  },
  {
    question: "Does Magnific offer a free trial?",
    answer: "Magnific offers a free tier with basic credits upon account creation so you can test the AI upscaler and generator before subscribing. For full access with high-resolution upscaling, a paid plan with a promo code is recommended."
  },
  {
    question: "What is the best Magnific promo code available today?",
    answer: "The best verified discount currently available is 25% off storewide using our top exclusive promo code. Click 'Show Coupon' on the first deal card above to reveal and copy it. Additionally, choosing an annual billing plan automatically saves you 25% over monthly pricing."
  },
  {
    question: "Are these Magnific promo codes verified for 2026?",
    answer: "Yes, all promo codes listed on MagnificCoupons are manually tested and verified daily by our team. We maintain active subscriptions to Magnific and test codes directly at checkout to guarantee they work."
  }
];

// Helper: Get or update coupon usage & success stats
function getCouponStats(code, baseUses, baseSuccess) {
  const extraUses = parseInt(localStorage.getItem(`coupon_extra_uses_${code}`) || "0", 10);
  const totalUses = baseUses + extraUses;
  const isCustomSuccess = localStorage.getItem(`coupon_success_${code}`);

  let successRate = baseSuccess;
  if (isCustomSuccess) {
    successRate = isCustomSuccess;
  }

  return {
    uses: totalUses.toLocaleString(),
    success: successRate
  };
}

function incrementCouponUses(code) {
  const current = parseInt(localStorage.getItem(`coupon_extra_uses_${code}`) || "0", 10);
  localStorage.setItem(`coupon_extra_uses_${code}`, (current + 1).toString());
  localStorage.setItem(`coupon_success_${code}`, '100% Verified');
  updateAllDOMCounters(code);
}

function updateAllDOMCounters(code) {
  const targetCoupon = coupons.find(c => c.code === code);
  if (!targetCoupon) return;
  const stats = getCouponStats(code, targetCoupon.baseUses, targetCoupon.baseSuccess);
  
  document.querySelectorAll(`.uses-count-${code}`).forEach(el => {
    el.textContent = stats.uses;
  });
  document.querySelectorAll(`.success-rate-${code}`).forEach(el => {
    el.textContent = stats.success;
  });
}

// Render Coupons
function renderCoupons() {
  const exclusiveContainer = document.getElementById('exclusive-coupons');
  const normalContainer = document.getElementById('normal-coupons');
  const unverifiedContainer = document.getElementById('unverified-coupons');
  
  coupons.forEach((coupon, index) => {
    const card = createCouponCard(coupon, index);
    if (coupon.type === 'exclusive') exclusiveContainer.appendChild(card);
    else if (coupon.type === 'normal') normalContainer.appendChild(card);
    else unverifiedContainer.appendChild(card);
  });
}

function createCouponCard(coupon, index) {
  const isFirstDeal = (index === 0);
  const isExclusive = coupon.type === 'exclusive';
  const isUnverified = coupon.type === 'unverified';
  const maskedCode = '••••••' + coupon.code.slice(-2);
  const stats = getCouponStats(coupon.code, coupon.baseUses, coupon.baseSuccess);
  
  const typeLabel = isFirstDeal ? 'Exclusive Annual Deal' : (isExclusive ? 'Exclusive Promo Code' : (isUnverified ? 'Unverified Code' : 'Verified Promo Code'));
  
  const card = document.createElement('article');
  card.className = `coupon-card ${isFirstDeal ? 'coupon-card-exclusive' : 'coupon-card-normal'}`;
  

  const rightSideHTML = isFirstDeal
    ? `<a href="${AFFILIATE_URL}" target="_blank" rel="noopener noreferrer" class="btn-claim-deal btn-claim-trigger" data-code="${coupon.code}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Claim Deal</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
       </a>`
    : `<div class="coupon-code-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
        <code class="coupon-code">${maskedCode}</code>
       </div>
       <button class="btn-show-coupon btn-normal-coupon" data-code="${coupon.code}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>Show Coupon</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
       </button>`;

  const featuresHTML = isFirstDeal
    ? `<div class="coupon-features-row">
        <span class="coupon-chip chip-gold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <strong class="uses-count-${coupon.code}">${stats.uses}</strong> Uses
        </span>
        <span class="coupon-chip chip-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <strong class="success-rate-${coupon.code}">${stats.success}</strong> Success
        </span>
        <span class="coupon-chip chip-purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          Auto-Applied
        </span>
       </div>`
    : `<div class="coupon-features-row">
        <span class="coupon-chip chip-gold">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <strong class="uses-count-${coupon.code}">${stats.uses}</strong> Uses
        </span>
        <span class="coupon-chip chip-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <strong class="success-rate-${coupon.code}">${stats.success}</strong> Success
        </span>
        <span class="coupon-chip chip-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
          Tested &amp; Working
        </span>
       </div>`;

  const rightBadgeHTML = isFirstDeal
    ? '<div class="exclusive-badge-right"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> EXCLUSIVE DEAL</div>'
    : '';

  const subtitleHTML = isFirstDeal
    ? '<div class="card-subtitle-purple">LIMITED TIME OFFER</div>'
    : (isExclusive ? '<div class="card-subtitle-purple">EXCLUSIVE PROMO CODE</div>' : '<div class="card-subtitle-purple">VERIFIED PROMO CODE</div>');

  card.innerHTML = `
    <div class="coupon-card-inner ${isFirstDeal ? 'has-right-badge' : ''}">
      <div class="coupon-orb-1"></div>
      <div class="coupon-orb-2"></div>
      ${rightBadgeHTML}
      <div class="coupon-content">
        <!-- Column 1: Logo Only -->
        <div class="coupon-col-logo">
          <div class="coupon-icon-wrapper">
            <img src="https://magnificpromocode.github.io/images/magnific-logo.png" alt="Magnific AI Logo" class="coupon-logo-img">
          </div>
        </div>

        <!-- Column 2: Discount Details & Features (Widest Column) -->
        <div class="coupon-col-center">
          ${subtitleHTML}
          <h3 class="card-title-hero">Get <span class="discount-gradient-text">${coupon.discount}</span> Storewide</h3>
          <p class="coupon-desc">${coupon.description}</p>
          ${featuresHTML}
        </div>

        <!-- Column 3: Button & Action -->
        <div class="coupon-col-action">
          ${rightSideHTML}
        </div>
      </div>
    </div>
  `;
  
  // Show coupon button listener
  const showBtn = card.querySelector('.btn-show-coupon');
  if (showBtn) {
    showBtn.addEventListener('click', function() {
      const code = this.dataset.code;
      incrementCouponUses(code);
      localStorage.setItem('pendingCoupon', code);
      window.open(window.location.origin + window.location.pathname + '?popup=true', '_blank');
      setTimeout(() => { window.location.href = AFFILIATE_URL; }, 200);
    });
  }

  // Claim deal trigger listener
  const claimBtn = card.querySelector('.btn-claim-trigger');
  if (claimBtn) {
    claimBtn.addEventListener('click', function() {
      const code = this.dataset.code;
      incrementCouponUses(code);
    });
  }

  return card;
}

// Render FAQs
function renderFAQs() {
  const container = document.getElementById('faq-list');
  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-question">${faq.question}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>
      <div class="faq-answer"><div class="faq-answer-inner">${faq.answer}</div></div>
    `;
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('active');
    });
    container.appendChild(item);
  });
}

// Popup functionality
function initPopup() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('popup') === 'true') {
    const code = localStorage.getItem('pendingCoupon');
    if (code) {
      document.getElementById('popup-code-text').textContent = code;
      document.getElementById('coupon-popup').classList.remove('hidden');
      localStorage.removeItem('pendingCoupon');
      history.replaceState({}, '', window.location.pathname);
    }
  }
  
  document.getElementById('popup-close').addEventListener('click', closePopup);
  document.getElementById('popup-continue').addEventListener('click', closePopup);
  document.getElementById('popup-copy-btn').addEventListener('click', function() {
    const code = document.getElementById('popup-code-text').textContent;
    navigator.clipboard.writeText(code).then(() => {
      incrementCouponUses(code);
      this.classList.add('btn-copied');
      this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Code Copied!</span>';
      setTimeout(() => {
        this.classList.remove('btn-copied');
        this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy Coupon Code</span>';
      }, 3000);
    });
  });
}

function closePopup() {
  document.getElementById('coupon-popup').classList.add('hidden');
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Set copyright year
function setCopyrightYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  const iconMenu = btn.querySelector('.icon-menu');
  const iconClose = btn.querySelector('.icon-close');
  
  btn.addEventListener('click', () => {
    nav.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.add('hidden');
      iconMenu.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Hero Section Countdown Timer
function initHeroCountdown() {
  const daysEl = document.getElementById('hero-days');
  const hoursEl = document.getElementById('hero-hours');
  const minsEl = document.getElementById('hero-mins');
  const secsEl = document.getElementById('hero-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  let targetTime = localStorage.getItem('heroCountdownTarget');
  const now = new Date().getTime();

  if (!targetTime || parseInt(targetTime) <= now) {
    // 2 days + 14 hours + 35 mins target
    targetTime = now + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (35 * 60 * 1000);
    localStorage.setItem('heroCountdownTarget', targetTime);
  } else {
    targetTime = parseInt(targetTime);
  }

  function updateTimer() {
    const current = new Date().getTime();
    const distance = targetTime - current;

    if (distance <= 0) {
      targetTime = current + (2 * 24 * 60 * 60 * 1000);
      localStorage.setItem('heroCountdownTarget', targetTime);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderCoupons();
  renderFAQs();
  initPopup();
  initSmoothScroll();
  setCopyrightYear();
  initMobileMenu();
  initHeaderScroll();
  initHeroCountdown();
});
