// eliminar las filas de la tabla des
function eliminaFilas(tablebody) {
    var tabla = document.getElementById(tablebody);
    const cantFilas = tabla.childElementCount;
    for (let i = 0; i < cantFilas; i++) {
        tabla.deleteRow(0);
    }
}

// definir la dimensión de la paginación para la tablas
function pagination(querySet, page, rows) {
    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
    var trimmedData = querySet.slice(trimStart, trimEnd)

    if ((querySet.length - 1) % rows == 0) {
        var pages = Math.round(querySet.length / rows + 1);
    } else {
        var pages = Math.round(querySet.length / rows);
    }

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

// crear los botones de la paginación
function pageButtons(pages, state, tablebody) {
    var pagination_wrapper = document.getElementById('pagination-wrapper');
    pagination_wrapper.innerHTML = ``;
    var maxLeft = (state.page - Math.floor(state.window / 2));
    var maxRight = (state.page + Math.floor(state.window / 2));
    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        if (maxLeft < 1) {
            maxLeft = 1
        }
        maxRight = pages
    }
    for (var page = maxLeft; page <= maxRight; page++) {
        pagination_wrapper.innerHTML += `<li class="page-item"><button value=${page} class="page-link">${page}</button></li>`;
    }
    $('.page-link').on('click', function () {
        eliminaFilas(tablebody);
        state.page = parseInt($(this).val());
        buildTable(state, tablebody);
    })
}

// crear las filas de la tabla con sus datos 
function buildTable(state, tablebody) {
    var tablebodyListaEstudiantes = document.getElementById(tablebody);
    
    eliminaFilas(tablebody);

    var data = pagination(state.querySet, state.page, state.rows);
    var myList = data.querySet

    for (var i in myList) {
        var tr = document.createElement("tr");
        var col01 = document.createElement("th");
        var col02 = document.createElement("td");
        var col03 = document.createElement("td");
        var col04 = document.createElement("td");
        var col05 = document.createElement("td");
        var col06 = document.createElement("td");

        tr.id = "estudiante-" + myList[i].id;
        col01.scope = "row";
        col01.textContent = myList[i].id;
        col02.textContent = myList[i].cedula;
        col03.textContent = myList[i].apellidos;
        col04.textContent = myList[i].nombres;
        col05.textContent = myList[i].celular;
        col06.innerHTML = myList[i].acciones;
        tr.appendChild(col01);
        tr.appendChild(col02);
        tr.appendChild(col03);
        tr.appendChild(col04);
        tr.appendChild(col05);
        tr.appendChild(col06);
        tablebodyListaEstudiantes.appendChild(tr);
    }
    pageButtons(data.pages, state, tablebody);
}