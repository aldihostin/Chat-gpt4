function getAnswer() {
    var question = document.getElementById("question").value;
    const answerElement = document.getElementById("answer");
    answerElement.innerText = ''; // Mengosongkan konten jawaban sebelum mengetik jawaban baru
    const searchButton = document.getElementById("searchButton");
    searchButton.style.display = "none"; // Menyembunyikan tombol "Cari Jawaban"
    fetch('https://aemt.me/gemini?text=' + encodeURIComponent(question.trim()))
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status) {
            answerElement.innerText = data.result; // Menampilkan jawaban secara langsung
            // Memunculkan tombol "Kembali"
            document.getElementById("backButton").style.display = "block";
        } else {
            answerElement.innerText = "Maaf, permintaan Anda tentang pertanyaan tersebut tidak dapat kami jawab.";
            // Menampilkan kembali tombol "Cari Jawaban" jika jawaban tidak tersedia
            searchButton.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function resetAnswer() {
    document.getElementById("answer").innerText = ''; // Menghapus jawaban yang telah ditampilkan
    document.getElementById("backButton").style.display = "none"; // Menyembunyikan tombol "Kembali"
    document.getElementById("searchButton").style.display = "block"; // Menampilkan kembali tombol "Cari Jawaban"
}
