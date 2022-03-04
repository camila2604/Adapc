// Consigna
// En este proyecto vas a desarrollar un sistema para llevar registro de ventas. Construirás un sistema de alta,baja y modificaciones con datos precargados, además se debe mostrar estadisticas. Para hacerlo, utilizarás un flujo de trabajo que te permitirá ir complejizando el código de manera gradual, pudiendo trabajar en varias funcionalidades por separado sin que estas afecten el resto de tu código.

// 💬 Comentarios
// A diferencia del anterior, este proyecto tiene una cantidad de líneas de código mucho más reducida. El diseño no es complicado, no tenemos mucho que maquetar ni demasiados elementos que estilar o manipular. La dificultad consiste en que tiene una lógica más compleja, que requiere ser pensada y analizada de antemano con más cuidado y detalle que en los proyectos anteriores.

// Si empezamos a probar y modificar cosas, sin tener muy en claro qué y por qué lo estamos haciendo, es probable que nos encontremos con caminos sin salida muy seguido, que el código se vuelva muy difícil de seguir y que tengamos que volver hacia atrás reiteradas veces.

// ✏️ Datos precarcados
const vendedoras= ["Ada", "Grace", "Hedy", "Sheryl"]

const ventas= [
  // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    {
        id: 1,
        fecha: new Date(2019, 1, 4),
        nombreVendedora: "Grace",
        sucursal: "Centro",
        componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
    },
    {
        id: 2,
        fecha: new Date(2019, 0, 1),
        nombreVendedora: "Ada",
        sucursal: "Centro",
        componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
    },
    {
        id: 3,
        fecha: new Date(2019, 0, 2),
        nombreVendedora: "Grace",
        sucursal: "Caballito",
        componentes: ["Monitor ASC 543", "Motherboard MZI"],
    },
    {
        id: 4,
        fecha: new Date(2019, 0, 10),
        nombreVendedora: "Ada",
        sucursal: "Centro",
        componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"],
    },
    {
        id: 5,
        fecha: new Date(2019, 0, 12),
        nombreVendedora: "Grace",
        sucursal: "Caballito",
        componentes: ["Monitor GPRS 3000","Motherboard ASUS 1200"],
    },
]

const articulos= [
    { item: "Monitor GPRS 3000", precio: 200 },
    { item: "Motherboard ASUS 1500", precio: 120 },
    { item: "Monitor ASC 543", precio: 250 },
    { item: "Motherboard ASUS 1200", precio: 100 },
    { item: "Motherboard MZI", precio: 30 },
    { item: "HDD Toyiva", precio: 90 },
    { item: "HDD Wezter Dishital", precio: 75 },
    { item: "RAM Quinston", precio: 110 },
    { item: "RAM Quinston Fury", precio: 230 },
]

const sucursales= ["Centro", "Caballito"]

// 👍 Criterios de aceptación
// Los requisitos mínimos para que el proyecto sea considerado para la entrega son:

// Debe respetar el diseño general dado. Pueden modificarse a gusto colores, fondo, fuentes, íconos y temática (en vez de frutas, usar otros emojis, íconos u imágenes)
// Debe respetar las interacciones
// Debe cumplir con las funcionalidades principales listadas en la sección siguiente
// Debe estar deployado y ser accesible desde una dirección web
// No se debe trabajar en la rama main. En main sólo van a mergearse las demás ramas, por lo que cada commit de main debería ser el merge de una branch de una funcionalidad terminada

// 🎛 Funcionalidades principales
// Debe generar un modal para cargar las ventas.
// Debe generar un tabla donde se muestre las ventas.
// Debe ver indicadores que muestren los productos mas vendidos y la mejor vendedora.
// Debe poder borrar las ventas.
// Debe poder editar las ventas.
// Cada cambio debe actualizar toda informacion mostrada.

// 💡 Hint
// Para facilitar el desarrollo del proyecto es muy recomendable hacer las siguientes funciones. Esto evita código entendible y repetido. Por último recordemos que una función tiene una solo responsabilidad, es decir que tiene que realizar una sola cosa y hacerlo bien.




//***Busca el precio del articulo
const buscarPrecioDelArticulo = (articuloABuscar) =>{
    for (const articulo of articulos){
        if (articuloABuscar == articulo.item){
            return articulo.precio
        }
    }
}


console.log(buscarPrecioDelArticulo('Monitor GPRS 3000')) //200

//1------------

// precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

// const precioMaquina = (componentes) =>{
//     let sumaPrecio = 0
//     for (const componente of componentes){
//         sumaPrecio += articulos.find(articulo => articulo.item == componente).precio
//     }
//     return sumaPrecio
// }

//-----Mismo resultado pero reutilizando la funcion buscar precio del articulo (linea 89)

const precioMaquina = (componentes) =>{
    let sumaPrecio = 0
    for (const componente of componentes){
        sumaPrecio += buscarPrecioDelArticulo(componente)
    }
    return sumaPrecio
}


console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500'])); // 320 ($200 del monitor + $120 del motherboard)



//2------------

// cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = (componenteABuscar) =>{
    let contadorVenta = 0
    for (const venta of ventas){
        for(const componente of venta.componentes){
            if(componenteABuscar == componente){
                contadorVenta++
            } 
        }
    }
    return contadorVenta
}

console.log(cantidadVentasComponente('Monitor ASC 543')); // 2


//3-------------

// vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

//***Funcion para obtener las ventas dependiendo la fecha
const ventasPorFecha = (mes,anio) =>{
    return ventas.filter((venta)=> (mes-1) == venta.fecha.getMonth()&& anio == venta.fecha.getFullYear())
}
console.log(ventasPorFecha(1,2019))
//***


const vendedoraDelMes = (mes, anio) =>{
    const ventasDelMes = ventasPorFecha(mes, anio);
    const ventasPorVendedora = {}
    for (const venta of ventasDelMes){
        if(ventasPorVendedora[venta.nombreVendedora]== undefined){
            ventasPorVendedora[venta.nombreVendedora] = precioMaquina(venta.componentes)
        }else{
            ventasPorVendedora[venta.nombreVendedora] += precioMaquina(venta.componentes)
        }
    }

    let vendedoraNombre = ""
    let vendedoraPrecio = 0
    for (const indice in ventasPorVendedora){
        if(vendedoraPrecio <= ventasPorVendedora[indice]){
            vendedoraPrecio = ventasPorVendedora[indice]
            vendedoraNombre = indice
        }
    }
    return vendedoraNombre
}


console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)


//4---------------

// ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio) => {
    let componentesFiltrados = []
    const componentesVendidos = ventasPorFecha(mes, anio)
    for(const componenteVendido of componentesVendidos){
        componentesFiltrados.push(componenteVendido.componentes)
    }
    let componentesFiltradosJoin = componentesFiltrados.join().split(',')
    
    return precioMaquina(componentesFiltradosJoin)
}
console.log(ventasMes(1, 2019)); // 1250


//5-------------

// ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) =>{
    let sumaPrecio = 0
    for (const venta of ventas){
        if(venta.nombreVendedora === nombre){
            sumaPrecio += precioMaquina(venta.componentes)
        }
    }
    return sumaPrecio
}

console.log(ventasVendedora('Grace')); // 900


//6-------------

// componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () =>{
    let componentesVendidos = []
    for (const articulo of articulos){
        componentesVendidos.push({cantidad:cantidadVentasComponente(articulo.item), nombre: articulo.item})
    }
    
    let auxiliarCantidad = 0 
    let auxiliarNombre = ""
    for (const componenteVendido of componentesVendidos){
        if(componenteVendido.cantidad > auxiliarCantidad) { 
            auxiliarCantidad = componenteVendido.cantidad
            auxiliarNombre = componenteVendido.nombre 
        }
    }
    return auxiliarNombre
}

console.log(componenteMasVendido()); // Monitor GPRS 3000


//7------------

// huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {
    let bandera = false
    for (const venta of ventas){
        if((mes-1) == venta.fecha.getMonth() && anio == venta.fecha.getFullYear() ){
            bandera = true
            return bandera
        }
    } 
    return bandera
}


console.log(huboVentas(3, 2019)); // false


//8------------

// Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.


const ventasSucursal = (sucursal) =>{
    let totalSucursal = 0 
    for(const venta of ventas){
        if(venta.sucursal == sucursal){
            totalSucursal += precioMaquina(venta.componentes)
        }
    } 
    return totalSucursal
}

console.log(ventasSucursal('Centro')); // 990


//9--------
// Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

const ventasVendedoraSucursal = (propiedad, parametro) =>{
    let totalParametro = 0
    for (const venta of ventas){
        venta[propiedad] === parametro ? totalParametro += precioMaquina(venta.componentes) : totalParametro = totalParametro
    }
    return totalParametro
}

console.log(ventasVendedoraSucursal("nombreVendedora", "Ada"))
console.log(ventasVendedoraSucursal("sucursal", "Centro"))


//10-----
//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes =(mes, anio)=> {
    const filtroMesAnio = ventas.filter((venta)=> (mes-1) == venta.fecha.getMonth()&& anio == venta.fecha.getFullYear())
    let totalVentasMayor = 0
    let sucursalMayor = ""
    for (const sucursal of sucursales){
        const filtroSucursal = filtroMesAnio.filter((venta) => sucursal == venta.sucursal) 

        let totalVentas = 0
        for (const venta of filtroSucursal){
            totalVentas+= precioMaquina(venta.componentes)
        }
        if (totalVentasMayor<=totalVentas){
            totalVentasMayor= totalVentas
            sucursalMayor = sucursal
        }
    }
        return sucursalMayor
}


console.log(sucursalDelMes(1, 2019)); "Centro"


//---------
//Una funcion que devuelva el nombre de la vendedora que mas vendio sin limite de fecha. (Para poner en "Vendedora que más ingresos generó")


const ventasVendedoraSinFecha = (vendedoras) =>{
    let vendedoraMax = []
    for(const vendedora of vendedoras){
        vendedoraMax.push({ nombre: vendedora , total: ventasVendedora(vendedora)})
    }
    let nombreVendedora = ""
    let total = 0 
    for(const vendedora of vendedoraMax){
        if(vendedora.total >= total){
            nombreVendedora = vendedora.nombre
            total = vendedora.total
        }
    }
    return nombreVendedora
}
console.log(ventasVendedoraSinFecha( vendedoras))



//--------------------------------------------


//----- Ventas por sucursal -----

const tablaPorSucursal =() =>{  document.getElementById('tabla-por-sucursal').innerHTML = sucursales.map(function(sucursal){ 
    const ventaPorSucursal = ventasSucursal(sucursal)
    return ` <tr>
            <td>${sucursal} </td>
            <td>${ventaPorSucursal} </td>
        </tr>`
}).join(' ')}

//----- Reportes -----

const reportes = () =>{
    document.getElementById('producto-estrella').innerHTML = componenteMasVendido(ventas)
    document.getElementById('vendedora-ingresos').innerHTML = ventasVendedoraSinFecha (vendedoras)
}

//----- Fecha para la tabla-----

const parseDateToString = (date) =>{
    const fecha = new Date(date)
    const day = (`0${fecha.getDate()}`).slice(-2);
    const month = (`0${fecha.getMonth() + 1}`).slice(-2);
    return `${day}/${month}/${fecha.getFullYear()}` 
}

//----- Completar el cuadro -----

const tablaVentas = () => { document.getElementById('tabla-ventas').innerHTML = ventas.map(function itemVentas(venta){
    return `<tr>
        <td>${parseDateToString(venta.fecha)}</td>
        <td>${venta.nombreVendedora}</td>
        <td>${venta.sucursal}</td>
        <td>${venta.componentes.join(' - ')}</td>
        <td>${precioMaquina (venta.componentes)}</td>
        <td>
        <button class="boton" onclick="abrirEditModal('${venta.id}')"><i class="fas fa-pencil-alt has-text-success px-3 iconcss"></i></button>
        <button class="boton" onclick="abrirDeleteModal('${venta.id}')"><i class="far fa-trash-alt has-text-danger px-2 iconcss"></i></button>
        </td>
    </tr> `
}).join('')}


//----- Crea un ID -----

const generateId = () => Math.ceil(Math.random() * 100_000);

//----- Guarda la venta nueva y lo muestra en el cuadro-----

const guardarVenta = document.getElementById('guardar-venta').addEventListener('click', () => {
    const nombreVendedora = document.getElementById('nombre-vendedora').value;
    const fecha = document.getElementById('fecha-venta').value;
    console.log(document.getElementById('fecha-venta').value)
    const sucursal = document.getElementById('nombre-sucursal').value;
    const componentes = getOptionSelectedMultiple(document.getElementById('crear-componente'));
    const id = generateId();

    const venta = {
        id, nombreVendedora, fecha, sucursal, componentes
    }

    ventas.push(venta)

    updateDom()
})

//----- Funcion para que se seleccionen mas de un componente al ingresar una venta -----

const getOptionSelectedMultiple = (select) => {
    const result = [];
    const options = select && select.options;
    
    for (const option of options) {
        if (option.selected) {
        result.push(option.value);
        }
    }
    return result;

};

const updateDom = () =>{
    tablaPorSucursal();
    tablaVentas();
    reportes();
}


//-----Eliminar y editar

//-----Editar una venta

//-----Funcion creada por Mati para que tome los componentes cuando se edita-----

const setOptionSelectedMultiple = (element, optionsToSelect) =>{
    const options = element.options
    for (const index in options) {
        const option = options[index];
        
        if(optionsToSelect.includes(option.value)){
            option.selected = true 
        }
    }
}

//-----Cuando abrimos el modal para editar se tienen que ver los datos ya guardados-----

const abrirEditModal = (id) =>{
    const myModal = new bootstrap.Modal(document.getElementById('edit-modal'), {})
    myModal.show();
    
    let venta = ventas.find(venta => venta.id == id); 
    document.getElementById('editarNombre').value = venta.nombreVendedora;
    document.getElementById('editarSucursal').value = venta.sucursal;
    document.getElementById('editarFecha').value = venta.fecha;
    setOptionSelectedMultiple(document.getElementById('editarComponentes'), venta.componentes)
    document.getElementById('editarId').value = venta.id;
}

//----- Para editar una venta -----

document.getElementById('guardar-editar-venta').addEventListener('click', ()=>{
    const id = document.getElementById('editarId').value
    const nombreVendedora = document.getElementById('editarNombre').value;
    const fecha = new Date (document.getElementById('editarFecha').value);
    const sucursal = document.getElementById('editarSucursal').value;
    const componentes = getOptionSelectedMultiple(document.getElementById('editarComponentes'));

    const venta = {
        id, 
        nombreVendedora, 
        fecha, 
        sucursal, 
        componentes
    };

    const index = ventas.findIndex(venta => venta.id == id);
    ventas[index] = venta

    updateDom();
})



//-----Eliminar una venta----- 

const abrirDeleteModal = (id) =>{ 
    const myModal = new bootstrap.Modal(document.getElementById('delete-modal'), {})
    myModal.show();

    document.getElementById('deleteId').value = id;
}

document.getElementById('eliminarVenta').addEventListener("click", ()=>{
    const id =  document.getElementById('deleteId').value;
    const index = ventas.findIndex(venta => venta.id == id);
    if (index != -1){
        ventas.splice(index, 1);
    }

    updateDom()
})


const init = () =>{
    updateDom()
}
init()