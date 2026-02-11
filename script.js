const app = document.getElementById('app');

if (!localStorage.getItem('lafufuDisclaimerAccepted')){
    showDisclaimerPage();
}else{
    const loggedInUser = localStorage.getItem('lafufuLoggedInUser');
    if (loggedInUser){
        showStartPage();
    }else{
        showAuthLandingPage();
    }
}

function setupMenuDropdown(){
    const menuBubble = document.getElementById('menuBubble');
    const menuDropdown = document.getElementById('menuDropdown');
    if (!menuBubble || !menuDropdown) return;
    menuBubble.onclick = function(e){
        e.stopPropagation();
        menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'flex' : 'none';
    };

    document.addEventListener('click', function hideMenu(e){
        if (!menuBubble.contains(e.target) && !menuDropdown.contains(e.target)) {
            menuDropdown.style.display = 'none';
        }
    });

    menuDropdown.onclick = e => e.stopPropagation();

    document.getElementById('menuCollection').onclick = function(){
        menuDropdown.style.display = 'none';
        showCollectionPage();
    };
    document.getElementById('menuLogout').onclick = function(){
        localStorage.removeItem('lafufuLoggedInUser');
        menuDropdown.style.display = 'none';
        showAuthLandingPage();
    };
    document.getElementById('menuPet').onclick = function(){
        menuDropdown.style.display = 'none';
        alert('Pet minigame coming soon!');
    };
}

function setupLogoShake(){
    const miniLogo = document.querySelector('.menu-mini-logo');
    if (miniLogo){
        miniLogo.onclick = () => {
            miniLogo.classList.remove('shake');
            void miniLogo.offsetWidth;
            miniLogo.classList.add('shake');
            setTimeout(() => miniLogo.classList.remove('shake'), 500);
        };
    }
    const bigLogo = document.querySelector('.lafufu-logo-img');
    if (bigLogo){
        bigLogo.onclick = () => {
            bigLogo.classList.remove('shake');
            void bigLogo.offsetWidth;
            bigLogo.classList.add('shake');
            setTimeout(() => bigLogo.classList.remove('shake'), 500);
        };
    }
}

function showStartPage(){
    app.innerHTML = `
        <div class="cloud-container">
            <button class="cloud-btn" id="unbox-btn">UNBOX YOUR LABUBU</button>
        </div>
    `;
    setupMenuDropdown();
    setupLogoShake();
    document.getElementById('unbox-btn').onclick = showBoxSelectionPage;
}

function showAuthError(msg){
    let err = document.getElementById('authError');
    if (!err){
        err = document.createElement('div');
        err.idd = 'authError';
        err.style.color = '#de49a7';
        err.style.fontWeight = 'bold';
        err.style.textAlign = 'center';
        err.style.margin = '10px 0 0 0';
        document.querySelector('.auth-form').appendChild(err);
    }
    err.textContent = msg;
}

function showBoxSelectionPage() {
    app.innerHTML = `
        <div class="box-select-container">
            <h2>Pick a Labubu Box!</h2>
            <div class="box-options">
                <img src="./labubu/big_into_energy.jpg" alt="Big into Energy" class="box-option" data-series="big_into_energy">
                <img src="./labubu/macaron_box.jpg" alt="Exciting Macarons" class="box-option" data-series="exciting_macarons">
                <img src="./labubu/have_a_seat.jpg" alt="Have a Seat" class="box-option" data-series="have_a_seat">
            </div>
        </div>
    `;

    setupMenuDropdown();
    setupLogoShake();

    document.querySelectorAll('.box-option').forEach(box => {
        box.addEventListener('click', function(){
            const selectedSeries = this.dataset.series;

            showOpenBoxPage(selectedSeries);
        });
    });
}

function showOpenBoxPage(series){
    let img, boxName;
    if (series === "have_a_seat"){
        img = "./labubu/have_a_seat.jpg";
        boxName = "Have a Seat";
    } else if (series === "exciting_macarons"){
        img = "./labubu/macaron_box.jpg";
        boxName = "Exciting Macarons";
    } else if (series === "big_into_energy"){
        img = "./labubu/big_into_energy.jpg";
        boxName = "Big into Energy";
    }

    app.innerHTML = `
        <button class="corner-btn pick-another-btn" id="pickAnotherBtn">🧸 Back to boxes!🌈</button>
        <div class="centered-box-page">
            <div class="open-box-container">
                <img src="${img}" alt="${boxName}" class="open-box-img" id="openBoxImg">
                <p class="tap-msg">Tap to open your <b>${boxName}</b> box!</p>
                <p class="open-progress" id="openProgress">(0/10)</p>
            </div>
        </div>
    `;

    document.getElementById('pickAnotherBtn').onclick = showBoxSelectionPage;

    setupMenuDropdown();
    setupLogoShake();

    let clickCount = 0;
    const boxImg = document.getElementById('openBoxImg');
    const openProgress = document.getElementById('openProgress');

    boxImg.addEventListener('click', function(){
        if (clickCount >= 10) return;
        clickCount++;
        if (clickCount === 1){
            const btn = document.getElementById('pickAnotherBtn');
            if (btn) {
                btn.style.animation = 'bubble-pop 0.32s cubic-bezier(.62,1.8,.5,1.1)';
                btn.style.pointerEvents = 'none';
                setTimeout(() => btn.remove(), 280);
            }
        }
        boxImg.classList.add('shake');

        setTimeout(() => {
            boxImg.classList.remove('shake');
        }, 180);

        //openProgress.textContent = `(${clickCount}/10)`;

        if (clickCount === 10){
            setTimeout(() => revealLabubu(series), 400);
        }
    });
}

function revealLabubu(series){
    setupMenuDropdown();
    const labubus = {
        "have_a_seat": [
            "./labubu/have_a_seat_1.png",
            "./labubu/have_a_seat_2.png",
            "./labubu/have_a_seat_3.png",
            "./labubu/have_a_seat_4.png",
            "./labubu/have_a_seat_5.png",
            "./labubu/have_a_seat_6.png",
            "./labubu/have_a_seat_7.png",
        ],
        "exciting_macarons": [
            "./labubu/exciting_macarons_1.png",
            "./labubu/exciting_macarons_2.png",
            "./labubu/exciting_macarons_3.png",
            "./labubu/exciting_macarons_4.png",
            "./labubu/exciting_macarons_5.png",
            "./labubu/exciting_macarons_6.png",
            "./labubu/exciting_macarons_7.png",
        ],
        "big_into_energy": [
            "./labubu/big_into_energy_1.png",
            "./labubu/big_into_energy_2.png",
            "./labubu/big_into_energy_3.png",
            "./labubu/big_into_energy_4.png",
            "./labubu/big_into_energy_5.png",
            "./labubu/big_into_energy_6.png",
            "./labubu/big_into_energy_7.png",
        ]
    };

    const labubuList = labubus[series];
    const randomIdx = Math.floor(Math.random() * labubuList.length);
    const randomLabubu = labubuList[randomIdx];

    const boxImg = document.getElementById('openBoxImg');

    const sparkleCount = 300;
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    boxImg.parentNode.insertBefore(sparkleContainer, boxImg);

    const baseX = 130;
    const baseY = 200;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const angle = Math.random() * 2 * Math.PI;
        const radius = 40 + Math.random() * 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        sparkle.style.setProperty('--x', `${x}px`);
        sparkle.style.setProperty('--y', `${y}px`);
        const size = 3 + Math.random() * 4;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkleContainer.appendChild(sparkle);
    }

    boxImg.classList.add('explode');

    setTimeout(() => {
        boxImg.src = randomLabubu;
        boxImg.alt = "Labubu";
        markCollected(series, randomIdx);
        boxImg.classList.remove('explode');
        boxImg.classList.add('labubu-reveal');

        boxImg.style.cursor = "default";
        boxImg.onclick = null;

        document.querySelector('.tap-msg').style.display = "none";
        document.querySelector('.open-progress').style.display = "none";

        const sparkleContainer = document.querySelector('.sparkle-container');
        if (sparkleContainer) sparkleContainer.remove();

        setTimeout(() => {
            const container = document.querySelector('.open-box-container');
            const btn = document.createElement('button');
            btn.textContent = "Unbox another one!";
            btn.className = "cloud-btn";
            btn.style.marginTop = "40px";
            btn.onclick = showBoxSelectionPage;
            container.appendChild(btn);
        }, 2000);
    }, 600);
}

document.body.addEventListener('click', function(e){
    if (e.target && e.target.id === 'collectionBtn'){
        showCollectionPage();
    }
});

function showCollectionPage(){
    setupMenuDropdown();
    const allCollections = JSON.parse(localStorage.getItem('lafufuCollections') || '{}');
    const email = localStorage.getItem('lafufuLoggedInUser');
    const collected = allCollections[email] || {};
    const series = [
        {key: 'big_into_energy', label: 'Big Into Energy'},
        {key: 'have_a_seat', label: 'Have a Seat'},
        {key: 'exciting_macarons', label: 'Exciting Macarons'}
    ];

    let html = `
        <div class="collection-page">
            <div class="cloud-btn back-btn" id="backBtn">BACK</div>
            <div class="collection-columns">
    `;

    for (const s of series){
        html += `<div class="collection-column"><h2>${s.label}</h2>`;
        html += `<div class="collection-slots-grid">`;
        for (let i = 0; i < 7; i++){
            const isCollected = collected[s.key] && collected[s.key][i];
            if (isCollected){
                html += `<img src="./labubu/${s.key}_${i+1}.png" class="collection-labubu">`;
            }else{
                html += `<img src="./labubu/cut_${s.key}.png" class="collection-labubu shadow">`;
            }
        }
        html += `</div></div>`;
    }

    html += `</div></div>`;
    document.getElementById('app').innerHTML = html;

    document.getElementById('backBtn').onclick = showBoxSelectionPage;
}

function markCollected(series, idx){
    let allCollections = JSON.parse(localStorage.getItem('lafufuCollections') || {});
    const email = localStorage.getItem('lafufuLoggedInUser');
    if (!allCollections[email]) allCollections[email] = {};
    let collection = allCollections[email];
    if (!collection[series]) collection[series] = [false, false, false, false, false, false, false];
    collection[series][idx] = true;
    allCollections[email] = collection;
    localStorage.setItem('lafufuCollections', JSON.stringify(allCollections));
}

function showAuthLandingPage() {
    document.getElementById('app').innerHTML = `
        <div class="home-page lowered">
            <img src="./labubu/lafufu_logo.png" class="lafufu-logo-img" alt="Lafufu logo">
            <div class="lafufu-logo-title">LAFUFU</div>
            <button class="cloud-btn auth-btn" id="loginBtn">LOG IN</button>
            <button class="cloud-btn auth-btn" id="registerBtn">REGISTER</button>
        </div>
    `;
    setupLogoShake();

    document.getElementById('loginBtn').onclick = () => showAuthForm('login');
    document.getElementById('registerBtn').onclick = () => showAuthForm('register');
}

function showAuthForm(mode = 'login') {
    const isLogin = mode === 'login';
    document.getElementById('app').innerHTML = `
        <div class="auth-page">
            <img src="./labubu/lafufu_logo.png" class="lafufu-logo-img" alt="Lafufu logo">
            <div class="lafufu-logo-title">LAFUFU</div>
            <form class="auth-form">
                <input class="bubble-input" type="email" id="authEmail" placeholder="Email" required>
                <input class="bubble-input" type="password" id="authPass" placeholder="Password" required>
                ${!isLogin ? `<input class="bubble-input" type="password" id="authPassRepeat" placeholder="Repeat Password" required>` : ""}
                <div id="authError" class="auth-error"></div>
                <button type="submit" class="cloud-btn auth-btn">${isLogin ? 'LOG IN' : 'REGISTER'}</button>
            </form>
            <button class="mini-cloud-btn" id="switchAuthBtn">
                ${isLogin ? 'No account? Register' : 'Already registered? Log in'}
            </button>
        </div>
    `;
    setupLogoShake();

    document.getElementById('switchAuthBtn').onclick = () =>
        showAuthForm(isLogin ? 'register' : 'login');

    document.querySelector('.auth-form').onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value.trim();
        const pass = document.getElementById('authPass').value.trim();
        let passRepeat = pass;
        let users = {};
        try {
            users = JSON.parse(localStorage.getItem('lafufuUsers') || '{}');
        } catch (e) {
            users = {};
        }

        if (!isLogin) {
            passRepeat = document.getElementById('authPassRepeat').value.trim();
            if (pass !== passRepeat) {
                document.getElementById('authError').textContent = "Passwords do not match!";
                return;
            }

            if (users[email]) {
                document.getElementById('authError').textContent = "User already exists!";
                return;
            }

            users[email] = { password: pass };
            localStorage.setItem('lafufuUsers', JSON.stringify(users));
            localStorage.setItem('lafufuLoggedInUser', email);

            let allCollections = {};
            try {
                allCollections = JSON.parse(localStorage.getItem('lafufuCollections') || '{}');
            } catch (e) {
                allCollections = {};
            }
            allCollections[email] = {};
            localStorage.setItem('lafufuCollections', JSON.stringify(allCollections));

            showBoxSelectionPage();
        } else {
            if (!users[email] || users[email].password !== pass) {
                document.getElementById('authError').textContent = "Invalid email or password!";
                return;
            }
            localStorage.setItem('lafufuLoggedInUser', email);
            showBoxSelectionPage();
        }
    }
}

function showDisclaimerPage () {
    app.innerHTML = `
        <div class="disclaimer-page">
            <div class="disclaimer-content">
                <div class="disclaimer-title">DISCLAIMER</div>
                <div class="disclaimer-msg">
                    This site is a <b>fan-made project</b> inspired by POP MART collectibles.<br><br>
                    It is <b>not affiliated with, endorsed, or sponsored by POP MART</b> or its partners in any way.<br>
                    All product names, images, and brands belong to their respective owners.<br><br>
                    By clicking Proceed, you acknowledge this is an unofficial, for-fun experience.
                </div>
                <button class="cloud-btn disclaimer-proceed-btn" id="disclaimerProceedBtn">
                    Proceed
                </button>
            </div>
        </div>
    `;
    setupLogoShake();
    document.getElementById('disclaimerProceedBtn').onclick = () => {
        localStorage.setItem('lafufuDisclaimerAccepted', '1');
        location.reload();
    };
}

//showAuthLandingPage(); //uvek zadnja linija