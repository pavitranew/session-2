const nav = document.getElementById('main');
const navbar = nav.querySelector('.navitems');

/*const markup = `
    <ul>
      ${navItems.map(
        navItem => `<li><a href="${navItem.link}">${navItem.label}</a></li>` 
        ).join('')}
    </ul>
    `;

navbar.innerHTML = markup;*/
// content 
const siteWrap = document.querySelector('.site-wrap');

// hash changes in the menu
window.addEventListener("hashchange", navigate)

function navigate() {
  let newloc = window.location.hash;
   fetchData(newloc, function (content) {
    newContent = content.filter( contentItem => contentItem.link == newloc );
    siteWrap.innerHTML = `
    <h2>${newContent[0].header}</h2> 
    ${newContent[0].image}
    ${newContent[0].content}
    `;
  })
}

// ajax call
function fetchData(hash, callback) {
  var xhr = new XMLHttpRequest();
  
  xhr.onload = function () {
    callback(JSON.parse(xhr.response));
  };
  
  xhr.open('GET', 'http://localhost:3004/content', true);
  xhr.send();
}

fetchData(null, function(content) {
  const markup =
    `<ul>
    ${content.map(
      listItem => `<li><a href="${listItem.link}">${listItem.label}</a></li>`
    ).join('')}
    </ul>`;
  nav.innerHTML = markup;

  const logo = document.querySelector('#main ul li');
  logo.classList.add('logo');
  logo.firstChild.innerHTML = '<img src="img/logo.svg" />';
  
})




// default landing menu
if(!location.hash) {
  location.hash = "#watchlist";
}

navigate();

let topOfNav = nav.offsetTop;
window.addEventListener('scroll', fixNav);


//const logo = document.querySelector('#main ul li');
//logo.classList.add('logo');
//logo.firstChild.innerHTML = '<img src="img/logo.svg" />';

function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}














