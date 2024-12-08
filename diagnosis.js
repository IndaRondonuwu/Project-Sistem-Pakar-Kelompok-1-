function diagnosis() {
    const gejala = {
        demamTubuh: parseFloat(document.getElementById('demamTubuh').value),
        sakitKepala: parseFloat(document.getElementById('sakitKepala').value),
        mengalamiBatuk: parseFloat(document.getElementById('mengalamiBatuk').value),
        lamaGejala: parseFloat(document.getElementById('lamaGejala').value),
        hidungTersumbat: parseFloat(document.getElementById('hidungTersumbat').value),
        tenggorokanSakit: parseFloat(document.getElementById('tenggorokanSakit').value),
        lelahLesu: parseFloat(document.getElementById('lelahLesu').value),
        nyeriOtot: parseFloat(document.getElementById('nyeriOtot').value),
        bersinBersin: parseFloat(document.getElementById('bersinBersin').value),
        mualMuntah: parseFloat(document.getElementById('mualMuntah').value),
        nafsuMakan: parseFloat(document.getElementById('nafsuMakan').value),
        sensasi: parseFloat(document.getElementById('sensasi').value),
        sesakNafas: parseFloat(document.getElementById('sesakNafas').value)
    };

    const mb = {
        demamTubuh: 0.95,
        sakitKepala: 0.9,
        mengalamiBatuk: 0.9,
        lamaGejala: 0.6,
        hidungTersumbat: 0.85,
        tenggorokanSakit: 0.9,
        lelahLesu: 0.9,
        nyeriOtot: 0.75,
        bersinBersin: 0.8,
        mualMuntah: 0.5,
        nafsuMakan: 0.6,
        sensasi: 0.65,
        sesakNafas: 0.4
    };

    const md = 0.2;
    const cfPakar = {};
    for (let key in mb) {
        cfPakar[key] = mb[key] - md;
    }

    const cfUser = {};
    let cfTotal = 0;
    const details = [];

    for (let key in gejala) {
        cfUser[key] = gejala[key] * cfPakar[key];
        details.push(`${key}: MB = ${mb[key].toFixed(2)}, MD = ${md.toFixed(2)}, CF Pakar = ${cfPakar[key].toFixed(2)}, CF User = ${cfUser[key].toFixed(2)}`);
        cfTotal = combineCF(cfTotal, cfUser[key]);
    }

    cfTotal = Math.min(cfTotal, 1);

    const resultDiv = document.getElementById('result');
    if (cfTotal > 0) {
        resultDiv.innerHTML = `Diagnosis: Kemungkinan Anda menderita flu dengan tingkat kepastian: ${(cfTotal * 100).toFixed(2)}%`;
    } else {
        resultDiv.innerHTML = "Diagnosis: Tidak ada gejala yang cukup untuk mendeteksi flu.";
    }

    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = `<h3>Detail Perhitungan</h3><ul>${details.map(d => `<li>${d}</li>`).join('')}</ul>`;
}

function combineCF(cf1, cf2) {
    return cf1 + cf2 * (1 - cf1);
}
