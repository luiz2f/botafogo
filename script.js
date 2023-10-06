//
//
//
//
//
//  ---- Header, manter hover na selação pra baixo
//
//  ---- Matéria, trocar matérias ao passar pro lado
//  tambem atualizar os pontinhos
//
//  ----- BOTAFOGO TV, mudar o link do youtube e seleção css
//
//
//
//

///////////////////////////// MENU: STICKY / HIDE
const menu = document.querySelector(".grad");
const banner = document.querySelector(".menuhid");
let isIntersecting = false;

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      menu.classList.add("hide");
      menu.classList.add("scrollup");
      isIntersecting = false;
    }

    if (ent.isIntersecting === true) {
      menu.classList.remove("scrollup");
      menu.classList.remove("hide");
      isIntersecting = true;
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
  }
);
obs.observe(banner);

var lastScrollTop = 0;

window.addEventListener(
  "scroll",
  function () {
    var st = window.scrollY || document.documentElement.scrollTop;
    if (!isIntersecting) {
      if (st > lastScrollTop) {
        menu.classList.add("hide");
      } else {
        menu.classList.remove("hide");
        menu.classList.add("scrollup");
      }
      lastScrollTop = st;
    }
  },
  false
);
// searh bar
//
const xbtn = document.querySelector(".icone.icox");
const searchbtn = document.querySelector(".icone.icons");
const headsrch = document.querySelector(".grad");
const inputsr = document.querySelector("#search");

xbtn.addEventListener("click", () => {
  headsrch.classList.toggle("search");
  if (headsrch.classList.contains("search")) {
    xbtn.name = "close-outline";
    inputsr.focus();
  } else {
    xbtn.name = "search-outline";
  }
});
// MENUMOBILE
const menumobile = document.querySelector(".menuiconion");
const mmtitles = document.querySelectorAll(".tituloh");

mmtitles.forEach(function (mmt) {
  mmt.querySelector(".flexopenmenu").addEventListener("click", () => {
    if (
      !mmt.classList.contains("topen") &&
      headsrch.classList.contains("openm")
    ) {
      mmtitles.forEach(function (mmc) {
        mmc.classList.remove("topen");
      });
      console.log("if true");
      mmt.classList.toggle("topen");
    } else {
      console.log("else");

      mmtitles.forEach(function (mmc) {
        mmc.classList.remove("topen");
      });
    }
  });
});

menumobile.addEventListener("click", () => {
  menu.classList.toggle("openm");
  if (headsrch.classList.contains("openm")) {
    menumobile.name = "close-outline";
    inputsr.focus();
  } else {
    mmtitles.forEach(function (mmc) {
      mmc.classList.remove("topen");
    });
    menumobile.name = "menu-outline";
  }
});

///////////////////////////// NOTICIAS Carrosel

let atualNt = 0;
const rollNt = document.querySelector(".posts");
const todosNt = document.querySelectorAll(".postimg");
const prevBtnNt = document.querySelector(".iconeant");
const nextBtnNt = document.querySelector(".iconedps");
const bolinhaNt = document.querySelectorAll(".bola");

nextBtnNt.addEventListener("click", nextNt);

prevBtnNt.addEventListener("click", prevNt);

bolinhaNt.forEach(function (bola, i) {
  bola.addEventListener("click", function () {
    atualNt = i;
    let percrollNt = atualNt * 100;
    rollNt.style.transform = `translateX(-${percrollNt}%)`;
    carroselcheck();
  });
});

function carroselcheck() {
  bolinhaNt.forEach(function (bolia) {
    bolia.classList.remove("ativa");
  });
  bolinhaNt[atualNt].classList.add("ativa");
}
function nextNt() {
  if (atualNt !== todosNt.length - 1) {
    atualNt = atualNt + 1;
    let percrollNt = atualNt * 100;
    rollNt.style.transform = `translateX(-${percrollNt}%)`;
  } else if (atualNt === todosNt.length - 1) {
    atualNt = 0;
    rollNt.style.transform = `translateX(0)`;
  }
  carroselcheck();
}

function prevNt() {
  if (atualNt !== 0) {
    atualNt = atualNt - 1;
    let percrollNt = atualNt * 100;
    rollNt.style.transform = `translateX(-${percrollNt}%)`;
  } else if (atualNt === 0) {
    atualNt = 6;
    let percrollNt = atualNt * 100;
    rollNt.style.transform = `translateX(-${percrollNt}%)`;
  }
  carroselcheck();
}

function nada() {
  let percrollNt = atualNt * 100;
  rollNt.style.transform = `translateX(-${percrollNt}%)`;
}
// arrowkey

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37) {
    prevNt();
  } else if (e.keyCode === 39) {
    nextNt();
  }
});

/// drag - pc

const dragNt = document.querySelector(".posthid");

let isDown = false;
let scrollLeft;
let screenWidth;
let walkperc = 0;

dragNt.addEventListener("mousedown", (e) => {
  screenWidth = dragNt.offsetWidth;

  isDown = true;
  startX = e.pageX - dragNt.offsetLeft;
  scrollLeft = dragNt.scrollLeft;
});
dragNt.addEventListener("mouseleave", () => {
  if (walkperc < -3) {
    nextNt();
  }
  if (walkperc > 3) {
    prevNt();
  }
  if (walkperc > -3 || walkperc < 3) {
    nada();
  }
  isDown = false;
  dragNt.classList.remove("dragatv");
  walkperc = 0;
});
dragNt.addEventListener("mouseup", () => {
  if (walkperc < -3) {
    nextNt();
  }
  if (walkperc > 3) {
    prevNt();
  }
  if (walkperc > -3 || walkperc < 3) {
    nada();
  }
  isDown = false;
  dragNt.classList.remove("dragatv");
  walkperc = 0;
});
dragNt.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - dragNt.offsetLeft;
  const walk = x - startX;
  walkperc = (walk / screenWidth) * 100;
  let percrollNt = atualNt * 100;
  rollNt.style.transform = `translateX(calc( -${percrollNt}% + ${walkperc}% ))`;
});

/// drag mobile

dragNt.addEventListener("touchstart", (e) => {
  console.log("start");
  // screenWidth = dragNt.offsetWidth;

  // isDown = true;
  // startX = e.pageX - dragNt.offsetLeft;
  // scrollLeft = dragNt.scrollLeft;
});
dragNt.addEventListener("touchcancel", () => {
  console.log("canc");

  // if (walkperc < -3) {
  //   nextNt();
  // }
  // if (walkperc > 3) {
  //   prevNt();
  // }
  // if (walkperc > -3 || walkperc < 3) {
  //   nada();
  // }
  // isDown = false;
  // dragNt.classList.remove("dragatv");
  // walkperc = 0;
});
dragNt.addEventListener("toutchend", () => {
  console.log("end");

  // if (walkperc < -3) {
  //   nextNt();
  // }
  // if (walkperc > 3) {
  //   prevNt();
  // }
  // if (walkperc > -3 || walkperc < 3) {
  //   nada();
  // }
  // isDown = false;
  // dragNt.classList.remove("dragatv");
  // walkperc = 0;
});
dragNt.addEventListener("touchmove", (e) => {
  console.log("mose");

  // if (!isDown) return;
  // e.preventDefault();
  // const x = e.pageX - dragNt.offsetLeft;
  // const walk = x - startX;
  // walkperc = (walk / screenWidth) * 100;
  // let percrollNt = atualNt * 100;
  // rollNt.style.transform = `translateX(calc( -${percrollNt}% + ${walkperc}% ))`;
  // console.log("Valor de walkperc:", walkperc);
});

///////////////////////////// PARTIDAS Carrosel

let atual = 1;
const rollPt = document.querySelector(".rollpartidas");
const todosPt = document.querySelectorAll(".partida");
const prevBtnPt = document.querySelector(".jgant");
const nextBtnPt = document.querySelector(".jgprox");

nextBtnPt.addEventListener("click", next);

// Adicionar event listener para o botão "Anterior"
prevBtnPt.addEventListener("click", prev);

function next() {
  if (atual !== todosPt.length - 1) {
    atual = atual + 1;

    let percroll = atual * 100;
    let margroll = atual * 48;
    rollPt.style.transform = `translateX(calc(-${percroll}% - ${margroll}rem))`;
  }
  if (atual === todosPt.length - 1) {
    nextBtnPt.style.display = "none";
  }
}

function prev() {
  if (atual !== 0) {
    atual = atual - 1;
    let percroll = atual * 100;
    let margroll = atual * 48;
    rollPt.style.transform = `translateX(calc(-${percroll}% - ${margroll}rem))`;
  }
  nextBtnPt.style.display = "block";
}
///////////////////////////// LOJA FUNDOS

const itens = document.querySelectorAll(".flexloja");
const fundolojaimg = document.querySelector(".lojaonline");
const loja = document.querySelector(".lojajs");

loja.addEventListener("mouseout", (event) => {
  if (event.relatedTarget !== null && !loja.contains(event.relatedTarget)) {
    fundolojaimg.classList.remove("tche", "adry", "edu");
  }
});

itens.forEach((item, index) => {
  item.addEventListener("mouseover", () => {
    if (index === 0) {
      fundolojaimg.classList.remove("adry", "edu");
      fundolojaimg.classList.add("tche");
    } else if (index === 1) {
      fundolojaimg.classList.remove("tche", "edu");

      fundolojaimg.classList.add("adry");
    } else if (index === 2) {
      fundolojaimg.classList.remove("tche", "adry");

      fundolojaimg.classList.add("edu");
    }
  });
});

////////////////////////////// BOTAFOGO TV

const video = document.querySelector(".embedtv iframe");
const thumbs = document.querySelectorAll(".outrosvid .video");

const youtubexport = [
  "https://www.youtube.com/embed/lqjGvHcSvuQ?si=h7kwrtCT9dsUyQyJ",
  "https://www.youtube.com/embed/l8Y9Gaxoe0Y?si=XwL2ZRuTeenI0i5M",
  "https://www.youtube.com/embed/vbVYW33jW-0?si=DcK-VnMRfkjjKsEb",
];

thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    // Remover a classe "active" de todas as miniaturas
    thumbs.forEach((t) => {
      t.classList.remove("active");
    });

    // Adicionar a classe "active" à miniatura clicada
    thumb.classList.add("active");

    // Atualizar o atributo "src" do iframe com o URL do vídeo do YouTube correspondente
    video.src = youtubexport[i];
    console.log(youtubexport[i]);
  });
});
