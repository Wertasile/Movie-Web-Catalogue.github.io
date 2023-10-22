function acquiremovies(){
    const result = document.getElementById('results')
    console.log(result)

    console.log(JSON.parse(localStorage.getItem('search')))

    const myresult = localStorage.getItem('resultfor')
    const heading = document.getElementById('heading')
    heading.innerHTML = "<h2>" + "Results for " + myresult +"</h2>"

    mydata = (JSON.parse(localStorage.getItem('search')))
    console.log(mydata)
    result.innerHTML = ""
    for(let i=0;i<mydata.results.length;i++){
        
        const griditem = document.createElement('div')
        griditem.classList.add('grid-item')
    
        const title = document.createElement('div')
        const item = mydata.results[i]
        title.innerHTML = item.title
        title.classList.add('title')
    
        const yeartype = document.createElement('div')
        yeartype.classList.add('flex-yeartype')
        const year = document.createElement('div')
        year.innerHTML = mydata.results[i].release
        const type = document.createElement('div')
        type.innerHTML = mydata.results[i].Type
    
        yeartype.appendChild(year)
        yeartype.appendChild(type)
    
        const imgcontainer = document.createElement('div')
        imgcontainer.classList.add('img-container')
        const img = document.createElement('img')
        img.setAttribute('src',"http://image.tmdb.org/t/p/w500/" + item.poster_path)
    
        imgcontainer.appendChild(img)
        griditem.appendChild(imgcontainer)
        griditem.appendChild(yeartype)
        griditem.appendChild(title)
        result.appendChild(griditem)
        
        
    }
    console.log(localStorage.getItem('type'))
}

acquiremovies()

const griditems = document.getElementsByClassName('grid-item')

for(let i=0;i<griditems.length;i++){
    griditems[i].addEventListener('click',() => {
        const ID = mydata.results[i].id
        console.log(ID)
        localStorage.setItem('id',ID)
        window.location.href = "griditem.html"
    })
}

//---------------------------------------------------------------------------------------MOVING BETWEEN PAGES---------------------------------------------------------------------------------//

const prev = document.getElementById('previous-page')
const next = document.getElementById('next-page')

next.addEventListener('click',() => {
    mypage = localStorage.getItem('pageno')
    mypage = parseFloat(mypage) + parseFloat(1)
    if (localStorage.getItem('type')=="movie"){
        searchMovie(localStorage.getItem('resultfor'),mypage,localStorage.getItem('type'))
        acquiremovies()
    }else if(localStorage.getItem('type')=="tv"){
        searchMovie(localStorage.getItem('resultfor'),mypage,localStorage.getItem('type'))
        acquiremovies()
    }
    
})

prev.addEventListener('click',() => {
    mypage = localStorage.getItem('pageno')
    mypage = mypage - 1
    searchMovie(localStorage.getItem('resultfor'),mypage)
    acquiremovies()
})