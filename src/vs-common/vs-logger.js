class Errors {
  static onClick(event) {
    if (event.srcElement.localName !== "div") {
      event.srcElement.parentElement.remove();
    }
    event.srcElement.remove();
  }

  static error(text) {
    console.log(text);
    this.render(text, "error");
  }

  static warn(text) {
    console.log(text);
    this.render(text, "warning")
  }

  static render(text, level) {
    this.getPopups().appendChild(this.getPopup(text, level));
  }

  static getPopup(text, level) {
    var popup = document.createElement("div");
    popup.innerHTML = `<h1>${level}: ${text}</h1><h2>×</h2>`;
    popup.classList = `flex-center popup ${level}`;
    popup.onclick = (e) => this.onClick(e);

    return popup;
  }

  static getPopups() {
    var popups = document.getElementById("popups");
    if (popups == null) {
      popups = document.createElement("div");
      popups.className = "flex-column popups";
      popups.id = "popups";

      document.body.appendChild(popups);
    }
    return document.getElementById("popups");
  }
}

export { Errors };