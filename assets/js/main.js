const siteHeader = document.querySelector(".header")
const hasSubMenu = document.querySelectorAll(".has-sub-menu")
const mobileMenu = document.querySelector('.header__mobile-nav');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
  if (mobileMenu.classList.contains('nav-open')) {
    this.setAttribute('aria-expanded', 'false');
    this.setAttribute('aria-label', 'open mobile menu');
    mobileMenu.classList.remove('nav-open');
    hamburger.classList.remove('is-active');
  } else {
    mobileMenu.classList.add('nav-open');
    hamburger.classList.add('is-active');
    this.setAttribute('aria-expanded', 'true');
    this.setAttribute('aria-label', 'close mobile menu');
  }
}

function toggleMobileDropdowns() {
  mobileMenu.addEventListener('click', (event) => {
    const dropdownToggle = event.target.closest('.toggle-mobile-dropdown');

    // If the clicked element is not a dropdown toggle, exit early
    if (!dropdownToggle) {
      return;
    }

    const dropdown = dropdownToggle.parentElement;

    if (dropdown.classList.contains('mobile-dropdown-open')) {
      dropdown.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-label', 'open mobile dropdown menu');
      mobileMenu.classList.remove('has-dropdown-open');
      dropdown.classList.remove('mobile-dropdown-open');
    } else {
      mobileMenu.classList.add('has-dropdown-open');
      dropdown.classList.add('mobile-dropdown-open');
      dropdown.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-label', 'close mobile dropdown menu');
    }
  });
}

toggleMobileDropdowns();

let scrollState = 0;

const scrollTop = () => window.scrollY;

const scrollDetect = (collapse, expand) => {
  const currentScroll = scrollTop();
  if (currentScroll > scrollState) {
    collapse();
  } else {
    expand();
  }
  scrollState = scrollTop();
};

function collapseNav() {
  siteHeader.classList.remove("expand");
  siteHeader.classList.add("collapse");
}

function expandNav() {
  siteHeader.classList.remove("collapse");
  siteHeader.classList.add("expand");
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      scrollDetect(collapseNav, expandNav);
      ticking = false;
    });

    ticking = true;
  }
});

hasSubMenu.forEach((link) => {
  // Helper function to set ARIA-expanded attribute
  function setAriaExpandedAttribute(element, value) {
    element.setAttribute("aria-expanded", value);
  };

  const subMenuToggle = document.querySelector(".sub-menu-toggle");
  const subMenuLinks = link.querySelectorAll(".header__sub-menu-link");

  function openSubMenu() {
    link.classList.add("has-sub-menu-open");
    subMenuToggle.classList.add("sub-menu-is-toggled");
    setAriaExpandedAttribute(subMenuToggle, "true");
  };

  function closeSubMenu() {
    link.classList.remove("has-sub-menu-open");
    subMenuToggle.classList.remove("sub-menu-is-toggled");
    setAriaExpandedAttribute(subMenuToggle, "false");
  };

  link.addEventListener("mouseover", openSubMenu);
  link.addEventListener("mouseout", closeSubMenu);

  // ensure that we open our sub menu when sub menu links are tabbed and focused rather than these remaining visually hidden
  subMenuLinks.forEach((subMenuLink) => {
    subMenuLink.addEventListener("focus", openSubMenu);
    subMenuLink.addEventListener("blur", closeSubMenu);
  });
});

const popup = document.querySelector('.site-popup');
const closePopupBtn = document.querySelector('.site-popup__close');
const popupBody = document.querySelector('.site-popup__body');

// Initialize popup logic
document.addEventListener('DOMContentLoaded', showHidePopup);

// Add event listeners if elements exist
if (popup && closePopupBtn) {
  closePopupBtn.addEventListener('click', closePopup);
}

if (popupBody) {
  popupBody.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      closePopup();
    }
  });
}

// Show or hide the popup
function showHidePopup() {
  if (!popup) return;
  if (localStorage.getItem("overlayPreference") !== 'hide') {
    popup.showModal();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}

// Close the popup
function closePopup() {
  if (!popup) return;
  popup.close();
  localStorage.setItem("overlayPreference", 'hide');
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
}

// Handle Escape key to close popup if open
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup && popup.open) {
    closePopup();
  }
});