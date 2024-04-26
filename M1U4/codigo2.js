function encontrarMayor(arrayNumeros) {
    let mayor = arrayNumeros[0]; 
    
    for (let i = 1; i < arrayNumeros.length; i++) {
        if (arrayNumeros[i] > mayor) {
            mayor = arrayNumeros[i]; 
        }
    }
    
    return mayor;
}

// Ejemplo
const numeros = [18, 54, 30, 850, 27, 120]; 
const numeroMayor = encontrarMayor(numeros);
console.log(`El número más grande en el array es: ${numeroMayor}`);