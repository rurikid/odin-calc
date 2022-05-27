class VSHeader {
  static render() {
    let container = document.createElement("div");
    
    container.className = "flex-center flex-row vs-header"
    container.innerHTML = `<p style="color:red">Odin-Calc</p>
    <p><img class="trident" src="./images/vs.svg" /></p>`

    return container; 
  }
}

export { VSHeader };