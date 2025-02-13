//   const aside = document.getElementById("aside");
document.addEventListener("DOMContentLoaded", function () {
  const aside = document.getElementById("aside");
  const mainContainer = document.querySelector(".main-container");
  const tabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");
  aside.style.display = "none";
  mainContainer.style.gridTemplateColumns = "1fr";

  function switchTab(event) {
    const selectedTab = event.target.getAttribute("data-tab");

    // Remove 'active' class from all tabs and contents
    tabs.forEach((tab) => tab.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    // Hide all tab contents
    tabContents.forEach((content) => (content.style.display = "none"));

    // Add 'active' class to clicked tab and corresponding content
    event.target.classList.add("active");
    document.getElementById(selectedTab).classList.add("active");

    const activeTab = document.getElementById(selectedTab);
    if (activeTab) {
      activeTab.style.display = "block";
    }

    if (selectedTab === "dashboard" || selectedTab === "settings") {
      activeTab.style.display = "grid";
      activeTab.style.gridTemplateColumns = "70% 30%";
      aside.style.display = "none";
      mainContainer.style.gridTemplateColumns = "1fr";
    } else {
      aside.style.display = "block";
      mainContainer.style.gridTemplateColumns = "1fr 300px";
    }
  }

  // Add click event to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", switchTab);
  });

  // Activate the first tab by default
  if (tabs.length > 0) {
    tabs[0].classList.add("active");
    document
      .getElementById(tabs[0].getAttribute("data-tab"))
      .classList.add("active");
  }
});
document.querySelectorAll(".custom-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    this.classList.toggle("checked");
  });
});
document.querySelectorAll(".account-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    this.classList.toggle("checked");
  });
});
function updateDateTime() {
  const now = new Date();
  const timeElement = document.querySelectorAll(".time");
  const dateElement = document.querySelectorAll(".date");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeElement.forEach((ele) => (ele.textContent = `${hours}:${minutes}`));

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

  const formattedDate = `${days[now.getDay()]} ${now.getDate()}, ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  dateElement.forEach((d) => (d.textContent = formattedDate));
}

updateDateTime();
setInterval(updateDateTime, 60000);
