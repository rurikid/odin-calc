class DisplayAlign {
  static Left = new DisplayAlign("left");
  static Right = new DisplayAlign("right");

  constructor(alignment) {
    this.alignment = alignment;
  }
}

export { DisplayAlign };