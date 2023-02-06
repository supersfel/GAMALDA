const getParticles = () => {
  const particles = document.getElementById("particles");
  const border = ["50%", "0%"];
  const colors = ["#FF6B6B", "#FFE66D", "#ffffff"];

  if (particles === null) return;
  var np = document.documentElement.clientWidth / 40;
  particles.innerHTML = "";
  for (var i = 0; i < np; i++) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var rndw = Math.floor(Math.random() * w) + 1;
    var rndh = Math.floor(Math.random() * h) + 1;
    var widthpt = Math.floor(Math.random() * 8) + 5;
    var opty = Math.floor(Math.random() * 4) + 1;
    var anima = Math.floor(Math.random() * 12) + 8;
    var bdr = Math.floor(Math.random() * 2);
    var color = Math.floor(Math.random() * 3);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.marginLeft = rndw + "px";
    div.style.marginTop = rndh + "px";
    div.style.width = widthpt + "px";
    div.style.height = widthpt + "px";
    div.style.opacity = opty + "";
    div.style.backgroundColor = colors[color];
    div.style.borderRadius = border[bdr];
    div.style.animation = "move " + anima + "s ease-in infinite";
    particles.appendChild(div);
  }
};

export default getParticles;