window.addEventListener("load", () => {
    
    let $categories = document.querySelector(".header-categories");
    
    
    let categorys = async () => {
        
        try {
            
            await fetch("http://localhost:3000/api/categories")
            .then(res => res.json())
            .then(result => {

                result.data.categorys.forEach(el => $categories.innerHTML += `<li><a class="dropdown-item" href="/products/categorys/${el.id}">${el.name}</a></li>`)
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    categorys();
    
})