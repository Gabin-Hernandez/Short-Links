const form = document.getElementById("input");
const formBtn = document.getElementById("input-btn");
const API_KEY = 'lOPjuk6j4EMATBA3K7Lchtzg2KpoSxNgKQ3JLoTdlMUuedOmMZ2LuHyRj6DT'; // Reemplaza con tu API Key
const API_URL = 'https://api.tinyurl.com/create';
const copyBtn = document.getElementById("copy-btn");
const shortUrl = document.getElementById("url-short");
const container = document.querySelector(".response");

async function fetchData() {
    const longUrl = form.value;
    const userURL = document.getElementById("url-user");
    const shortUrl = document.getElementById("url-short");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                url: longUrl,
                domain: "tiny.one" // Puedes usar tu dominio personalizado si tienes uno
            })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        container.style.display = "flex";
        const data = await response.json();
        userURL.textContent = longUrl;
        shortUrl.textContent = data.data.tiny_url;
        shortUrl.href = data.data.tiny_url;
    } catch (error) {
        console.error(error);
        alert("Hubo un error al acortar el link.");
    }
}

formBtn.addEventListener("click", fetchData);

copyBtn.addEventListener("click", () => {
    const textToCopy = shortUrl.textContent;
    const isValidUrl = textToCopy.startsWith("http://") || textToCopy.startsWith("https://");

    if (isValidUrl) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                shortUrl.textContent = "¡URL copiada al portapapeles!";
                copyBtn.textContent = "¡Copiado!";
                copyBtn.style = "background-color: black; color: white;";

                setTimeout(() => {
                    copyBtn.textContent = "copy";
                    copyBtn.style = ""; // vuelve al estilo original
                    shortUrl.textContent = textToCopy; // vuelve a mostrar el link
                }, 1500);
            })
            .catch(err => {
                console.error("Error al copiar: ", err);
                alert("No se pudo copiar el link.");
            });
    } else {
        alert("Primero genera un enlace válido para copiar.");
    }
});

