function searchSupplier(){
    let ruc = document.getElementById('id_ruc').value;

    if(ruc === ''){
        alert('Debe ingresar un RUC.')
    }else{
        let found = document.getElementById('supplier_found');
        found.style.display = 'block';

        let new_supplier = document.getElementById('id_new_supplier');
        new_supplier.classList.remove('hide');
        /*
        fetch(base_API + '',{
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
            let found = document.getElementById('supplier_found');
            found.style.display = block;
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
        });*/
    }

}