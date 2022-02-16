function searchSupplier(){
    let error = false;
    let ruc = document.getElementById('ruc_or_business_name').value;

    if(ruc === ''){
        alert('Debe ingresar un RUC.')
    }else{
        let found = document.getElementById('supplier_found');
        found.style.display = 'block';

        let new_supplier = document.getElementById('id_new_supplier');
        new_supplier.classList.remove('hide');
        
        fetch(base_API + 'expense/expense/search_supplier/?ruc_or_business_name='+ruc,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        })
        .then(function(response){
            if(response.status == 400)
                error = true;
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if(error)
                alert(data.mensaje);
        })
        .catch(function(error){
            console.log("RESPUESTA EN CATCH");
            console.log(error);
        });
    }

}

function loadPaymentType(){
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
        select = document.getElementById('payment_type');
        
        for(let i = 0; i < data.length; i++){
            let option = document.createElement('option');
            if(data[i].id == id){
                option.setAttribute('selected', 'selected');
            }           
            option.value = data[i].id;
            option.text = data[i].name;
            select.add(option);
        }
    })
    .catch(function(error){
        console.log("RESPUESTA EN CATCH");
        console.log(error);
    });
}

function loadVoucherType(){
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
        select = document.getElementById('voucher');
        
        for(let i = 0; i < data.length; i++){
            let option = document.createElement('option');
            if(data[i].id == id){
                option.setAttribute('selected', 'selected');
            }           
            option.value = data[i].id;
            option.text = data[i].name;
            select.add(option);
        }
    })
    .catch(function(error){
        console.log("RESPUESTA EN CATCH");
        console.log(error);
    });
}

function loadProducts(){
    fetch(base_API + 'products/products/get_products/',{
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
        select = document.getElementById('product');
        
        for(let i = 0; i < data.length; i++){
            let option = document.createElement('option');
            if(data[i].id == id){
                option.setAttribute('selected', 'selected');
            }           
            option.value = data[i].id;
            option.text = data[i].name;
            select.add(option);
        }
    })
    .catch(function(error){
        console.log("RESPUESTA EN CATCH");
        console.log(error);
    });
}

loadVoucherType();
loadPaymentType();
loadProducts();