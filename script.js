/* Purely Payton Cleaning Co. — site script */
(function () {
  "use strict";

  /* ---------- Reviews ----------
     TODO: Replace with real reviews from Facebook.
     Each entry: { text: "…", name: "" }  (leave name empty to hide it). */
  var REVIEWS = [
    { text: "Customer review goes here.", name: "" },
    { text: "Customer review goes here.", name: "" },
    { text: "Customer review goes here.", name: "" }
  ];

  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>';

  var grid = document.getElementById("reviews-grid");
  if (grid) {
    REVIEWS.forEach(function (r) {
      var fig = document.createElement("figure");
      fig.className = "card review";
      var stars = document.createElement("div");
      stars.className = "stars";
      stars.setAttribute("role", "img");
      stars.setAttribute("aria-label", "5 out of 5 stars");
      stars.innerHTML = STAR + STAR + STAR + STAR + STAR;
      var quote = document.createElement("blockquote");
      quote.textContent = r.text;
      fig.appendChild(stars);
      fig.appendChild(quote);
      if (r.name) {
        var cap = document.createElement("figcaption");
        cap.textContent = "— " + r.name;
        fig.appendChild(cap);
      }
      grid.appendChild(fig);
    });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () { setOpen(menu.hidden); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) setOpen(false); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Quote form ---------- */
  var form = document.getElementById("quote-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var ERROR_HTML = 'Sorry, something went wrong sending your request. Please call or text us at <a href="tel:4054283469">(405) 428-3469</a>.';

  function fieldError(input) {
    var v = input.value.trim();
    if (!input.required) return "";
    if (!v) return "Please fill this in.";
    if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email.";
    if (input.type === "tel" && v.replace(/\D/g, "").length < 10) return "Please enter a 10-digit phone number.";
    return "";
  }

  function showError(input, msg) {
    var field = input.closest(".field");
    var el = field.querySelector(".error");
    field.classList.toggle("has-error", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (el) {
      el.textContent = msg;
      if (!el.id) el.id = input.id + "-error";
      if (msg) input.setAttribute("aria-describedby", el.id); else input.removeAttribute("aria-describedby");
    }
  }

  var required = Array.prototype.slice.call(form.querySelectorAll("[required]"));
  required.forEach(function (input) {
    input.addEventListener("blur", function () { if (input.value) showError(input, fieldError(input)); });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") showError(input, fieldError(input));
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.innerHTML = "";
    var firstBad = null;
    required.forEach(function (input) {
      var msg = fieldError(input);
      showError(input, msg);
      if (msg && !firstBad) firstBad = input;
    });
    if (firstBad) { firstBad.focus(); return; }

    submitBtn.disabled = true;
    var label = submitBtn.innerHTML;
    submitBtn.textContent = "Sending…";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        var thanks = document.createElement("div");
        thanks.className = "thanks";
        thanks.setAttribute("role", "status");
        thanks.setAttribute("tabindex", "-1");
        thanks.textContent = "Thanks! We'll be in touch soon. 💕";
        form.replaceWith(thanks);
        thanks.focus();
      })
      .catch(function () {
        status.innerHTML = ERROR_HTML;
        submitBtn.disabled = false;
        submitBtn.innerHTML = label;
      });
  });
})();
