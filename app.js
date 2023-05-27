/** @format */
$(document).on("ready", () => {
  loadGifsFromStorage();
});
console.log("Let's get this party started!");

function renderGif(res) {
  let numGifs = res.data.data.length;
  if (numGifs) {
    let randIdx = Math.floor(Math.random() * numGifs);
    $("#gifContainer").append(
      $("<div>", { class: "col-6 col-md-4 col-lg-3" }).append(
        $("<div>")
          .addClass("img-container")
          .append(
            $("<img>", { class: "img-fluid" }).attr(
              "src",
              res.data.data[randIdx].images.original.url
            )
          )
      )
    );
  }
}

$("#search").on("click", async function (e) {
  e.preventDefault();
  const inputVal = $("#input").val();
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: "Inf7tuJF8A3QwNWcMFEM2dGUW63ITIlF",
      q: inputVal,
    },
  });
  console.log(res.data.data[3].images.original.url);
  $("#input").val("");
  renderGif(res);
  saveGifsToLocalStorage();
});

$("#remove").on("click", () => {
  $("#gifContainer").empty();
  localStorage.removeItem("savedgifs");
});

function saveGifsToLocalStorage() {
  const gifUrls = [];
  $("#gifContainer")
    .find("img")
    .each(function () {
      gifUrls.push($(this).attr("src"));
    });
  localStorage.setItem("savedgifs", JSON.stringify(gifUrls));
}

function loadGifsFromStorage() {
  const savedGifs = JSON.parse(localStorage.getItem("savedgifs"));
  if (savedGifs) {
    savedGifs.forEach(function (gifUrl) {
      $("#gifContainer").append(
        $("<div>", { class: "col-6 col-md-4 col-lg-3" }).append(
          $("<div>")
            .addClass("img-container")
            .append($("<img>", { class: "img-fluid" }).attr("src", gifUrl))
        )
      );
    });
  }
}
