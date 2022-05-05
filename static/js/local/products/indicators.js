var update_id = 0;

loadCategories();

function addIndicator(){ 
    fetchCreateUpdate('products/indicators/', {
        'descount_value': document.getElementById('descount_value').value,
        'category_product': document.getElementById('category_product').value
    });
}

function updateIndicator(){
    let url = 'products/indicators/' + update_id + "/"
    fetchCreateUpdate(url, {
        'descount_value': document.getElementById('id_descount_value').value,
        'category_product': document.getElementById('id_category_product').value
    }, true);
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

window.actionEvents = {
    'click .btn-secondary': function(e, value, row, index){
        update_id = row.id;
        fetch(base_API + 'products/indicators/'+row.id+"/",{
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
            document.getElementById('id_descount_value').value = data.descount_value;
            document.getElementById('openUpdateModal').click();
        })
        .catch(function(error){
            console.log("RESPUESTA EN CATCH");
            console.log(error);
        });
    },
    'click .btn-danger': function(e, value, row, index){
        fetchDelete('products/indicators/' + row.id + "/");
    }
}