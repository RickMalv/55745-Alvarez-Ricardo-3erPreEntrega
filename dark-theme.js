//Icons

const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

//theme Vars

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

//Icon toggling

const iconToggle = () => {
    if(userTheme ==="dark" || (!userTheme && systemTheme)){
        document.documentElement.classList.add("dark");
        moonIcon.classList.add("display-none");
        return;   
    }
    sunIcon.classList.add("display-none");

};

//Manual theme switch

