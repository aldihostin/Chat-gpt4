function getAnswer() {
    var question = document.getElementById("question").value;
    const answerElement = document.getElementById("answer");
    const searchButton = document.getElementById("searchButton");
    const backButton = document.getElementById("backButton");

    answerElement.innerText = ''; // Mengosongkan konten jawaban sebelum mengetik jawaban baru
    searchButton.innerText = 'Sedang mencari...'; // Mengubah teks tombol Cari Jawaban
    searchButton.disabled = true; // Menonaktifkan tombol Cari Jawaban selama pencarian sedang berlangsung

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
            backButton.style.display = "block";
            searchButton.innerText = 'Kirim Jawaban'; // Mengembalikan teks tombol Cari Jawaban
            searchButton.disabled = false; // Mengaktifkan kembali tombol Cari Jawaban
        } else {
            answerElement.innerText = "Maaf, permintaan Anda tentang pertanyaan tersebut tidak dapat kami jawab.";
            // Menyembunyikan tombol "Kembali" jika jawaban tidak tersedia
            backButton.style.display = "none";
            searchButton.innerText = 'Gagal'; // Mengubah teks tombol Cari Jawaban menjadi 'Gagal'
            searchButton.disabled = false; // Mengaktifkan kembali tombol Cari Jawaban
        }
    })
    .catch(error => {
        console.error('Error:', error);
        answerElement.innerText = "Terjadi kesalahan dalam memproses permintaan. Silakan coba lagi nanti."; // Menampilkan pesan kesalahan
        backButton.style.display = "none"; // Menyembunyikan tombol "Kembali"
        searchButton.innerText = 'Gagal'; // Mengubah teks tombol Cari Jawaban menjadi 'Gagal'
        searchButton.disabled = false; // Mengaktifkan kembali tombol Cari Jawaban
    });
}
