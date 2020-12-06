const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'KHm2puMDDc4rXogLSENA2UpAAb8bx7Fe'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none';

let pageNumber = 0;
// console.log('PageNumber:', pageNumber);
let displayNav = false;

//1                     //2   
searchForm.addEventListener('submit', fetchResults); 
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3




function fetchResults(e) {
    e.preventDefault();  
    console.log(e); //2
    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`;
 //   url =  baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value;

    
    console.log("URL:",url); //4
    if(startDate.value !== '') {
        console.log(startDate.value)
      url += '&begin_date=' + startDate.value;
    };
  
    if(endDate.value !== '') {
      url += '&end_date=' + endDate.value;
    };
  //END HERE
  //1
    fetch(url)
    .then(function(result) {
      return result.json(); //2
  }).then(function(json) {
      displayResults(json); //1 & //3
  });
} 


function displayResults(json) {
   while (section.firstChild) {
        section.removeChild(section.firstChild); //1
   }
  
  
  let articles = json.response.docs;
  // console.log(json.response.docs);
   
  
  if(articles.length === 0) {
    console.log("No results");
  } else {
    for(let i = 0; i < articles.length; i++) {
        let article = document.createElement('article');
        let heading = document.createElement('h2');
        let link = document.createElement('a');

        let current = articles[i]; //2
        console.log("Current:", current); //3

        link.href = current.web_url; //4
        link.textContent = current.headline.main; //5

        article.appendChild(heading);
        heading.appendChild(link); //6
        section.appendChild(article);

        let img = document.createElement('img');  //1
        let para = document.createElement('p');  
        let clearfix = document.createElement('div');
  
  
        for(let j = 0; j < current.keywords.length; j++) {
          let span = document.createElement('span');   
          span.textContent += current.keywords[j].value + ' ';   
          para.appendChild(span);
        }
  
          //2
        if(current.multimedia.length > 0) {
          //3
          img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
          //4
          img.alt = current.headline.main;
        }
  
        clearfix.setAttribute('class','clearfix');
  
        article.appendChild(heading);
        heading.appendChild(link);
        article.appendChild(img); //5
        article.appendChild(para);
        article.appendChild(clearfix);
        section.appendChild(article);
      }
    }

    if(articles.length === 10) {
        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
      } else {
        nav.style.display = 'none'; //hides the nav display if less than 10 items are in the array
      }

      
}; 

function nextPage(e){
  console.log("Next button clicked");
  pageNumber++; //1
   fetchResults(e);  //2
   console.log("Page number:", pageNumber); //3

}; //5
                  
 
function previousPage(e) {
    if(pageNumber > 0) { //1
      pageNumber--; //2
      fetchResults(e); 
    } else {
      return; //3
    }
    fetchResults(e); //4
    console.log("Page:", pageNumber); //5
  
  };