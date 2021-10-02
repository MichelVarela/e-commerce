window.addEventListener("load", () => {

    let d = document;

    let $categorys = d.querySelector("main.products #category");
    let $subcategorys = d.querySelector("main.products #subcategory");

    fetch("http://localhost:3000/api/subcategory") // peticion a la url
    .then(response => response.json()) // paso a formato json
    .then(result => { 
        
        $categorys.addEventListener("change", (e) => {
        
            let $subcategory = result.data;

            let $option = $subcategory.filter(subcategory => { // filtro las subcategorys que coincidan con la category
                return e.target.value == subcategory.fk_category.id
            })

            $subcategorys.innerHTML = "<option selected hidden>Asigna una subcategoria</option>"; // en cada change limpio el select

            $option.forEach(item => { // itero la lista filtrada y la ingreso en el select
                $subcategorys.innerHTML += `<option value="${item.id}">${item.name}</option>`
            })

        })
    })

})