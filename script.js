/* =========================================================
   AMAN PORTFOLIO — Vanilla JavaScript
   Mobile nav, Intersection Observer, API mock and core engine.
   ========================================================= */
   // Refresh hone par hamesha page Top par rahega aur URL se # hat jayega
if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
    window.scrollTo(0, 0);
}
document.addEventListener("DOMContentLoaded",function(){
    const toggle=document.querySelector(".nav-toggle"),menu=document.querySelector(".nav-links");
    function closeMenu(){if(menu&&toggle){menu.classList.remove("open");toggle.setAttribute("aria-expanded","false")}}
    if(toggle&&menu){toggle.addEventListener("click",function(){const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));document.addEventListener("click",e=>{if(!e.target.closest(".nav"))closeMenu()})}
    const reveals=document.querySelectorAll(".reveal");
    if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("show");observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:"0px 0px -40px 0px"});reveals.forEach(el=>observer.observe(el))}else reveals.forEach(el=>el.classList.add("show"));
    
    const command=document.querySelector("#profile-command"),json=document.querySelector("#profile-json");
    const profile={name:"Aman",role:"Java Backend & Distributed Systems Developer",availability:true,focus:["Java","C","Spring Boot","Microservices","Distributed Systems"],security:["Spring Security","JWT","OAuth2"],data:["PostgreSQL","MySQL","Redis"],problemSolving:"DSA + LeetCode",status:"online"};
    const apiCommand="curl -X GET /api/v1/developer/profile";
    function escapeHTML(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}
    function highlight(obj){return escapeHTML(JSON.stringify(obj,null,2)).replace(/(&quot;.*?&quot;)(?=\s*:)/g,'<span class="json-key">$1</span>').replace(/(:\s*)(&quot;.*?&quot;)/g,'$1<span class="json-string">$2</span>').replace(/(:\s*)(true|false)/g,'$1<span class="json-boolean">$2</span>')}
    function type(el,text,speed){return new Promise(resolve=>{let i=0;(function next(){if(i>=text.length)return resolve();el.textContent+=text[i++];setTimeout(next,speed)})()})}
    async function runAPI(){if(!command||!json)return;command.textContent="";json.textContent="";await type(command,apiCommand,18);setTimeout(()=>json.innerHTML=highlight(profile),250)}
    if(command&&"IntersectionObserver" in window){const o=new IntersectionObserver(e=>{if(e[0].isIntersecting){runAPI();o.disconnect()}},{threshold:.3});o.observe(command)}else runAPI();
    
    const log=document.querySelector("#engine-log"),phase=document.querySelector("#phase"),restart=document.querySelector("#restart"),terminal=document.querySelector("#engine-terminal");
    const leetCodeStatus="ACTIVE / DSA TRACK"; // Replace with a real backend/API value later.
    const boot=[
    [220,"dim","Initializing AMAN CORE ENGINE..."],[380,"info","Spring Boot v3.x runtime detected"],[420,"ok","[OK] Spring Boot application context"],[420,"ok","[OK] Hibernate / JPA persistence layer"],[420,"ok","[OK] Microservices communication layer"],[420,"ok","[OK] Spring Security / OAuth2 / JWT"],[420,"ok","[OK] Redis caching subsystem"],[420,"ok","[OK] PostgreSQL / MySQL data connectors"],[520,"dim","Compiling low-level engineering modules..."],[470,"ok","[OK] Pointer Memory Management Mapping"],[470,"ok","[OK] Deep Recursion Stack Tracking"],[470,"ok","[OK] Array / Linked List / Tree traversal modules"],[470,"ok","[OK] C DSA problem-solving core"],[500,"accent","[DSA] LeetCode status → "+leetCodeStatus],[550,"info","CORE ENGINE READY — Java + C systems online"]];
    function line(type,text){const row=document.createElement("div"),time=document.createElement("span"),msg=document.createElement("span");row.className="log";time.className="time";msg.className=type;time.textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});msg.textContent=text;row.append(time,msg);return row}
    async function runEngine(){if(!log)return;log.innerHTML="";if(phase)phase.textContent="boot sequence";for(const item of boot){await new Promise(r=>setTimeout(r,item[0]));log.appendChild(line(item[1],item[2]));if(terminal)terminal.scrollTop=terminal.scrollHeight}if(phase)phase.textContent="system ready"}
    if(restart)restart.addEventListener("click",runEngine);if(terminal&&"IntersectionObserver" in window){const eo=new IntersectionObserver(e=>{if(e[0].isIntersecting){runEngine();eo.disconnect()}},{threshold:.25});eo.observe(terminal)}else runEngine();
    const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();

    /* =========================================================
       UPDATED ORBIT NODE CLICK EVENT FOR MOBILE DEVICES
       ========================================================= */
    const orbitNodes = document.querySelectorAll('.orbit em');
    orbitNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from propagating to document
            // Puraane active nodes ko remove karega
            orbitNodes.forEach(n => { if(n !== node) n.classList.remove('active'); });
            // Click wale par active class lagayega tooltip dikhane ke liye
            node.classList.toggle('active');
        });
    });
    // Bahar click karne par tooltips chup jayenge
    document.addEventListener('click', () => {
        orbitNodes.forEach(n => n.classList.remove('active'));
    });
});

/* =======================================
       SMOOTH SCROLL FIX (No URL Hash Jump)
       ======================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Default jump aur URL change ko rokta hai
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if(targetId === "") return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Header ki height (100px) minus karke smooth scroll karta hai
                window.scrollTo({
                    top: targetElement.offsetTop - 100, 
                    behavior: 'smooth'
                });
            }
        });
    });