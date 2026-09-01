(function () {
  "use strict";
  var c = SITE_CONTENT;

  var ICONS = {
    escudo: '<path d="M12 3l7 3v5c0 5-3.4 8.5-7 10-3.6-1.5-7-5-7-10V6l7-3Z" fill="none" stroke-width="1.5"/>',
    balanza: '<path d="M12 3v18M5 8l-3 6a3 3 0 0 0 6 0l-3-6Zm14 0l-3 6a3 3 0 0 0 6 0l-3-6ZM5 8h14M9 21h6" fill="none" stroke-width="1.4"/>',
    documento: '<path d="M7 3h7l4 4v14H7V3Z" fill="none" stroke-width="1.4"/><path d="M14 3v4h4M9 12h6M9 16h6" stroke-width="1.4"/>',
    candado: '<rect x="5" y="11" width="14" height="9" rx="1.5" fill="none" stroke-width="1.4"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke-width="1.4"/>',
    familia: '<circle cx="8" cy="7" r="2.5" fill="none" stroke-width="1.4"/><circle cx="16" cy="7" r="2.5" fill="none" stroke-width="1.4"/><path d="M3 20v-2a4 4 0 0 1 4-4h2M15 20v-2a4 4 0 0 1 4-4h2" fill="none" stroke-width="1.4"/>',
    maletin: '<rect x="3" y="8" width="18" height="12" rx="1.5" fill="none" stroke-width="1.4"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" fill="none" stroke-width="1.4"/>',
    auto: '<path d="M4 16V11l2-4h12l2 4v5" fill="none" stroke-width="1.4"/><circle cx="7.5" cy="16.5" r="1.6" stroke-width="1.4"/><circle cx="16.5" cy="16.5" r="1.6" stroke-width="1.4"/>',
    reloj: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="1.4"/><path d="M12 7v5l3.5 2" fill="none" stroke-width="1.4"/>'
  };

  function buildWhatsappUrl(extra) {
    var text = encodeURIComponent(extra ? c.whatsapp.defaultMessage + " " + extra : c.whatsapp.defaultMessage);
    return "https://wa.me/" + c.whatsapp.number + "?text=" + text;
  }

  function setWhatsappLinks() {
    var url = buildWhatsappUrl();
    ["nav-whatsapp", "hero-whatsapp", "cta-whatsapp", "footer-whatsapp", "wa-fab"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = url;
    });
  }

  function renderNav() {
    var list = document.getElementById("nav-list");
    var mobileList = document.getElementById("mobile-nav-list");
    c.nav.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      li.appendChild(a);
      list.appendChild(li);

      var liM = li.cloneNode(true);
      liM.querySelector("a").addEventListener("click", closeMobileNav);
      mobileList.appendChild(liM);
    });
  }

  function renderHero() {
    document.getElementById("hero-eyebrow").textContent = c.hero.eyebrow;
    document.getElementById("hero-title").textContent = c.hero.title;
    document.getElementById("hero-subtitle").textContent = c.hero.subtitle;
    document.getElementById("hero-cta-primary").textContent = c.hero.ctaPrimary;
    document.getElementById("hero-cta-secondary").textContent = c.hero.ctaSecondary;

    var stats = document.getElementById("hero-stats");
    c.hero.stats.forEach(function (stat, i) {
      var card = document.createElement("div");
      card.className = "float-card glass";
      card.style.setProperty("--delay", (i * 0.4) + "s");
      card.innerHTML = '<span class="float-value">' + stat.value + '</span><span class="float-label">' + stat.label + '</span>';
      stats.appendChild(card);
    });
  }

  function renderTeam() {
    document.getElementById("team-eyebrow").textContent = c.team.eyebrow;
    document.getElementById("team-title").textContent = c.team.title;
    document.getElementById("team-subtitle").textContent = c.team.subtitle;

    var grid = document.getElementById("team-grid");
    c.team.members.forEach(function (member) {
      var card = document.createElement("article");
      card.className = "team-card glass";
      var credentials = member.credentials.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
      card.innerHTML =
        '<span class="team-avatar"><span class="team-avatar-initials">' + member.initials + "</span></span>" +
        '<h3 class="team-name">' + member.name + "</h3>" +
        '<p class="team-role">' + member.role + "</p>" +
        '<p class="team-bio">' + member.bio + "</p>" +
        '<ul class="about-highlights team-credentials">' + credentials + "</ul>";
      setThumbImage(card.querySelector(".team-avatar"), member.photo);
      grid.appendChild(card);
    });
  }

  function renderServices() {
    document.getElementById("services-eyebrow").textContent = c.services.eyebrow;
    document.getElementById("services-title").textContent = c.services.title;
    document.getElementById("services-subtitle").textContent = c.services.subtitle;

    var grid = document.getElementById("services-grid");
    c.services.items.forEach(function (item) {
      var el = document.createElement("button");
      el.type = "button";
      el.className = "lg-item glass lg-" + item.size;
      el.innerHTML =
        '<span class="lg-thumb"><svg viewBox="0 0 24 24">' + (ICONS[item.icon] || "") + "</svg></span>" +
        '<span class="lg-scrim"></span>' +
        '<span class="lg-caption"><span class="lg-item-title">' + item.title + '</span>' +
        '<span class="lg-hint"><svg viewBox="0 0 24 24" class="lg-hint-icon"><path d="M9 5l7 7-7 7" fill="none" stroke-width="2"/></svg>Ver detalle</span></span>';
      setThumbImage(el.querySelector(".lg-thumb"), item.image);
      el.addEventListener("click", function () { openServiceCard(item, el); });
      grid.appendChild(el);
    });
  }

  // Pone la foto de fondo en una tarjeta si el archivo existe; si falla la
  // carga (ruta sin imagen todavía) se conserva el icono de respaldo.
  function setThumbImage(thumbEl, src) {
    if (!src) return;
    var img = new Image();
    img.onload = function () { thumbEl.style.backgroundImage = 'url("' + src + '")'; thumbEl.classList.add("lg-thumb-has-image"); };
    img.src = src;
  }

  var lgOpenCard = null;

  function setPanelRect(panel, r, instant) {
    panel.style.transition = instant ? "none" : "";
    panel.style.top = r.top + "px";
    panel.style.left = r.left + "px";
    panel.style.width = r.width + "px";
    panel.style.height = r.height + "px";
  }

  function getExpandedTargetRect() {
    var w = Math.min(window.innerWidth * 0.92, 680);
    var h = Math.min(window.innerHeight * 0.8, 560);
    return { top: (window.innerHeight - h) / 2, left: (window.innerWidth - w) / 2, width: w, height: h };
  }

  function openServiceCard(item, cardEl) {
    var overlay = document.getElementById("lg-overlay");
    var panel = document.getElementById("lg-expanded");
    var body = document.getElementById("lg-expanded-body");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    lgOpenCard = cardEl;
    cardEl.classList.add("lg-item-hidden");

    document.getElementById("lg-expanded-icon").innerHTML = ICONS[item.icon] || "";
    document.getElementById("lg-expanded-title").textContent = item.title;
    document.getElementById("lg-expanded-detail").textContent = item.description;
    var expandedThumb = document.querySelector(".lg-expanded-thumb");
    expandedThumb.style.backgroundImage = "";
    expandedThumb.classList.remove("lg-thumb-has-image");
    setThumbImage(expandedThumb, item.image);
    body.classList.remove("visible");

    setPanelRect(panel, cardEl.getBoundingClientRect(), true);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(function () {
      setPanelRect(panel, getExpandedTargetRect(), reduced);
      if (reduced) {
        body.classList.add("visible");
      } else {
        panel.addEventListener("transitionend", function onOpenEnd(e) {
          if (e.target !== panel) return;
          panel.removeEventListener("transitionend", onOpenEnd);
          body.classList.add("visible");
        });
      }
    });
  }

  function closeServiceCard() {
    var overlay = document.getElementById("lg-overlay");
    var panel = document.getElementById("lg-expanded");
    var body = document.getElementById("lg-expanded-body");
    var cardEl = lgOpenCard;
    if (!cardEl) return;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    body.classList.remove("visible");

    function finish() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      cardEl.classList.remove("lg-item-hidden");
      lgOpenCard = null;
      panel.removeAttribute("style");
    }

    setPanelRect(panel, cardEl.getBoundingClientRect(), reduced);
    if (reduced) {
      finish();
    } else {
      panel.addEventListener("transitionend", function onCloseEnd(e) {
        if (e.target !== panel) return;
        panel.removeEventListener("transitionend", onCloseEnd);
        finish();
      });
    }
  }

  function setupLayoutGrid() {
    document.getElementById("lg-overlay").addEventListener("click", function (e) {
      if (e.target === this) closeServiceCard();
    });
    document.getElementById("lg-close").addEventListener("click", closeServiceCard);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lgOpenCard) closeServiceCard();
    });
  }

  function renderLocation() {
    document.getElementById("location-eyebrow").textContent = c.location.eyebrow;
    document.getElementById("location-title").textContent = c.location.title;
    document.getElementById("location-subtitle").textContent = c.location.subtitle;

    var query = encodeURIComponent(c.location.address);
    document.getElementById("location-map-frame").src = "https://www.google.com/maps?q=" + query + "&output=embed";
    document.getElementById("location-map").href = c.location.mapsUrl || ("https://www.google.com/maps/search/?api=1&query=" + query);
  }

  function renderCta() {
    document.getElementById("cta-eyebrow").textContent = c.contactCta.eyebrow;
    document.getElementById("cta-title").textContent = c.contactCta.title;
    document.getElementById("cta-subtitle").textContent = c.contactCta.subtitle;
    document.getElementById("cta-whatsapp-label").textContent = c.contactCta.buttonLabel;
  }

  function renderBrandAndFooter() {
    ["brand-name", "footer-name"].forEach(function (id) { document.getElementById(id).textContent = c.brand.name; });
    ["brand-role", "footer-role"].forEach(function (id) { document.getElementById(id).textContent = c.brand.role; });
    ["brand-initials", "footer-initials"].forEach(function (id) { document.getElementById(id).textContent = c.brand.initials; });
    document.getElementById("nav-whatsapp-label").textContent = "WhatsApp";

    document.getElementById("footer-location").textContent = c.footer.location;
    document.getElementById("footer-schedule").textContent = c.footer.scheduleLabel;
    document.getElementById("footer-whatsapp").textContent = c.footer.whatsappLabel;
    document.getElementById("footer-copy").textContent = "© " + new Date().getFullYear() + " " + c.footer.copyright;
  }

  function closeMobileNav() {
    document.getElementById("mobile-nav").classList.remove("open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  }

  function setupNavToggle() {
    var toggle = document.getElementById("nav-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function setupScrollHeader() {
    var header = document.getElementById("site-header");
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderBgPaths() {
    var svg = document.getElementById("bg-paths-svg");
    if (!svg) return;
    var SVG_NS = "http://www.w3.org/2000/svg";
    var frag = document.createDocumentFragment();
    // Mobile GPUs choke faster on many composited layers sitting behind
    // backdrop-filter blur, so on narrow screens skip the wave grouping
    // (only the single cheap svg-level drift remains) and draw half the
    // lines (same fan shape, every other index) instead of all 36.
    var isNarrow = window.matchMedia("(max-width: 720px)").matches;
    var step = isNarrow ? 2 : 1;
    var count = Math.ceil(36 / step);
    var GROUP_SIZE = 6;
    var group = null;
    var n = 0;

    for (var i = 0; i < 36; i += step) {
      if (!isNarrow && n % GROUP_SIZE === 0) {
        group = document.createElementNS(SVG_NS, "g");
        group.setAttribute("class", "bg-wave-group");
        group.style.setProperty("--wave-delay", "-" + ((n / count) * 4.4).toFixed(2) + "s");
        frag.appendChild(group);
      }

      var d = "M-" + (380 + i * 5) + " -" + (189 + i * 6) +
        "C-" + (380 + i * 5) + " -" + (189 + i * 6) +
        " -" + (312 + i * 5) + " " + (216 - i * 6) +
        " " + (152 + i * 5) + " " + (343 - i * 6) +
        "C" + (616 + i * 5) + " " + (470 - i * 6) +
        " " + (684 + i * 5) + " " + (875 - i * 6) +
        " " + (684 + i * 5) + " " + (875 - i * 6);

      var path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "bg-path");
      path.setAttribute("stroke-width", (0.5 + i * 0.03).toFixed(2));
      path.setAttribute("stroke-opacity", (0.1 + i * 0.03).toFixed(2));
      (isNarrow ? frag : group).appendChild(path);
      n++;
    }
    svg.appendChild(frag);
  }

  function setupHeroParallax() {
    var hero = document.querySelector(".hero");
    var statue = document.querySelector(".hero-statue-img");
    if (!hero || !statue) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    hero.addEventListener("pointermove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      statue.style.transform = "rotateY(" + (x * 12) + "deg) rotateX(" + (y * -12) + "deg)";
    });
    hero.addEventListener("pointerleave", function () {
      statue.style.transform = "";
    });
  }

  document.title = c.meta.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", c.meta.description);

  renderNav();
  renderHero();
  renderBgPaths();
  renderTeam();
  renderServices();
  renderLocation();
  renderCta();
  renderBrandAndFooter();
  setWhatsappLinks();
  setupNavToggle();
  setupScrollHeader();
  setupHeroParallax();
  setupLayoutGrid();
})();
