import { Keys } from "../data/RemoteKeys.json" with { type: "json" };

function attachListeners() {
  const svg = document.getElementById("remote-svg") as HTMLObjectElement;
  const svgDoc = svg.contentDocument!;
  Keys.forEach((key) => {
    svgDoc.getElementById(key)!.addEventListener("click", function (this: Element) {
      fetch(`/api/tv/${this.id}`, { method: "POST" });
    });
  });
}

const svg = document.getElementById("remote-svg") as HTMLObjectElement;
if (svg.contentDocument) {
  attachListeners();
} else {
  svg.addEventListener("load", attachListeners);
}
