// Define the array of URLs for fetching data
const usdtUrls = [
    { url: "https://criptoya.com/api/lemoncash/usdt/ars/0.1", name: "LemonCash" },
    { url: "https://criptoya.com/api/belo/usdt/ars/0.1", name: "Belo" },
    { url: "https://criptoya.com/api/buenbit/usdt/ars/0.1", name: "BuenBit" },
    { url: "https://criptoya.com/api/letsbit/usdt/ars/0.1", name: "LetsBit" },
    { url: "https://criptoya.com/api/tiendacrypto/usdt/ars/0.1", name: "TiendaCrypto" },
    { url: "https://criptoya.com/api/fiwind/usdt/ars/0.1", name: "Fiwind" }
];

// Rest of your code remains the same...


// Sample data (replace with your actual data)
const entries = [
    { empresa: "LemonCash", venta: "$743,99", compra: "$721,99", fecha: "4/09/2023", comisionCompra: "1.00%", comisionVenta: "0.5%" },
    // Add more data objects for other entries
];

// Get the card container
const cardContainer = document.querySelector('#card-container');

// Loop through the data and generate cards
entries.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'card bg-dark text-white mb-3';
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Empresa: ${entry.empresa}</h5>
            <p class="card-text">Venta: ${entry.venta}</p>
            <p class="card-text">Compra: ${entry.compra}</p>
            <p class="card-text">Fecha: ${entry.fecha}</p>
            <p class="card-text">Comisión Compra: ${entry.comisionCompra}</p>
            <p class="card-text">Comisión Venta: ${entry.comisionVenta}</p>
        </div>
    `;
    cardContainer.appendChild(card);
});

// Function to fetch prices from the given URLs
async function fetchPrices() {
    for (const usdt of usdtUrls) {
        try {
            const response = await fetch(usdt.url);
            const data = await response.json();

            // Find the corresponding card by empresa name
            const card = document.querySelector(`.card-title:contains("${usdt.name}")`).closest('.card');

            // Update the card content with fetched data
            if (card) {
                card.querySelector('.card-text:nth-child(2)').textContent = `Compra: ${data.compra}`;
                card.querySelector('.card-text:nth-child(3)').textContent = `Venta: ${data.venta}`;
                // Add more data fields as needed
            }
        } catch (error) {
            console.error(`Error fetching data for ${usdt.name}:`, error);
        }
    }
}

// Call the fetchPrices function when the page loads
window.addEventListener('load', fetchPrices);
