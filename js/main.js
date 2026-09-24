/* =========================================================
 * main.js —— 页面渲染与交互
 * 依赖 data.js 中的 PROFILE / PROJECTS 全局数据
 * ========================================================= */

/* 渲染左侧技能分组 */
function renderSkills() {
  const wrap = document.getElementById("skillGroups");
  wrap.innerHTML = PROFILE.skills.map(function (g) {
    return (
      '<div class="skill-group">' +
        "<h3>" + g.group + "</h3>" +
        '<ul class="skill-tags">' +
          g.items.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
        "</ul>" +
      "</div>"
    );
  }).join("");
}

/* 渲染「关于我」关键信息 */
function renderFacts() {
  const dl = document.getElementById("aboutFacts");
  dl.innerHTML = PROFILE.facts.map(function (f) {
    return '<div class="fact"><dt>' + f.label + "</dt><dd>" + f.value + "</dd></div>";
  }).join("");
}

/* 渲染项目列表：编号自动递增、图文方向自动交替 */
function renderProjects() {
  const list = document.getElementById("projectList");

  /* 为不同类别分配不同色相的胶囊（按出现顺序循环取色） */
  const CAT_CLASSES = ["cat-a", "cat-b", "cat-c", "cat-d"];
  const catMap = {};
  PROJECTS.map(function (p) { return p.category; })
    .filter(function (c, i, arr) { return arr.indexOf(c) === i; })
    .forEach(function (c, i) { catMap[c] = CAT_CLASSES[i % CAT_CLASSES.length]; });

  list.innerHTML = PROJECTS.map(function (p, i) {
    const num = String(i + 1).padStart(2, "0");
    return (
      '<article class="project reveal">' +
        '<figure class="project-media">' +
          '<img src="' + p.image + '" alt="' + p.name + ' 项目配图" loading="lazy">' +
        "</figure>" +
        '<div class="project-info">' +
          '<div class="project-topline">' +
            '<span class="project-index" aria-hidden="true">' + num + "</span>" +
          "</div>" +
          '<h3 class="project-name">' + p.name +
            '<span class="project-cat ' + catMap[p.category] + '">' + p.category + "</span>" +
          "</h3>" +
          '<p class="project-summary">' + p.summary + "</p>" +
          '<ul class="project-stack">' +
            p.stack.map(function (s) { return "<li>" + s + "</li>"; }).join("") +
          "</ul>" +
          '<p class="project-date">完成时间 · ' + p.date + "</p>" +
        "</div>" +
      "</article>"
    );
  }).join("");
}

/* 滚动进入视口时的轻微浮现（尊重系统减少动效设置） */
function setupReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (el) { io.observe(el); });
}

/* 左侧导航随滚动高亮（scroll-spy）
 * 做法：滚动时（rAF 节流）检查哪个区块覆盖视口 35%–45% 的判定带，
 * 比依赖 IntersectionObserver 的 rootMargin 更稳定。 */
function setupScrollSpy() {
  const links = Array.prototype.slice.call(document.querySelectorAll("#nav a"));
  if (!links.length) return;
  const byId = {};
  links.forEach(function (l) { byId[l.dataset.target] = l; });
  const sections = ["works", "about", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  let ticking = false;
  function update() {
    ticking = false;
    let current = null;
    /* 页面滚到底时，最后一个区块可能够不到判定带，直接高亮最后一项 */
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1].id;
    } else {
      const bandTop = window.innerHeight * 0.35;
      const bandBottom = window.innerHeight * 0.45;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= bandBottom && rect.bottom >= bandTop) { current = sections[i].id; break; }
      }
    }
    links.forEach(function (l) {
      l.classList.toggle("is-active", l.dataset.target === current);
    });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

renderSkills();
renderFacts();
renderProjects();
setupReveal();
setupScrollSpy();
