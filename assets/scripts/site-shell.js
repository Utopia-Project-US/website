(function () {
  'use strict';

  if (document.documentElement.dataset.siteShellLoaded === 'true') return;
  document.documentElement.dataset.siteShellLoaded = 'true';

  var navigation = [
    {
      key: 'about',
      label: 'About',
      href: 'pages/about/index.html',
      items: [
        { label: 'Origins', future: true },
        { label: 'Mission Statement', href: 'pages/about/mission.html' },
        { label: 'Bylaws', future: true },
        { label: 'Leadership', future: true },
      ]
    },
    {
      key: 'constitution',
      label: 'Constitution v2.0',
      href: 'pages/constitution/index.html',
      items: [
        { label: 'Declaration Of Reformation', future: true },
        { label: 'Preamble', future: true },
        { label: 'Articles', future: true }
      ]
    },
    {
      key: 'learn',
      label: 'Learn',
      href: 'pages/learn/index.html',
      items: [
        { label: 'Companion Guides', future: true },
        { label: 'Case Studies', future: true },
        { label: 'Tutorials', future: true },
        { label: 'FAQ', future: true }
      ]
    },
    {
      key: 'community',
      label: 'Community',
      href: 'pages/community/index.html',
      items: [
        { label: 'Town Hall', future: true },
        { label: 'Social Media', future: true },
        { label: 'The Drafting Room', href: 'pages/community/drafting-room/index.html' },
        { label: 'Events', future: true },
        { label: 'Partner Directory', future: true }
      ]
    },
    {
      key: 'newsroom',
      label: 'Newsroom',
      href: 'pages/newsroom/index.html',
      items: [
        { label: 'Press Releases', future: true },
        { label: 'Media Inquiries', future: true },
        { label: 'News Coverage', future: true },
        { label: 'Cultural Influences', href: 'pages/newsroom/cultural-influences.html' }
      ]
    },
    {
      key: 'get-involved',
      label: 'Get Involved',
      href: 'pages/get-involved/index.html',
      items: [
        { label: 'Careers', href: 'pages/get-involved/careers.html' },
        { label: 'Contact', href: 'index.html#contact' },
        { label: 'Partnerships', future: true },
        { label: 'Donate', future: true }
      ]
    }
  ];

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (typeof text === 'string') node.textContent = text;
    return node;
  }

  function comingSoon() {
    return element('span', 'site-coming-soon', 'Coming Soon');
  }

  function getPageContext(main) {
    var path = window.location.pathname.toLowerCase();
    var key = 'home';
    var category = 'Home';

    if (path.indexOf('/pages/about/') !== -1 || /\/mission\.html$/.test(path)) {
      key = 'about'; category = 'About';
    } else if (path.indexOf('/pages/constitution/') !== -1) {
      key = 'constitution'; category = 'Constitution v2.0';
    } else if (path.indexOf('/pages/community/') !== -1 || path.indexOf('/the-drafting-room.html') !== -1 || path.indexOf('/drafting-room/') !== -1) {
      key = 'community'; category = 'Community';
    } else if (path.indexOf('/pages/newsroom/') !== -1 || /\/cultural-influences\.html$/.test(path)) {
      key = 'newsroom'; category = 'Newsroom';
    } else if (path.indexOf('/pages/learn/') !== -1) {
      key = 'learn'; category = 'Learn';
    } else if (path.indexOf('/pages/get-involved/') !== -1 || /\/careers\.html$/.test(path)) {
      key = 'get-involved'; category = 'Get Involved';
    } else if (path.indexOf('/pages/policies/') !== -1) {
      key = 'neutral'; category = 'Policies';
    } else if (path.indexOf('/pages/utility/') !== -1) {
      key = 'neutral'; category = 'Site Utilities';
    } else if (/404\.html$/.test(path)) {
      key = 'neutral'; category = 'Page Not Found';
    }

    var heading = main.querySelector('h1');
    var page = heading ? heading.textContent.trim() : document.title.split('|')[0].split('—')[0].trim();
    var section = null;
    var sectionHref = null;

    var paperNumber = main.querySelector('.paper-number');
    var isDraftingRoomPaper = path.indexOf('/pages/community/drafting-room/papers/') !== -1 || /\/drafting-room\/paper-[^/]+\.html$/.test(path);
    if (paperNumber && isDraftingRoomPaper) {
      section = 'The Drafting Room';
      sectionHref = 'pages/community/drafting-room/index.html';
      page = paperNumber.textContent.trim();
    }

    return { key: key, category: category, page: page, section: section, sectionHref: sectionHref };
  }

  function buildNavigation(currentKey) {
    var nav = element('nav', 'site-navigation');
    nav.setAttribute('aria-label', 'Site navigation');

    navigation.forEach(function (group) {
      var section = element('section', 'site-nav-group site-category-' + group.key);
      if (group.key === currentKey) section.classList.add('is-current-category');
      var title = element('h2', 'site-nav-group-title');
      var overviewLink = element('a', 'site-nav-group-link', group.label);
      overviewLink.href = group.href;
      title.appendChild(overviewLink);
      section.appendChild(title);

      var list = element('div', 'site-nav-list');
      group.items.forEach(function (item) {
        if (item.href) {
          var link = element('a', '', item.label);
          link.href = item.href;
          list.appendChild(link);
        } else {
          var future = element('span', 'site-nav-future');
          future.textContent = item.label;
          future.setAttribute('aria-label', item.label + ' — Coming Soon');
          future.title = 'Coming Soon';
          list.appendChild(future);
        }
      });

      section.appendChild(list);
      nav.appendChild(section);
    });

    return nav;
  }

  function buildBreadcrumb(context) {
    var bar = element('nav', 'site-category-bar site-category-' + context.key);
    bar.setAttribute('aria-label', 'Breadcrumb');
    var list = element('ol', 'site-category-trail');

    if (context.key === 'home') {
      var homeCurrent = element('li', '', 'Home');
      homeCurrent.setAttribute('aria-current', 'page');
      list.appendChild(homeCurrent);
    } else {
      var homeItem = element('li');
      var homeLink = element('a', '', 'Home');
      homeLink.href = 'index.html';
      homeItem.appendChild(homeLink);
      list.appendChild(homeItem);

      var categoryItem = element('li');
      var categoryGroup = navigation.find(function (group) { return group.key === context.key; });
      if (context.page === context.category && !context.section) {
        categoryItem.textContent = context.category;
        categoryItem.setAttribute('aria-current', 'page');
      } else if (categoryGroup) {
        var categoryLink = element('a', '', context.category);
        categoryLink.href = categoryGroup.href;
        categoryItem.appendChild(categoryLink);
      } else {
        categoryItem.textContent = context.category;
      }
      list.appendChild(categoryItem);

      if (context.section) {
        var sectionItem = element('li');
        var sectionLink = element('a', '', context.section);
        sectionLink.href = context.sectionHref;
        sectionItem.appendChild(sectionLink);
        list.appendChild(sectionItem);
      }

      if (context.page && context.page !== context.category) {
        var pageItem = element('li', '', context.page);
        pageItem.setAttribute('aria-current', 'page');
        list.appendChild(pageItem);
      }
    }

    bar.appendChild(list);
    return bar;
  }

  function buildDccCard() {
    var card = element('section', 'dcc-card');
    var headingRow = element('div', 'dcc-heading-row');
    headingRow.appendChild(element('h2', '', 'Digital Constitutional Convention'));
    headingRow.appendChild(comingSoon());
    card.appendChild(headingRow);
    card.appendChild(element('p', '', 'Secure citizen participation, deliberation, and voting tools are in development.'));

    var controls = element('div', 'dcc-controls');
    ['Citizen Sign In', 'Convention Portal', 'Jury Dashboard'].forEach(function (label) {
      var button = element('button', '', label);
      button.type = 'button';
      button.disabled = true;
      controls.appendChild(button);
    });
    card.appendChild(controls);
    return card;
  }

  function buildAudioCard(slotClass) {
    var card = element('section', 'site-audio-card');
    card.appendChild(element('h2', '', 'Site Audio'));
    card.appendChild(element('p', '', 'Optional background music. Your choice is remembered for this browser session.'));
    card.appendChild(element('div', 'site-audio-slot ' + slotClass));
    return card;
  }

  function buildPanel(side, currentKey) {
    var aside = element('aside', 'site-panel site-panel-' + side);
    var inner = element('div', 'site-panel-inner');
    if (side === 'left') {
      inner.appendChild(element('p', 'site-panel-title', 'Navigation'));
      inner.appendChild(buildNavigation(currentKey));
    } else {
      inner.appendChild(element('p', 'site-panel-title', 'Convention Controls'));
      inner.appendChild(buildDccCard());
      inner.appendChild(buildAudioCard('site-audio-slot-desktop'));
    }
    aside.appendChild(inner);
    return aside;
  }

  function normalizeBrand(header) {
    header.classList.add(header.querySelector(':scope > .header-inner') ? 'site-shell-header-contained' : 'site-shell-header-direct');
    var original = header.querySelector('a.brand-logo, a.brand');
    if (!original) return null;

    var originalImage = original.querySelector('img');
    if (!originalImage) return null;

    var cluster = element('div', 'shell-brand-cluster');

    var desktopLogo = element('a', 'shell-desktop-logo');
    desktopLogo.href = 'index.html';
    desktopLogo.setAttribute('aria-label', 'The Utopia Project US home');
    desktopLogo.appendChild(originalImage.cloneNode(true));

    var trigger = element('button', 'site-nav-trigger');
    trigger.type = 'button';
    trigger.id = 'site-nav-trigger';
    trigger.setAttribute('aria-label', 'Open site navigation');
    trigger.setAttribute('aria-controls', 'site-drawer');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.appendChild(originalImage.cloneNode(true));
    var badge = element('span', 'site-nav-trigger-badge');
    badge.setAttribute('aria-hidden', 'true');
    trigger.appendChild(badge);

    var wordmark = element('a', 'brand-wordmark');
    wordmark.href = 'index.html';
    wordmark.setAttribute('aria-label', 'The Utopia Project US home');
    ['THE', 'UTOPIA', 'PROJECT', 'US'].forEach(function (line) {
      wordmark.appendChild(element('span', '', line));
    });

    cluster.appendChild(desktopLogo);
    cluster.appendChild(trigger);
    cluster.appendChild(wordmark);
    original.replaceWith(cluster);
    return trigger;
  }

  function normalizeFooter(footer) {
    if (!footer) return null;
    var inner = footer.querySelector('.footer-inner') || footer;
    var music = inner.querySelector('.footer-music');
    if (music) music.remove();

    while (inner.firstChild) inner.removeChild(inner.firstChild);

    var copy = element('span', 'footer-copy');
    copy.innerHTML = '&copy; 2026 Utopia Project US. All Rights Reserved.';
    var motto = element('span', 'footer-motto', 'Veritas Super Omnia');
    var updated = element('span', 'footer-updated');
    updated.id = 'last-updated';

    var modified = new Date(document.lastModified);
    var dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/New_York'
    };
    var timeOptions = {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York'
    };
    var formattedDate = modified.toLocaleDateString('en-US', dateOptions);
    var formattedTime = modified.toLocaleTimeString('en-US', timeOptions);
    updated.textContent = 'Updated: ' + formattedDate + ' at ' + formattedTime + ' Philly time';

    inner.classList.remove('has-music');
    inner.appendChild(copy);
    inner.appendChild(motto);
    inner.appendChild(updated);
    if (music) inner.appendChild(music);
    return music;
  }

  function openDrawer(trigger, drawer, closeButton) {
    document.body.classList.add('site-drawer-open');
    drawer.inert = false;
    drawer.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-label', 'Close site navigation');
    closeButton.focus();
  }

  function closeDrawer(trigger, drawer, returnFocus) {
    document.body.classList.remove('site-drawer-open');
    drawer.inert = true;
    drawer.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Open site navigation');
    if (returnFocus) trigger.focus();
  }

  function initialize() {
    var header = document.querySelector('body > header');
    var main = document.querySelector('body > main');
    var footer = document.querySelector('body > footer');
    if (!header || !footer) return;

    /* Four original hand-built pages predate semantic <main> markup. Preserve
       their content exactly, but give it a shared container for the new shell. */
    if (!main) {
      main = element('main', 'site-shell-legacy-main');
      main.id = 'main-content';
      var candidate = header.nextElementSibling;
      while (candidate && candidate !== footer) {
        var next = candidate.nextElementSibling;
        var isLegacyMenu = candidate.classList && candidate.classList.contains('mobile-menu');
        var isSupportNode = candidate.tagName === 'SCRIPT' || candidate.tagName === 'STYLE' || candidate.tagName === 'LINK';
        if (!isLegacyMenu && !isSupportNode) main.appendChild(candidate);
        candidate = next;
      }
    }

    var context = getPageContext(main);
    var trigger = normalizeBrand(header);
    var music = normalizeFooter(footer);
    var headerInner = header.querySelector(':scope > .header-inner') || header;
    headerInner.appendChild(buildBreadcrumb(context));

    var shell = element('div', 'site-shell-middle');
    var content = element('div', 'site-shell-content');
    shell.appendChild(buildPanel('left', context.key));
    content.appendChild(main);
    shell.appendChild(content);
    shell.appendChild(buildPanel('right', context.key));
    footer.before(shell);

    var backdrop = element('div', 'site-drawer-backdrop');
    backdrop.setAttribute('aria-hidden', 'true');

    var drawer = element('aside', 'site-drawer');
    drawer.id = 'site-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    drawer.setAttribute('aria-label', 'Site navigation and utilities');
    var drawerHeader = element('div', 'site-drawer-header');
    drawerHeader.appendChild(element('strong', '', 'The Utopia Project US'));
    var closeButton = element('button', 'site-drawer-close', '×');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close site navigation');
    drawerHeader.appendChild(closeButton);
    drawer.appendChild(drawerHeader);
    drawer.appendChild(buildNavigation(context.key));

    var utilities = element('div', 'site-drawer-utilities');
    utilities.appendChild(element('p', 'site-drawer-title', 'Convention Controls'));
    utilities.appendChild(buildDccCard());
    utilities.appendChild(buildAudioCard('site-audio-slot-mobile'));
    drawer.appendChild(utilities);
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    var desktopAudioSlot = document.querySelector('.site-audio-slot-desktop');
    var mobileAudioSlot = drawer.querySelector('.site-audio-slot-mobile');
    var media = window.matchMedia('(max-width: 1279px)');

    function placeAudio() {
      var target = media.matches ? mobileAudioSlot : desktopAudioSlot;
      if (!media.matches && trigger && document.body.classList.contains('site-drawer-open')) {
        closeDrawer(trigger, drawer, false);
      }
      if (music) {
        target.appendChild(music);
      } else if (!target.querySelector('.site-audio-unavailable')) {
        target.appendChild(element('span', 'site-audio-unavailable', 'Audio is available on selected pages.'));
      }
    }
    placeAudio();
    if (media.addEventListener) media.addEventListener('change', placeAudio);
    else media.addListener(placeAudio);

    if (trigger) {
      trigger.addEventListener('click', function () {
        if (document.body.classList.contains('site-drawer-open')) closeDrawer(trigger, drawer, true);
        else openDrawer(trigger, drawer, closeButton);
      });
      closeButton.addEventListener('click', function () { closeDrawer(trigger, drawer, true); });
      backdrop.addEventListener('click', function () { closeDrawer(trigger, drawer, true); });
      drawer.addEventListener('click', function (event) {
        if (event.target.closest('a')) closeDrawer(trigger, drawer, false);
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.body.classList.contains('site-drawer-open')) {
          closeDrawer(trigger, drawer, true);
          return;
        }
        if (event.key === 'Tab' && document.body.classList.contains('site-drawer-open')) {
          var focusable = drawer.querySelectorAll('a[href], button:not([disabled]), details > summary');
          if (!focusable.length) return;
          var first = focusable[0];
          var last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      });
    }

    function measureShell() {
      document.documentElement.style.setProperty('--shell-header-height', header.offsetHeight + 'px');
      document.documentElement.style.setProperty('--shell-footer-height', footer.offsetHeight + 'px');
    }
    measureShell();
    if ('ResizeObserver' in window) {
      var observer = new ResizeObserver(measureShell);
      observer.observe(header);
      observer.observe(footer);
    } else {
      window.addEventListener('resize', measureShell);
    }

    document.body.classList.add('site-shell-ready');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
