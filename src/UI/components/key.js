'use strict';

class Key {
  static getKey(key) {

    return `<div id="${key.id}" class="btn">
              <div class="flex-center operator">
                <span ${key.style === null ? "" : key.style}>${key.symbol}</span>
              </div>
              <div class="bevel">
              </div>
            </div>`;
  }
}

export { Key };