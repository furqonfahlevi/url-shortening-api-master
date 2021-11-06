// Script --- Red Border & Red Text
$(".redToggle").removeClass();
$(".outsideRedText").css("opacity", "0");

$("#submitShortenLink").click(function (event) {
  event.preventDefault();
  let val = $("#inputLink").val().trim();

  if (val != "") {
    console.log(val);
    shortenItDOM();
  } else {
    $("#inputLink").addClass("redToggle");
    $(".outsideRedText").css("opacity", "1");
  }

  if ($(window).width() <= 1000) {
    if (val != "") {
      console.log(val);
    } else {
      $("#inputLink").addClass("redToggle");
      $(".insideRedText").css("display", "block");
    }
  }
});

// DOM --- Shorten It!
function shortenItDOM() {
  const urlElement = $('<div class="urlShorten"></div>');
  const webElement = $('<div class="web-url"></div>');
  const lineSeperator = $('<div class="line-seperator"></div>');
  const shortenRightItemElement = $('<div class="shorten-right-item"></div>');
  const shortenUrl = $('<div class="shorten-url"></div>');
  let webVal = $("#inputLink").val().trim();
  const baseUrl = `https://api.shrtco.de/v2/shorten?url=${webVal}`;
  const btnCopy = $('<button class="btn-copy">Copy</button>');
  const btnCopied = $('<button class="copy-clicked">Copied!</button>');

  const settings = {
    url: baseUrl,
    method: "POST",
    timeout: 0,
  };

  $("#submitShortenLink").text("Loading...");

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#formInputLink")[0].reset();
    $("#submitShortenLink").text("Shorten It!");
    const shortLink = response.result.short_link;
    const shortenUrlContainer = $(".shortenURL").append(urlElement);

    $(urlElement).append(webElement);
    $(urlElement).append(lineSeperator);
    $(webElement).append(webVal);

    $(urlElement).append(shortenRightItemElement);
    $(shortenRightItemElement).append(shortenUrl);

    $(shortenUrl).append(shortLink);

    $(shortenRightItemElement).append(btnCopy);
    $(shortenRightItemElement).append(btnCopied);

    $(btnCopy).click(function (e) {
      e.preventDefault();
      console.log(shortLink);
      btnCopy.css("display", "none");
      btnCopied.css("display", "block");
      navigator.clipboard.writeText(shortLink);
      setTimeout(() => {
        btnCopy.css("display", "block");
        btnCopied.css("display", "none");
      }, 2500);
    });
  });
}

// MenuToggle
const menuToggle = $(".menu-container input");
const nav = $(".nav-content");

if ($(window).width() <= 1000) {
  nav.css("display", "none");
} else {
  nav.css("display", "flex");
}

$(window).resize(function () {
  if ($(window).width() <= 1000) {
    nav.css("display", "none");
    menuToggle.prop("checked", false);
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  } else {
    nav.css("display", "flex");
  }
});

menuToggle.click(function (e) {
  var scroll = $(window).scrollTop();
  if ($(this).is(":checked")) {
    nav.slideDown(500);
    $("html, body").css({
      overflow: "hidden",
      height: "100%",
    });
  } else if ($(this).is(":not(:checked)")) {
    nav.slideUp(500);
    $("html, body").css({
      overflow: "auto",
      height: "auto",
    });
  }
});
