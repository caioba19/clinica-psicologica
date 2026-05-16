(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function iconFor(type) {
    if (type === "success") return "bi-check-circle";
    if (type === "error") return "bi-exclamation-circle";
    if (type === "warning") return "bi-exclamation-triangle";
    return "bi-info-circle";
  }

  function getToastStack() {
    var stack = document.querySelector(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    return stack;
  }

  window.showToast = function (message, type, duration) {
    var toastType = type || "info";
    var timeout = duration || 3200;
    var stack = getToastStack();
    var toast = document.createElement("div");
    toast.className = "app-toast " + toastType;
    toast.setAttribute("role", "status");
    toast.innerHTML =
      '<i class="bi ' + iconFor(toastType) + '"></i><span>' + String(message || "") + "</span>";
    stack.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });
    window.setTimeout(function () {
      toast.classList.remove("show");
      window.setTimeout(function () {
        toast.remove();
      }, 220);
    }, timeout);
  };

  window.confirmAction = function (message, onConfirm) {
    var existing = document.getElementById("confirmActionModal");
    if (existing) existing.remove();

    var modal = document.createElement("div");
    modal.id = "confirmActionModal";
    modal.className = "modal-backdrop-custom open";
    modal.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="confirmActionTitle">' +
      '<div class="modal-header">' +
      '<h2 class="modal-title" id="confirmActionTitle">Confirmar ação</h2>' +
      '<button class="action-btn" type="button" data-confirm-close aria-label="Fechar"><i class="bi bi-x-lg"></i></button>' +
      "</div>" +
      '<div class="modal-body"><p style="color:var(--text-secondary);line-height:1.6">' +
      String(message || "Deseja continuar?") +
      "</p></div>" +
      '<div class="modal-footer">' +
      '<button class="btn-ghost" type="button" data-confirm-close>Cancelar</button>' +
      '<button class="btn-accent" type="button" data-confirm-ok><i class="bi bi-check-lg"></i> Confirmar</button>' +
      "</div>" +
      "</div>";
    document.body.appendChild(modal);

    function close() {
      modal.classList.remove("open");
      window.setTimeout(function () {
        modal.remove();
      }, 120);
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.closest("[data-confirm-close]")) {
        close();
      }
      if (event.target.closest("[data-confirm-ok]")) {
        close();
        if (typeof onConfirm === "function") onConfirm();
      }
    });
  };

  ready(function () {
    var toggle = document.getElementById("sidebarToggle");
    var overlay = document.getElementById("sidebarOverlay");

    function closeSidebar() {
      document.body.classList.remove("sidebar-open");
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        document.body.classList.toggle("sidebar-open");
      });
    }

    if (overlay) {
      overlay.addEventListener("click", closeSidebar);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeSidebar();
    });

    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });
  });
})();
