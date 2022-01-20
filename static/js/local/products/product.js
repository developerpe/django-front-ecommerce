var update_id = 0;

loadCategories();
loadMeasureUnits();

function addProduct(){ 
    let formData = new FormData();
    
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('image', document.getElementById('image').files[0]);
    formData.append('measure_unit', document.getElementById('measure_unit').value);
    formData.append('category_product', document.getElementById('category_product').value);

    fetchCreateUpdate('products/products/', formData, false, true);
}

function updateProduct(){
    let url = 'products/products/' + update_id + "/"
    let formData = new FormData();
    
    formData.append('name', document.getElementById('id_name').value);
    formData.append('description', document.getElementById('id_description').value);
    formData.append('image', document.getElementById('id_image').files[0]);
    formData.append('measure_unit', document.getElementById('id_measure_unit').value);
    formData.append('category_product', document.getElementById('id_category_product').value);
    
    fetchCreateUpdate(url, formData, true, true);
}

function loadCategories(id=0){
    fetch(base_API + 'products/category-products/get_categories/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let select;
        if(id == 0){
            select = document.getElementById('category_product');
        }else{
            select = document.getElementById('id_category_product');
        }
        
        for(let i = 0; i < data.length; i++){
            let option = document.createElement('option');
            if(data[i].id == id){
                option.setAttribute('selected', 'selected');
            }           
            option.value = data[i].id;
            option.text = data[i].description;
            select.add(option);
        }
    })
    .catch(function(error){
        console.log("RESPUESTA EN CATCH");
        console.log(error);
    });
}

function loadMeasureUnits(id=0){
    fetch(base_API + 'products/measure-unit/get_measure_units/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let select;
        if(id == 0){
            select = document.getElementById('measure_unit');
        }else{
            select = document.getElementById('id_measure_unit');
        }
        
        for(let i = 0; i < data.length; i++){
            let option = document.createElement('option');
            if(data[i].id == id){
                option.setAttribute('selected', 'selected');
            }           
            option.value = data[i].id;
            option.text = data[i].description;
            select.add(option);
        }
    })
    .catch(function(error){
        console.log("RESPUESTA EN CATCH");
        console.log(error);
    });
}

window.actionEvents = {
    'click .btn-secondary': function(e, value, row, index){
        update_id = row.id;
        fetch(base_API + 'products/products/'+row.id+"/",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            loadCategories(data.category_product);
            loadMeasureUnits(data.measure_unit);
            document.getElementById('id_name').value = data.name;
            document.getElementById('id_description').value = data.description;
            document.getElementById('actual_image').innerHTML = data.image;
            document.getElementById('openUpdateModal').click();
        })
        .catch(function(error){
            console.log("RESPUESTA EN CATCH");
            console.log(error);
        });
    },
    'click .btn-danger': function(e, value, row, index){
        fetchDelete('products/products/' + row.id + "/");
    }
}