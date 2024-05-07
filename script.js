function typeWriter(text, element, delay = 50) {
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, delay);
}

async function getAnswer() {
    var question = document.getElementById("question").value;
    const answerElement = document.getElementById("answer");
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
            // Memulai efek mengetik untuk jawaban
            typeWriter(data.result, answerElement);
        } else {
            answerElement.innerText = "Maaf, permintaan Anda tentang pertanyaan tersebut tidak dapat kami jawab.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
