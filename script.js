/* =========================================================
   AMAN PORTFOLIO — Vanilla JavaScript (Optimized & Bug-Free)
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Mobile Menu Toggle Logic
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-links");

    function closeMenu() {
        if (menu && toggle) {
            menu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    }

    if (toggle && menu) {
        toggle.addEventListener("click", function() {
            const open = menu.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(open));
        });
        menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
        document.addEventListener("click", e => {
            if (!e.target.closest(".nav")) closeMenu();
        });
    }

    // 2. Intersection Observer for Scroll Reveals
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
        reveals.forEach(el => observer.observe(el));
    } else {
        reveals.forEach(el => el.classList.add("show"));
    }

    // 3. API Profile Simulation (Mock Data)
    const command = document.querySelector("#profile-command");
    const json = document.querySelector("#profile-json");
    const profile = {
        name: "Aman",
        role: "Java Backend & Distributed Systems Developer",
        availability: true,
        focus: ["Java", "C", "Spring Boot", "Microservices", "Distributed Systems"],
        security: ["Spring Security", "JWT", "OAuth2"],
        data: ["PostgreSQL", "MySQL", "Redis"],
        problemSolving: "DSA + LeetCode",
        status: "online"
    };
    const apiCommand = "curl -X GET /api/v1/developer/profile";

    function escapeHTML(v) {
        return String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
    }

    function highlight(obj) {
        return escapeHTML(JSON.stringify(obj, null, 2))
            .replace(/(&quot;.*?&quot;)(?=\s*:)/g, '<span class="json-key">$1</span>')
            .replace(/(:\s*)(&quot;.*?&quot;)/g, '$1<span class="json-string">$2</span>')
            .replace(/(:\s*)(true|false)/g, '$1<span class="json-boolean">$2</span>');
    }

    function type(el, text, speed) {
        return new Promise(resolve => {
            let i = 0;
            (function next() {
                if (i >= text.length) return resolve();
                el.textContent += text[i++];
                setTimeout(next, speed);
            })();
        });
    }

    async function runAPI() {
        if (!command || !json) return;
        command.textContent = "";
        json.textContent = "";
        await type(command, apiCommand, 15);
        setTimeout(() => json.innerHTML = highlight(profile), 150);
    }

    if (command && "IntersectionObserver" in window) {
        const o = new IntersectionObserver(e => {
            if (e[0].isIntersecting) {
                runAPI();
                o.disconnect();
            }
        }, { threshold: 0.2 });
        o.observe(command);
    } else {
        runAPI();
    }

    // 4. Engine Terminal Logs Sequence
    const log = document.querySelector("#engine-log");
    const phase = document.querySelector("#phase");
    const restart = document.querySelector("#restart");
    const terminal = document.querySelector("#engine-terminal");
    const leetCodeStatus = "ACTIVE / DSA TRACK";
    const boot = [
        [150, "dim", "Initializing AMAN CORE ENGINE..."],
        [250, "info", "Spring Boot v3.x runtime detected"],
        [300, "ok", "[OK] Spring Boot application context"],
        [300, "ok", "[OK] Hibernate / JPA persistence layer"],
        [300, "ok", "[OK] Microservices communication layer"],
        [300, "ok", "[OK] Spring Security / OAuth2 / JWT"],
        [300, "ok", "[OK] Redis caching subsystem"],
        [300, "ok", "[OK] PostgreSQL / MySQL data connectors"],
        [350, "dim", "Compiling low-level engineering modules..."],
        [300, "ok", "[OK] Pointer Memory Management Mapping"],
        [300, "ok", "[OK] Deep Recursion Stack Tracking"],
        [300, "ok", "[OK] Array / Linked List / Tree traversal modules"],
        [300, "ok", "[OK] C DSA problem-solving core"],
        [350, "accent", "[DSA] LeetCode status → " + leetCodeStatus],
        [400, "info", "CORE ENGINE READY — Java + C systems online"]
    ];

    function line(typeClass, text) {
        const row = document.createElement("div");
        const time = document.createElement("span");
        const msg = document.createElement("span");
        row.className = "log";
        time.className = "time";
        msg.className = typeClass;
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        msg.textContent = text;
        row.append(time, msg);
        return row;
    }

    async function runEngine() {
        if (!log) return;
        log.innerHTML = "";
        if (phase) phase.textContent = "boot sequence";
        for (const item of boot) {
            await new Promise(r => setTimeout(r, item[0]));
            log.appendChild(line(item[1], item[2]));
            if (terminal) terminal.scrollTop = terminal.scrollHeight;
        }
        if (phase) phase.textContent = "system ready";
    }

    if (restart) restart.addEventListener("click", runEngine);
    if (terminal && "IntersectionObserver" in window) {
        const eo = new IntersectionObserver(e => {
            if (e[0].isIntersecting) {
                runEngine();
                eo.disconnect();
            }
        }, { threshold: 0.2 });
        eo.observe(terminal);
    } else {
        runEngine();
    }

    const year = document.querySelector("#year");
    if (year) year.textContent = new Date().getFullYear();

    // 5. Accessible Orbit Node Tooltips
    const orbitNodes = document.querySelectorAll('.orbit em');
    orbitNodes.forEach(node => {
        const toggleTooltip = (e) => {
            e.stopPropagation();
            orbitNodes.forEach(n => { if (n !== node) n.classList.remove('active'); });
            node.classList.toggle('active');
        };
        node.addEventListener('click', toggleTooltip);
        node.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTooltip(e);
            }
        });
    });
    
    document.addEventListener('click', () => {
        orbitNodes.forEach(n => n.classList.remove('active'));
    });

    // 6. Smooth Scroll Handler for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. GITHUB BUTTON CLICK-GLOW EFFECT
    document.querySelectorAll('.cmd-link').forEach(link => {
        link.addEventListener('click', function() {
            this.classList.add('active-glow');
            setTimeout(() => this.classList.remove('active-glow'), 300);
        });
    });

    // 8. SYSTEM FEEDBACK MODULE (GLOBAL LIKES VIA FREE API)
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    const likeMsg = document.getElementById('like-msg');
    
    if (likeBtn) {
        let hasLiked = localStorage.getItem('aman_sys_liked') === 'true';
        
        // 1. Fetch Initial Global Pings
        fetch('https://api.counterapi.dev/v1/aman-dev-portfolio/pings')
            .then(res => res.json())
            .then(data => {
                likeCount.textContent = data.count || 0;
            }).catch(() => {
                likeCount.textContent = "ERR";
            });

        if (hasLiked) {
            likeBtn.classList.add('liked');
            likeMsg.textContent = "[ OK ] Ping verified in global cache.";
            likeMsg.style.color = "var(--green)";
        }

        // 2. Transmit Global Ping on Click
        likeBtn.addEventListener('click', () => {
            if (!hasLiked) {
                hasLiked = true;
                localStorage.setItem('aman_sys_liked', 'true');
                likeBtn.classList.add('liked');
                likeMsg.textContent = "[ TRANSMITTING ] Sending global pulse...";
                likeMsg.style.color = "var(--green-soft)";
                
                // Temporary instant update for UI feel
                likeCount.textContent = parseInt(likeCount.textContent || 0) + 1;

                fetch('https://api.counterapi.dev/v1/aman-dev-portfolio/pings/up')
                    .then(res => res.json())
                    .then(data => {
                        likeCount.textContent = data.count;
                        likeMsg.textContent = "[ OK ] Global Ping registered securely.";
                        likeMsg.style.color = "var(--green)";
                    }).catch(() => {
                        likeMsg.textContent = "[ WARN ] Global sync timeout.";
                        likeMsg.style.color = "#eab308";
                    });
            } else {
                likeMsg.textContent = "[ WARN ] Duplicate ping rejected.";
                likeMsg.style.color = "#eab308";
            }
        });
    }

    // Comment logic removed, Giscus will handle it directly via HTML iframe.
});