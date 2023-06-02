//e - enter
//o - ober
//i - imes
//a - ai
//u - ufat

const encriptar = document.getElementById("button_encriptar"),
    desencriptar = document.getElementById("button_desencriptar"),
    copy = document.getElementById("button_copiar"),
    textoInicial = document.getElementById("textoInput"),
    textFinal = document.getElementById("textoFinal"),
    munheco = document.getElementById("munheco"),
    textInfo = document.getElementById("textoInfo"),
    rigth = document.getElementById("rigth");


const remplace = (newvalue) => {
    textFinal.innerHTML = newvalue;
    textFinal.classList.add("ajustar");
    rigth.classList.add("ajuste")
    textoInicial.value = "";
    textoInicial.style.height = "auto"
    textoInicial.placeholder = "Ingrese el texto aquí";
    munheco.classList.add("ocultar");
    textInfo.classList.add("ocultar");
    copy.classList.remove("bn_ocultar");
}

const reset = () => {
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textFinal.innerHTML = "";
    rigth.classList.remove("ajuste")
    textFinal.classList.remove("ajustar");
    munheco.classList.remove("ocultar");
    textFinal.placeholder = "Ningún mensaje fue encontrado";
    textInfo.classList.remove("ocultar")
    copy.classList.add("bn_ocultar");
    textoInicial.focus();
};

let remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];

encriptar.addEventListener('click', () => {
    const texto = textoInicial.value.toLowerCase();
    if (texto != "") {
        function encript(newtext) {
            for (let i = 0; i < remplazar.length; i++) {
                if (newtext.includes(remplazar[i][0])) {
                    newtext = newtext.replaceAll(remplazar[i][0], remplazar[i][1]);
                };
            };
            return newtext;
        };
        remplace(encript(texto));
    } else {
        //alert("Ingrese texto para encriptar");
        showToast("Ingrese texto para encriptar!");
        reset();
    };
});

desencriptar.addEventListener('click', () => {
    const texto = textoInicial.value.toLowerCase();
    if (texto != "") {
        function desencript(newtext) {
            for (let i = 0; i < remplazar.length; i++) {
                if (newtext.includes(remplazar[i][1])) {
                    newtext = newtext.replaceAll(remplazar[i][1], remplazar[i][0]);
                };
            };
            return newtext;
        };
        remplace(desencript(texto));
    } else {
        //alert("Ingrese texto a desencriptar");
        showToast("Ingrese texto para desencriptar!");
        reset();
    };
});

copy.addEventListener("click", () => {
    let texto = textFinal;
    texto.select();
    document.execCommand('copy');
    //navigator.clipboard.writeText(texto.value);
    //clipboard función no compatible con móviles
    //alert("Texto Copiado");
    showToast("Texto Copiado.");
    reset();
});

//auto ajuste de textarea
textoInicial.addEventListener("change", e => {
    textoInicial.style.height = "auto";
    let scHeight = e.target.scrollHeight;
    textoInicial.style.height = `${scHeight}px`;
});
textoInicial.addEventListener("keyup", e => {
    textoInicial.style.height = "auto";
    let scHeight = e.target.scrollHeight;
    textoInicial.style.height = `${scHeight}px`;
});

/// Funcion mostrar toast
function showToast(mensaje) {
    var container_toast = document.getElementById('toast-container');
    // Crear el toast si no existe
    if (!container_toast) {
        container_toast = document.createElement('div');
        container_toast.id = 'toast-container';
        document.body.appendChild(container_toast);
    }

    var toast = document.createElement('div');
    toast.className = 'toast';

    var message = document.createElement('span');
    message.className = 'toast-message';
    message.innerText = mensaje;

    container_toast.appendChild(toast);
    toast.appendChild(message);

    // Eliminar el toast después de 2 segundos
    setTimeout(function () {
        container_toast.remove(container_toast);
    }, 2000);
}


