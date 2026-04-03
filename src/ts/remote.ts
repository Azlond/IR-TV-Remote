import { Keys } from "../data/RemoteKeys.json" with { type: "json" };

declare global {
  interface Window {
    remote: TVRemote;
  }
}

class TVRemote {
  constructor() {
    const svg = document.getElementById("remote-svg") as HTMLObjectElement;
    svg.addEventListener("load", () => {
      const svgDoc = svg.contentDocument!;
      Keys.forEach((key) => {
        svgDoc.getElementById(key)!.addEventListener("click", function (this: Element) {
          fetch(`/api/tv/${this.id}`, { method: "POST" });
        });
      });
    });
  }
}

window.remote = new TVRemote();
