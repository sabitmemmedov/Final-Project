window.onload = function(e) {
    e.preventDefault();

    // Form elemanını seç
    var form = document.querySelector("form");

    // Formun gönderilme olayını dinle
    form.addEventListener("submit", async function(event) {
        // Formun otomatik olarak gönderilmesini engelle
        event.preventDefault();

        // Form elemanlarındaki değerleri al
        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var message = document.getElementById("msg").value;

        // Tüm form elemanlarının doldurulup doldurulmadığını kontrol et
        if (email.trim() === "" || name.trim() === "" || surname.trim() === "" || message.trim() === "") {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        // ID oluşturmak için getRandomInteger fonksiyonunu kullan
        var id = getRandomInteger(1, 1000);

        // POST isteği için veri objesi oluştur
        var postData = {
            id: id.toString(),
            email: email,
            name: name,
            surname: surname,
            message: message
        };

        try {
            // POST isteği gönder
            var response = await axios.post("http://localhost:3000/contact", postData);

            // API yanıtını kontrol et
            if (response.status === 200) {
                alert("Mesaj başarıyla gönderildi.");
                // Formu sıfırla
                form.reset();
            } else {
                throw new Error("Mesaj gönderilirken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Hata:", error);
        }
    });
};

// Rastgele tam sayı üretmek için fonksiyon
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
