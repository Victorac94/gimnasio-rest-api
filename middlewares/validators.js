isDNI = dni => {
    const regexp = /^\d{8}[a-zA-Z]$/;

    if (regexp.test(dni) === true) {
        let numero = dni.substring(0, dni.length - 1);
        const letr = dni.charAt(dni.length - 1);
        numero = numero % 23;
        let letra = "TRWAGMYFPDXBNJZSQVHLCKET";
        letra = letra.substring(numero, numero + 1);
        if (letra !== letr.toUpperCase()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

checkIsAlpha = str => {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return /^[a-zA-Z ]+$/.test(str)
}

checkIsAlphanumeric = str => {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return /^[a-zA-Z0-9 ªº]+$/.test(str)
}

module.exports = {
    isDNI: isDNI,
    checkIsAlpha: checkIsAlpha,
    checkIsAlphanumeric: checkIsAlphanumeric
}