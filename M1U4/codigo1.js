function determinarMedioTransporte(distancia) {
    if (distancia >= 0 && distancia <= 1000) {
        return "pie";
    } else if (distancia <= 10000) {
        return "bicicleta";
    } else if (distancia <= 30000) {
        return "colectivo";
    } else if (distancia <= 100000) {
        return "auto";
    } else {
        return "avión";
    }
}

// Ejemplo 
const distancia = 15000; // valor de distancias que pueden cambiar
const medioTransporte = determinarMedioTransporte(distancia);
console.log(`Para una distancia de ${distancia} metros, el medio de transporte apropiado es: ${medioTransporte}`);