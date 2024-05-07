function getAnswer() {
    var question = document.getElementById("question").value;
    const answerElement = document.getElementById("answer");
    const backButton = document.getElementById("backButton");

    answerElement.innerText = ''; // Mengosongkan konten jawaban sebelum mengetik jawaban baru

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
            answerElement.classList.add('show'); // Menambahkan kelas show untuk menampilkan jawaban dengan efek transisi
            // Memunculkan tombol "Kembali"
            backButton.style.display = "block";
        } else {
            answerElement.innerText = "Maaf, permintaan Anda tentang pertanyaan tersebut tidak dapat kami jawab.";
            // Menyembunyikan tombol "Kembali" jika jawaban tidak tersedia
            backButton.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function resetAnswer() {
    const answerElement = document.getElementById("answer");
    answerElement.classList.remove('show'); // Menghapus kelas show untuk menyembunyikan jawaban dengan efek transisi
    setTimeout(() => {
        answerElement.innerText = ''; // Menghapus jawaban yang telah ditampilkan setelah efek transisi selesai
    }, 0.5); // Menunggu 500 milidetik sebelum menghapus jawaban
    document.getElementById("backButton").style.display = "none"; // Menyembunyikan tombol "Kembali"
}
