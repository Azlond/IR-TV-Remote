import { Keys } from "../data/RemoteKeys.json";

/**
 * @description TVRemote class, controls the clicking of the buttons on the svg-remote
 * @author Jan Kaiser
 * @class TVRemote
 */
class TVRemote {
  /**
   * @description Creates an instance of TVRemote.
   *
   * @example TVRemote();
   * @author Jan Kaiser
   * @memberof TVRemote
   */
  constructor() {
    const svg = document.getElementById("remote-svg");
    svg.addEventListener("load", () => {
      const svgDoc = svg.contentDocument;
      Keys.forEach((key) => {
        svgDoc.getElementById(key).addEventListener("click", function () {
          fetch(`/api/tv/${this.id}`);
        });
      });
    });
  }
}

window.remote = new TVRemote();
