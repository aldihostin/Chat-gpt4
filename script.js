function getAnswer() {
    var question = document.getElementById("question").value;
    const answerElement = document.getElementById("answer");
    const searchButton = document.getElementById("searchButton");
    const backButton = document.getElementById("backButton");

    answerElement.innerText = ''; // Mengosongkan konten jawaban sebelum mengetik jawaban baru
    searchButton.style.display = "none"; // Menyembunyikan tombol "Cari Jawaban"
    backButton.style.display = "none"; // Menyembunyikan tombol "Kembali"

    fetch('https://aemt.me/gemini?text=' + encodeURIComponent(question.trim()))
    .then(response => {
        console.log('Response:', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
        if (data.status) {
            answerElement.innerText = data.result; // Menampilkan jawaban atau pesan kesalahan
            backButton.style.display = "block"; // Menampilkan tombol "Kembali"
        } else {
            answerElement.innerText = "Maaf, permintaan Anda tentang pertanyaan tersebut tidak dapat kami jawab."; // Menampilkan pesan kesalahan
            searchButton.style.display = "block"; // Menampilkan tombol "Cari Jawaban"
        }
    })
    .catch(error => {
        console.error('Error:', error);
        answerElement.innerText = "Terjadi kesalahan dalam memproses permintaan. Silakan coba lagi nanti."; // Menampilkan pesan kesalahan
        searchButton.style.display = "block"; // Menampilkan tombol "Cari Jawaban"
    });
                      }
