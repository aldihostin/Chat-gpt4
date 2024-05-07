function getAnswer() {
    var question = document.getElementById("question").value;
    fetch('https://aemt.me/gemini?text=' + encodeURIComponent(question.trim()))
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status) {
            document.getElementById("answer").innerText = data.result;
        } else {
            document.getElementById("answer").innerText = "Maaf, permintaan Anda tentang pertanyaan tersebut tidak dapat kami jawab.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
