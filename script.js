const chatToggle = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chat-box");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("user-input");

    const historyKey = "chat_history";

    chatToggle.addEventListener("click", () => {
      chatBox.style.display = "flex";
      chatToggle.style.display = "none";
      loadHistory();
    });

    closeChat.addEventListener("click", () => {
      chatBox.style.display = "none";
      chatToggle.style.display = "block";
    });

    function appendMessage(sender, text, save = true) {
      const msg = document.createElement("div");
      msg.classList.add("chat-msg", sender);

      const avatar = document.createElement("img");
      avatar.classList.add("chat-avatar");
      avatar.src = sender === "bot" ? "image/ảnh raiden.jpg" : "avatar.jpg";

      const bubble = document.createElement("div");
      bubble.classList.add("chat-bubble");
      bubble.textContent = text;

      msg.appendChild(avatar);
      msg.appendChild(bubble);
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;

      if (save) {
        const current = JSON.parse(localStorage.getItem(historyKey)) || [];
        current.push({ sender, text });
        localStorage.setItem(historyKey, JSON.stringify(current));
      }
    }

    function loadHistory() {
      chatBody.innerHTML = "";
      const history = JSON.parse(localStorage.getItem(historyKey)) || [];
      history.forEach(msg => appendMessage(msg.sender, msg.text, false));
    }

    sendBtn.addEventListener("click", () => {
      const msg = userInput.value.trim();
      if (msg !== "") {
        appendMessage("user", msg);
        userInput.value = "";

        const typing = document.createElement("div");
        typing.classList.add("chat-msg", "bot");
        typing.innerHTML = `
          <img class="chat-avatar" src="../image/ảnh raiden.jpg">
          <div class="chat-bubble">Đang nhập...</div>
        `;
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
          typing.remove();
          appendMessage("bot", `Mình nghe, hãy đợi mình chút nhé, mình sẽ trả lời bạn ngay!`);
        }, 1000);
      }
    });
    import {
      collection,
      addDoc,
      serverTimestamp
    } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
    
    const messagesRef = collection(window.db, "messages");
    
    sendBtn.addEventListener("click", async () => {
      const msg = userInput.value.trim();
      if (msg !== "") {
        appendMessage("user", msg);
        userInput.value = "";
    
        await addDoc(messagesRef, {
          sender: "user",
          text: msg,
          createdAt: serverTimestamp()
        });
      }
    });
    import {
      onSnapshot,
      query,
      orderBy
    } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
    
    const q = query(messagesRef, orderBy("createdAt"));
    
    onSnapshot(q, (snapshot) => {
      chatBody.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        appendMessage(data.sender, data.text, false);
      });
    });
        

    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let stars = [];
    
    function createStar() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      const length = Math.random() * 80 + 50;
      const speed = Math.random() * 3 + 2;
    
      stars.push({ x, y, length, speed });
    }
    
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(star.x, star.y, star.x + star.length, star.y + star.length);
        gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = gradient;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.stroke();
    
        star.x += star.speed;
        star.y += star.speed;
        star.length -= 0.5;
    
        if (star.x > canvas.width || star.y > canvas.height || star.length <= 0) {
          stars.splice(i, 1);
          i--;
        }
      }
    
      if (Math.random() < 0.03) createStar();
    
      requestAnimationFrame(drawStars);
    }
    
    drawStars();
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    const particleCanvas = document.getElementById('particle-canvas');
const pctx = particleCanvas.getContext('2d');

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random()
  });
}

function drawParticles() {
  pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  for (let p of particles) {
    pctx.beginPath();
    pctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    pctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    pctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
});
