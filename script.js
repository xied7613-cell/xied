document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Adjust for fixed navbar height
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Modal Logic
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-btn');

    modalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // Yanggu Mascot 'Gomi' (고미) Interactions
    // ==========================================
    const mascotContainer = document.getElementById('floating-mascot-container');
    const mascotAvatar = document.getElementById('mascot-avatar');
    const mascotBubble = document.getElementById('mascot-bubble');
    const gomiModal = document.getElementById('gomi-guide-modal');
    const gomiModalClose = document.getElementById('gomi-modal-close');
    const gomiDisplayText = document.getElementById('gomi-display-text');
    const gomiBtnRecommend = document.getElementById('gomi-btn-recommend');
    const gomiBtnTmi = document.getElementById('gomi-btn-tmi');
    const gomiRecResult = document.getElementById('gomi-recommend-result');

    // 1. Show Speech Bubble after 2 seconds
    setTimeout(() => {
        if (mascotBubble) mascotBubble.classList.add('show');
    }, 2000);

    // Hide bubble after 10 seconds automatically
    let bubbleTimeout = setTimeout(() => {
        if (mascotBubble) {
            mascotBubble.classList.remove('show');
        }
    }, 12000);

    if (mascotAvatar) {
        mascotAvatar.addEventListener('mouseenter', () => {
            if (mascotBubble) mascotBubble.classList.add('show');
            clearTimeout(bubbleTimeout);
        });

        // 2. Open Gomi Guide Modal on Clicking Mascot
        mascotAvatar.addEventListener('click', () => {
            if (gomiModal) {
                gomiModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                if (mascotBubble) mascotBubble.classList.remove('show');
                
                // Set initial welcoming text
                gomiDisplayText.innerHTML = "안녕! 난 곰취 모자를 쓴 <strong>고미(Gomi)</strong>야! 🐻💚<br>깨끗한 양구에 온 걸 온몸으로 환영해! 궁금한 게 있다면 아래 버튼을 눌러줘!";
                gomiRecResult.style.display = 'none';
            }
        });
    }

    // Close Gomi Modal
    if (gomiModalClose) {
        gomiModalClose.addEventListener('click', () => {
            gomiModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // 3. Fun Yanggu & Gomchwi TMI Facts list
    const gomiTmiFacts = [
        "🐻 <strong>'곰취'라는 이름의 유래:</strong> 옛날에 겨울잠에서 깬 곰이 기운을 차리기 위해 가장 먼저 찾아 먹는 나물이라고 해서 '곰취'라는 이름이 생겼어! 나도 그래서 이 잎을 모자로 쓰고 다녀!",
        "💚 <strong>양구 곰취의 특별한 점:</strong> 양구 곰취는 서늘하고 맑은 고산지대에서 자라나 향이 아주 짙고 잎이 연해! 쌈 싸 먹거나 장아찌로 먹으면 정말 꿀맛이지!",
        "🧭 <strong>국토의 정중앙 양구:</strong> 양구는 우리나라(한반도와 부속도서)를 모두 포함했을 때 정중앙에 위치한 <strong>'국토정중앙'</strong>이야! 그래서 국토정중앙천문대도 양구에 있지!",
        "🌳 <strong>DMZ 원시 자연:</strong> 두타연은 무려 50년 넘게 민간인 출입이 통제되어서 우리나라에서 가장 때 묻지 않은 맑은 물과 숲길이 그대로 보존되어 있어. 천연기념물 열목어도 만날 수 있단다!",
        "🎨 <strong>예술의 고향 양구:</strong> 한국 현대미술의 거장 박수근 화백의 고향이 바로 양구야. 박수근미술관에 가면 자연 속에 파묻힌 건축물과 그의 따뜻하고 질감 넘치는 원화들을 감상할 수 있어!",
        "🏝️ <strong>물 위의 한반도섬:</strong> 파로호에 둥둥 떠 있는 한반도섬은 우리나라 최대 규모의 인공습지야. 산책로를 걷다 보면 백두산, 한라산 지형 모형도 볼 수 있고 시원한 호수 바람도 맞을 수 있어!"
    ];

    let lastTmiIndex = -1;
    if (gomiBtnTmi) {
        gomiBtnTmi.addEventListener('click', () => {
            let randIndex;
            // Make sure we get a different fact every consecutive click
            do {
                randIndex = Math.floor(Math.random() * gomiTmiFacts.length);
            } while (randIndex === lastTmiIndex);
            
            lastTmiIndex = randIndex;
            gomiDisplayText.style.opacity = 0.5;
            setTimeout(() => {
                gomiDisplayText.innerHTML = gomiTmiFacts[randIndex];
                gomiDisplayText.style.opacity = 1;
            }, 100);
            gomiRecResult.style.display = 'none';
        });
    }

    // 4. Random Travel Destination Recommendation
    const destinations = [
        {
            name: "한반도섬",
            id: "hanbando-modal",
            cardIndex: 0,
            tag: "자연/습지",
            desc: "국내 최대의 인공습지이자 파로호 위의 랜드마크! 백두산에서 한라산까지 한눈에 걸어보자! 🏝️"
        },
        {
            name: "두타연",
            id: "dutayeon-modal",
            cardIndex: 1,
            tag: "생태/안보",
            desc: "반세기 넘게 비경을 숨겨온 민통선 내 생태계의 보고! 시원한 원시 폭포와 맑은 물소리를 느껴봐! 🏞️"
        },
        {
            name: "박수근미술관",
            id: "museum-modal",
            cardIndex: 2,
            tag: "문화/미술",
            desc: "가장 한국적인 화가 박수근의 고향 생가 터에 지어진 미술관. 고요하고 감성적인 정취가 일품이야! 🎨"
        },
        {
            name: "국토정중앙천문대",
            id: "observatory-modal",
            cardIndex: 3,
            tag: "천문/힐링",
            desc: "우리나라 국토 정중앙에서 밤하늘의 쏟아지는 은하수와 별빛을 80cm 대형 망원경으로 직접 만나봐! 🌌"
        },
        {
            name: "소양강 꼬부랑길 플리마켓",
            id: "kkoburang-modal",
            cardIndex: 4,
            tag: "축제/드라이브",
            desc: "소양호의 환상적인 단풍길을 드라이브하고 감성 마켓에서 아기자기한 지역 특산품도 구경해보자! 🚗"
        }
    ];

    let lastDestIndex = -1;
    if (gomiBtnRecommend) {
        gomiBtnRecommend.addEventListener('click', () => {
            let randIndex;
            do {
                randIndex = Math.floor(Math.random() * destinations.length);
            } while (randIndex === lastDestIndex);

            lastDestIndex = randIndex;
            const dest = destinations[randIndex];

            // Display recommendation result
            gomiDisplayText.innerHTML = `🎲 고미가 엄선한 오늘의 양구 명소는... <strong>[${dest.name}]</strong>이야! 정말 멋진 곳이지!`;
            
            gomiRecResult.innerHTML = `
                <div class="rec-card-header">${dest.tag}</div>
                <div class="rec-card-title">${dest.name}</div>
                <div class="rec-card-desc">${dest.desc}</div>
                <button class="rec-card-btn" id="gomi-go-to-dest">지도로 이동 및 하이라이트 🗺️ &rarr;</button>
            `;
            gomiRecResult.style.display = 'block';

            // Add handler to navigate to destination on homepage
            const goToBtn = document.getElementById('gomi-go-to-dest');
            if (goToBtn) {
                goToBtn.addEventListener('click', () => {
                    // Close modal
                    gomiModal.classList.remove('show');
                    document.body.style.overflow = '';

                    // Find all cards
                    const cards = document.querySelectorAll('.grid-container .card');
                    const targetCard = cards[dest.cardIndex];
                    
                    if (targetCard) {
                        // Scroll to target card smoothly
                        const navHeight = navbar.offsetHeight;
                        const targetPosition = targetCard.getBoundingClientRect().top + window.scrollY - navHeight - 40;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Highlight animation
                        targetCard.classList.add('highlight-glow');
                        setTimeout(() => {
                            targetCard.classList.remove('highlight-glow');
                        }, 4500);
                    }
                });
            }
        });
    }
});
