

/* ===== ছবি বসানোর জায়গা =====
   HERO_IMG: পুরো টিমের ছবি, যেমন "images/team.jpg" (কোনো ডার্ক ওভারলে নেই, ছবি পরিষ্কার দেখাবে)
   photos: প্রতিটি অ্যালবামে গ্রুপ ছবির পাথ দিন, সর্বোচ্চ ১৫টি। ফাঁকা থাকলে প্লেসহোল্ডার দেখাবে। */
const HERO_IMG = "images/teams.jpg";
const MAX = 15;
const albums = [
    { id: "v1", name: "GDFA V1 Program", hue: 38, photos: [
        "images/event-photos/webp/DSC02211.webp",
        "images/event-photos/webp/DSC02287.webp",
        "images/event-photos/webp/DSC02306.webp",
        "images/event-photos/webp/DSC02561.webp",
        "images/event-photos/webp/DSC02613.webp",
        "images/event-photos/webp/DSC02641.webp",
        "images/event-photos/webp/DSC02778.webp",
        "images/event-photos/webp/DSC05657.webp",
        "images/event-photos/webp/DSC05691.webp",
        "images/event-photos/webp/DSC02270.webp",
        "images/event-photos/webp/DSC05764.webp",
        "images/event-photos/webp/DSC05794.webp",
        "images/event-photos/webp/DSC05814.webp",
        "images/event-photos/webp/DSC05849.webp",
        "images/event-photos/webp/DSC05934.webp"
    ] },
    { id: "iftar", name: "Iftar Event", hue: 24, photos: [
        "images/ifter-photos/webp/IMG_1630.webp",
        "images/ifter-photos/webp/IMG_1631.webp",
        "images/ifter-photos/webp/IMG_1635.webp",
        "images/ifter-photos/webp/IMG_1636.webp",
        "images/ifter-photos/webp/IMG_1637.webp",
        "images/ifter-photos/webp/IMG_1638.webp",
        "images/ifter-photos/webp/IMG_1643.webp",
        "images/ifter-photos/webp/IMG_1644.webp",
        "images/ifter-photos/webp/IMG_1651.webp"
    ] },
    { id: "tea", name: "Tea &amp; Coffee Meetups", hue: 18, photos: [
        "images/coffie-adda-photos/webp/IMG_2099.webp",
        "images/coffie-adda-photos/webp/IMG_2112.webp",
        "images/coffie-adda-photos/webp/IMG_2119.webp",
        "images/coffie-adda-photos/webp/IMG_2139.webp",
        "images/coffie-adda-photos/webp/IMG_2164.webp",
        "images/coffie-adda-photos/webp/IMG_2174.webp",
        "images/coffie-adda-photos/webp/IMG_4434.webp",
        "images/coffie-adda-photos/webp/IMG_4436.webp",
        "images/coffie-adda-photos/webp/IMG_4437.webp"
    ] },
    // { id: "cricket", name: "GDFA Cricket", hue: 140, photos: [] },
    // { id: "badminton", name: "GDFA Badminton", hue: 200, photos: [] }
];
const ratios = [[4, 5], [1, 1], [4, 3], [3, 4], [16, 10], [1, 1], [4, 5], [3, 2]];
const $ = s => document.querySelector(s), main = $("#main"), pills = $("#pills");
let cur = [], idx = 0;
/* hero photo + 3D tilt */
const frame = $("#frame");
if (HERO_IMG) { $("#hph").remove(); const im = new Image(); im.src = HERO_IMG; im.alt = "GDFA team"; frame.prepend(im) }
$("#hero").addEventListener("pointermove", e => {
    const r = frame.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    frame.style.setProperty("--ty", (x * 7).toFixed(2) + "deg"); frame.style.setProperty("--tx", (-y * 5).toFixed(2) + "deg"); frame.style.setProperty("--px", x.toFixed(2)); frame.style.setProperty("--py", y.toFixed(2))
});
$("#hero").addEventListener("pointerleave", () => ["--ty", "--tx", "--px", "--py"].forEach(p => frame.style.removeProperty(p)));
/* albums */
albums.forEach(a => {
    const n = a.photos.length || 12, list = Array.from({ length: Math.min(n, MAX) }, (_, i) => a.photos[i] || null);
    a.list = list;
    pills.insertAdjacentHTML("beforeend", `<button class="pill" data-id="${a.id}">${a.name}</button>`);
    const s = document.createElement("section"); s.className = "album"; s.id = a.id;
    s.innerHTML = `<div class="ah"><h2 class="serif">${a.name}</h2><span>${list.length} MOMENTS</span></div><div class="grid"></div>`;
    const g = s.querySelector(".grid");
    list.forEach((src, i) => {
        const [w, h] = ratios[(i * 3 + a.hue) % ratios.length];
        const t = document.createElement("div"); t.className = "tile"; t.dataset.r = `${w}/${h}`;
        t.innerHTML = src ? `<img loading="lazy" src="${src}" alt="${a.name} group photo">` :
            `<div class="ph" style="aspect-ratio:${w}/${h};background:linear-gradient(${135 + i * 25}deg,hsl(${a.hue + i * 7} 45% 28%),hsl(${a.hue + 40 + i * 5} 40% 14%))">GDFA</div>`;
        t.onclick = () => open(a, i);
        t.addEventListener("pointermove", e => {
            const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            t.style.setProperty("--ry", ((x - .5) * 14).toFixed(1) + "deg"); t.style.setProperty("--rx", ((.5 - y) * 14).toFixed(1) + "deg"); t.style.setProperty("--gx", x * 100 + "%"); t.style.setProperty("--gy", y * 100 + "%")
        });
        t.addEventListener("pointerleave", () => ["--ry", "--rx"].forEach(p => t.style.removeProperty(p)));
        g.appendChild(t);
    });
    main.appendChild(s);
});
pills.onclick = e => { const b = e.target.closest(".pill"); if (b) document.getElementById(b.dataset.id).scrollIntoView() };
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }), { threshold: .08 });
document.querySelectorAll(".tile").forEach((t, i) => { t.style.transitionDelay = (i % 3) * 110 + "ms," + (i % 3) * 110 + "ms,0ms"; io.observe(t) });
const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) document.querySelectorAll(".pill").forEach(p => p.classList.toggle("on", p.dataset.id === e.target.id)) }), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll(".album").forEach(s => so.observe(s));
/* floating gold dust */
(() => {
    const c = $("#dust"), x = c.getContext("2d"); let W, H, P = [];
    const fit = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; P = Array.from({ length: Math.round(W / 16) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2 + .6, v: Math.random() * .5 + .15, o: Math.random() * .6 + .2 })) };
    fit(); addEventListener("resize", fit);
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    (function f() { x.clearRect(0, 0, W, H); P.forEach(p => { p.y -= p.v; p.x += Math.sin(p.y / 40) * .3; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W } x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.3); x.fillStyle = `rgba(217,164,65,${p.o})`; x.fill() }); requestAnimationFrame(f) })()
})();
/* lightbox */
const lb = $("#lb"), lbc = $("#lbc");
function open(a, i) { cur = a.list.map((s, k) => ({ s, a, k })); idx = i; show(); lb.classList.add("open") }
function show() {
    const { s, a, k } = cur[idx]; const r = document.querySelectorAll("#" + a.id + " .tile")[k].dataset.r;
    lbc.innerHTML = s ? `<img src="${s}" alt="">` : `<div class="ph" style="--r:${r};aspect-ratio:${r};background:linear-gradient(135deg,hsl(${a.hue + k * 7} 45% 28%),hsl(${a.hue + 40} 40% 14%))">GDFA</div>`
}
const go = d => { idx = (idx + d + cur.length) % cur.length; show() };
lb.querySelector(".x").onclick = () => lb.classList.remove("open");
lb.querySelector(".pv").onclick = () => go(-1); lb.querySelector(".nx").onclick = () => go(1);
lb.onclick = e => { if (e.target === lb) lb.classList.remove("open") };
document.onkeydown = e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") lb.classList.remove("open"); if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1) };
