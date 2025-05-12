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
      avatar.src = sender === "bot" ? "../image/ảnh raiden.jpg" : "avatar.jpg";

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
          appendMessage("bot", `Mình đã nhận được: "${msg}"`);
        }, 1000);
      }
    });

    userInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
