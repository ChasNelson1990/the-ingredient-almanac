(function () {
  "use strict";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var label = document.querySelectorAll("[data-theme-label]");
    for (var i = 0; i < label.length; i++) {
      label[i].textContent = theme === "light" ? "Daylight" : "Lamplight";
    }
    try { localStorage.setItem("almanac-theme", theme); } catch (e) {}
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("almanac-theme"); } catch (e) {}
    var theme = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "light" ? "dark" : "light");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", toggleTheme);
    }

    var unitsToggle = document.querySelector("[data-units-toggle]");
    if (unitsToggle) {
      unitsToggle.addEventListener("click", function () {
        var metric = document.body.getAttribute("data-units") !== "imperial";
        document.body.setAttribute("data-units", metric ? "imperial" : "metric");
        unitsToggle.textContent = metric ? "cups · switch to grams" : "grams · switch to cups";
      });
    }
  });
})();
