    document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan davranışını engelle

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Burada gerekli doğrulamaları yapabilirsiniz
    // ...

    // Yönlendirme yapılacak URL
    const redirectUrl = 'dashboard.html';

    // Formu sunucuya göndermek için fetch API kullanma
    fetch('http://localhost:login/in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
    })
        .then(response => {
            if (response.ok) {
                window.location.href = redirectUrl; // Başarılıysa yönlendir
            } else {
                console.error('Giriş başarısız');
            }
        })
        .catch(error => {
            console.error('Hata:', error);
        });
});

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Formun varsayılan davranışını engelle

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const registrationData = {
            username: username,
            password: password
        };

        fetch('http://localhost/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Kayıt başarılı');
                    // Burada başarılı kayıt durumunda yapılacak işlemleri gerçekleştirebilirsiniz
                } else {
                    console.error('Kayıt başarısız');
                }
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    });