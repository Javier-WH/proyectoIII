const optPrice = document.getElementById("opt-prices");
const month = document.getElementById("price-modal-inputMonth");
const base = document.getElementById("price-modal-base");
const uniform = document.getElementById("price-modal-uniform");
const emblem = document.getElementById("price-modal-emblem");
const administrative = document.getElementById("price-modal-administravie");
const modal = document.getElementById("prices-modal");
const btnUpdate = document.getElementById("btn-update-prices");
let dataChange = false;

export async function initPrices() {
    optPrice.addEventListener("click", async e => {
        const dataChange = false;
        initCloseWindowEvents();
        modal.classList.remove("invisible")
        let prices = await getPrices();
        setPrices(prices);
        updateEvents();

        checkDataChange();
        getTotalPrice();
    })
}

function setPrices(prices) {
    month.value = prices.month;
    base.value = prices.base;
    uniform.value = prices.uniform;
    emblem.value = prices.emblem;
    administrative.value = prices.administratives_costs;
}

async function getPrices() {
    let response = await fetch("/getPrices");
    let data = await response.json();
    return data
}

function initCloseWindowEvents() {
    const X = document.getElementById("prices-modal-close-x");
    X.addEventListener("click", () => {
        modal.classList.add("invisible")
    })
}

function updateEvents() {

    btnUpdate.addEventListener("click", () => {
        if (month.value == "" || base.value == "" || uniform.value == "" || emblem.value == "" || administrative.value == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debe llenar todos los campos',
            })
            return
        }

        let data = { 
            month: month.value,
            base: base.value, 
            uniform: uniform.value, 
            emblem: emblem.value, 
            administratives_costs:administrative.value
        }
        if(dataChange){
            updateData(data);
        }
        else{
            console.log("No hay cambios que guardar")
        }
    })
}

async function updateData({ month, base, uniform, emblem, administratives_costs }) {

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        month,
        base,
        uniform,
        emblem,
        administratives_costs
    });

    let response = await fetch("/UpdatePrices", {
        method: "PATCH",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.json();
    
    if(data.error){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message
        })
    }else{
        dataChange = false;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Información actualizada',
            showConfirmButton: false,
            timer: 1500
          })
        
    }
}

function checkDataChange(){
    month.addEventListener("change", ()=>{
        dataChange = true;
    });
    
    base.addEventListener("change", ()=>{
        dataChange = true;
    })

    uniform.addEventListener("change", ()=>{
        dataChange = true;
    })
    
    emblem.addEventListener("change", ()=>{
        dataChange = true;
    })
    
    administrative.addEventListener("change", ()=>{
        dataChange = true;
    })

    base.addEventListener("keyup", ()=>{
        getTotalPrice();
    })

    uniform.addEventListener("keyup", ()=>{
        getTotalPrice();
    })
    
    emblem.addEventListener("keyup", ()=>{
        getTotalPrice();
    })
    
    administrative.addEventListener("keyup", ()=>{
        getTotalPrice();
    })

}

function getTotalPrice(){
    let basePrice = Number.parseFloat(base.value);
    let uniformPrice = Number.parseFloat(uniform.value);
    let emblemPrice = Number.parseFloat(emblem.value);
    let administrativePrice = Number.parseFloat(administrative.value);

    basePrice = isNaN(basePrice) ? 0 : basePrice;
    uniformPrice = isNaN(uniformPrice) ? 0 : uniformPrice;
    emblemPrice = isNaN(emblemPrice) ? 0 : emblemPrice;
    administrativePrice = isNaN(administrativePrice) ? 0 : administrativePrice;

    let total = basePrice + uniformPrice + emblemPrice + administrativePrice;
    document.getElementById("price-modal-inscription-total-price").innerText = `Costo de la inscripción: ${total} USD`;
}


