let btn = document.getElementById('btn');
let input = document.getElementById('ipt');
let movieInfo = document.getElementById('movieInfo');
let pageCounter = 1;
 
const APIKey = "41bf2df9";
let allMovies = [];
 
let renderCounter = 12;
 
btn.addEventListener("click", function () {
    fetchMovies(input.value, pageCounter);
    pageCounter++;
    fetchMovies(input.value, pageCounter);
 
    setTimeout(() => {
        renderMovies();
    }, 500);
});
 
 
document.onscroll = function () {
     if (document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight) {
            renderCounter += 12;
            pageCounter++;
            console.log(allMovies)
            fetchMovies(input.value, pageCounter);
            pageCounter++;
            fetchMovies(input.value, pageCounter);
        }
};
 
function fetchMovies(title, page) {
    const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${APIKey}`
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        allMovies.push(...data.Search);
        addMovies(data.Search);
        console.log(allMovies)
        renderMovies();
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}
 
function addMovies(movies) {
  const uniq = {}
  const withoutDuplicates = allMovies.filter(obj => !uniq[obj.imdbID] && (uniq[obj.imdbID] = true));
  console.log("withoutDuplicates: ", withoutDuplicates)
  allMovies = withoutDuplicates;
}
 
function renderMovies() {
    var htmlString = "";
 
    for (let i = 0; i < renderCounter; i++) {
      htmlString += `<img width src="${allMovies[i].Poster}">
                     <p>${allMovies[i].Title}</p>
                     <p>${allMovies[i].Year}</p>`
    
    }
 
    
  movieInfo.innerHTML = htmlString;
}