var base_API = 'http://localhost:8001/';
var error = false;
var temp_errors = {};
var id_help = 0;


function getToken() {
    return window.localStorage.getItem('token');
}

function closeCreationModal(){
    document.getElementById('creation_form').reset();
    document.getElementById('close_modal_creation').click();
}

function closeUpdateModal(){
    document.getElementById('update_form').reset();
    document.getElementById('close_modal_update').click();
}

function actionFormatter() {
    let html = '<button class="btn btn-secondary">Editar</>';
    html += '<button class="btn btn-danger" style="margin:10px;">Eliminar</>';
    return html
}

window.ajaxOptions = {
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    }
}

function showErrors(errors, update=false){
    temp_errors = errors;
    if(update){
        for(element in errors){
            let temp_element = document.getElementById("id_"+element);
            temp_element.style.borderColor = 'red';
            
            let temp_error_element = document.getElementById("id_"+element + '_error');
            temp_error_element.style.color = 'red';
            temp_error_element.innerHTML = errors[element][0];
        }
    }else{
        for(element in errors){
            let temp_element = document.getElementById(element);
            temp_element.style.borderColor = 'red';
            
            let temp_error_element = document.getElementById(element + '_error');
            temp_error_element.style.color = 'red';
            temp_error_element.innerHTML = errors[element][0];
        }
    }
}

function hideErrors(update=false){
    if(update){
        for(element in temp_errors){
            let temp_element = document.getElementById("id_"+element);
            temp_element.style.borderColor = '';
            
            let temp_error_element = document.getElementById("id_"+element + '_error');
            temp_error_element.style.color = '';
            temp_error_element.innerHTML = '';
        }
    }else{
        for(element in temp_errors){
            let temp_element = document.getElementById(element);
            temp_element.style.borderColor = '';
            
            let temp_error_element = document.getElementById(element + '_error');
            temp_error_element.style.color = '';
            temp_error_element.innerHTML = '';
        }
    }
}

function fetchCreateUpdate(url, data, update=false, files=false){
    let temp_headers;
    let temp_body;
    if(files){
        temp_headers = {
            'Authorization': 'Bearer ' + getToken()
        }
        temp_body = data
    }else{
        temp_headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
        temp_body = JSON.stringify(data)
    }

    if(update==false){
        fetch(base_API + url,{
            method: 'POST',
            headers: temp_headers,
            body: temp_body
        })
        .then(function(response){
            if(response.status == 400 || response.status == 401){
                error = true;
            }
            return response.json();
        })
        .then(function(data){
            if(error){
                showErrors(data.error);
                error = false;
            }else{
                $('#table').bootstrapTable('refresh'); 
                alert(data.message);
                hideErrors();
                closeCreationModal();           
            }
        })
        .catch(function(error){
            console.log("RESPUESTA EN CATCH");
            console.log(error);
        });
    }else{
        fetch(base_API + url,{
            method: 'PUT',
            headers: temp_headers,
            body: temp_body
        })
        .then(function(response){
            if(response.status == 400 || response.status == 401){
                error = true;
            }
            return response.json();
        })
        .then(function(data){
            if(error){
                showErrors(data.error, update=true);
                error = false;
            }else{
                $('#table').bootstrapTable('refresh'); 
                alert(data.message);
                hideErrors(update=true);
                closeUpdateModal();           
            }
        })
        .catch(function(error){
            console.log("RESPUESTA EN CATCH");
            console.log(error);
        });
    }

}

function fetchDelete(url){
    fetch(base_API + url, {
        method: 'DELETE',
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
        $('#table').bootstrapTable('refresh'); 
        alert(data.message);     
    })
    .catch(function(error){
        console.log("RESPUESTA EN CATCH");
        console.log(error);
    });
}

