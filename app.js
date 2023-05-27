/** @format */

console.log("Let's get this party started!");

function renderGif(res) {
  let numGifs = res.data.data.length;
  if (numGifs) {
    let randIdx = Math.floor(Math.random() * numGifs);
    $("#gifContainer").append(
      $("<div>")
        .addClass("col-md-4 mb-4")
        .append($("<img>").attr("src", res.data.data[randIdx].url))
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
  console.log(res.data.data[3].url);
  $("#input").val("");
  renderGif(res);
});

$("#remove").on("click", () => {
  $("#gifContainer").empty();
});
