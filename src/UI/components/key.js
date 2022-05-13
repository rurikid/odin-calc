'use strict';

class Key {
  static getKey(key) {
    let btn = document.createElement("div");
    btn.id = key.id;
    btn.onclick = key.onclick;
    btn.className = "btn";
    btn.innerHTML = `
      <div class="flex-center operator">
        <span ${key.style === undefined ? "" : key.style}>${key.symbol}</span>
      </div>
      <div class="bevel">
      </div>
    `;

    return btn;
  }
}

export { Key };