// Utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Tab management
class TabManager {
  constructor() {
    this.tabs = $$(".nav-tab");
    this.contents = $$(".tab-content");
    this.aside = $("#aside");
    this.mainContainer = $(".main-container");

    this.initialize();
  }

  initialize() {
    this.hideAside();
    this.setupEventListeners();
    this.activateInitialTab();
  }

  hideAside() {
    this.aside.style.display = "none";
    this.mainContainer.style.gridTemplateColumns = "1fr";
    // this.mainContainer.style.display = "flex";
    // this.mainContainer.style.justifyContent = "center";
  }

  setupEventListeners() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => this.activateTab(tab.dataset.tab));
    });
  }

  activateInitialTab() {
    if (this.tabs.length) {
      this.activateTab(this.tabs[0].dataset.tab);
    }
  }

  activateTab(tabId) {
    this.deactivateAll();
    this.activateTargetElements(tabId);
    this.updateLayout(tabId);
  }

  deactivateAll() {
    this.tabs.forEach((tab) => tab.classList.remove("active"));
    this.contents.forEach((content) => {
      content.classList.remove("active");
      content.style.display = "none";
    });
  }

  activateTargetElements(tabId) {
    const targetTab = [...this.tabs].find((t) => t.dataset.tab === tabId);
    const targetContent = document.getElementById(tabId);

    if (targetTab && targetContent) {
      targetTab.classList.add("active");
      targetContent.classList.add("active");
    }
  }

  updateLayout(tabId) {
    const targetContent = document.getElementById(tabId);
    if (!targetContent) return;

    if (["dashboard", "settings"].includes(tabId)) {
      targetContent.style.display = "grid";
      targetContent.style.gridTemplateColumns = "70% 30%";
      this.hideAside();
    } else {
      targetContent.style.display = "block";
      this.aside.style.display = "block";
      this.mainContainer.style.gridTemplateColumns = "1fr 300px";
    }
    if (tabId == "settings") {
      targetContent.style.display = "grid";
      targetContent.style.gridTemplateColumns = "1fr";
    }
  }
}

// Checkbox management
class CheckboxManager {
  constructor() {
    this.checkboxes = $$(".custom-checkbox, .account-checkbox");
    this.initialize();
  }

  initialize() {
    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", () => this.toggle(checkbox));
    });
  }

  toggle(checkbox) {
    checkbox.classList.toggle("checked");
  }
}

// DateTime management
class DateTimeManager {
  constructor() {
    this.timeElements = $$(".time");
    this.dateElements = $$(".date");
    this.initialize();
  }

  initialize() {
    this.updateDisplay();
    setInterval(() => this.updateDisplay(), 60000);
  }

  updateDisplay() {
    const now = new Date();
    this.updateTimeElements(now);
    this.updateDateElements(now);
  }

  updateTimeElements(date) {
    const time = this.formatTime(date);
    this.timeElements.forEach((element) => (element.textContent = time));
  }

  updateDateElements(date) {
    const formattedDate = this.formatDate(date);
    this.dateElements.forEach(
      (element) => (element.textContent = formattedDate)
    );
  }

  formatTime(date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  formatDate(date) {
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    return `${days[date.getDay()]} ${date.getDate()}, ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  }
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  new TabManager();
  new CheckboxManager();
  new DateTimeManager();
  document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".nav-tabs").classList.toggle("active");
  });
});
