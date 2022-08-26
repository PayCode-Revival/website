const SERVER_DOMAIN = "."

// Elements' Nodes Variables
const pageFavicon = document.querySelector("link[rel=icon]")
const logo = document.getElementById("logo")
const rootElement = document.getElementById("root")
const themeToggleBtn = document.getElementById("theme-toggle-btn")
const themeToggleIcon = document.getElementById("theme-toggler")
const mainNav = document.getElementById("main-nav")



function getSystemTheme() {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    return systemTheme
}
manageThemeChange(getSystemTheme())

// Theme Change Listener
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    manageThemeChange(getSystemTheme())
})


function getSiteTheme() {
    const siteTheme = rootElement.classList.contains("dark-mode") ? "dark" : "light"
    return siteTheme
}


// Theme Toggle Button Listener
themeToggleBtn.addEventListener("click", () => {
    let themeToChangeTo = getSiteTheme() === "dark" ? "light" : "dark"
    manageThemeChange(themeToChangeTo)
})


function manageThemeChange(mode = "dark") {
    const inverseMode = mode === "dark" ? "light" : "dark"

    // Change Favicon
    pageFavicon.href = `./../img/logo-${inverseMode}.png`

    // Change Logo
    logo.src = `./../img/logo-${inverseMode}.png`

    // Change Theme
    if (mode === "dark") {
        rootElement.classList.add("dark-mode")
    } else {
        rootElement.classList.remove("dark-mode")
    }

    // Change Toggle Icon
    themeToggleIcon.textContent = `${mode}_mode`


    // Change Techstars Logo
    document.getElementById("techstars-logo").src = `./../assets/img/techstars-logo-${inverseMode}.png`
}


// NavBar Toggler
const mobileNavbar = document.getElementById("mobile-navbar")
const navbarToggler = document.getElementById("navbar-toggle-btn")
const navLinks = document.getElementById("nav-links")
const mobileNavLinks = document.createElement("div")
mobileNavLinks.classList.add("p-2", "d-flex", "flex-column", "justify-content-center")
mobileNavLinks.innerHTML = ``
Array.from(navLinks.children).map(child => {
    let navLinkLocation = document.createElement("a")
    navLinkLocation.href = ("#" + child.textContent.toLowerCase())
    let navLink = document.createElement("span")
    navLinkLocation.click = toggleNavbar
    navLink.textContent = child.textContent
    navLinkLocation.classList.add("flat-card", "mb-3", "p-2")
    navLinkLocation.style.width = "max-content"
    navLinkLocation.appendChild(navLink)
    mobileNavLinks.appendChild(navLinkLocation)
})
const signInBtn = document.getElementById("sign-in")
const signInBtnClone = signInBtn.cloneNode(signInBtn)
signInBtnClone.id = "sign-in-btn-clone"
signInBtnClone.classList.remove("ms-5")

navbarToggler.addEventListener("click", toggleNavbar)

function toggleNavbar() {
    console.log("Clicked")
    mobileNavbar.innerHTML = ``
    mobileNavbar.appendChild(mobileNavLinks)
    mobileNavbar.appendChild(signInBtnClone)
    mobileNavbar.classList.toggle("hidden")
    mobileNavbar.classList.toggle("shown")
}