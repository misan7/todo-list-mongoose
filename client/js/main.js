$(".list-tasks .remove").on("click", function (e) {
  e.preventDefault();

  const $thisElement = $(this);
  const url = $thisElement.attr("href");
  const method = "DELETE";

  $.ajax({ url, method }).done((response) => {
    $thisElement.parents(".list-group-item").remove();
  });
});

$(function () {
  $(".list-tasks li").each(function (i, el) {
    const $el = $(el);
    setTimeout(() => $el.addClass("fade-in"), i * 40);
  });
});
$(".list-tasks").on("click", ".edit", function (e) {
  e.preventDefault();

  const $btn = $(this);
  const $item = $btn.parents(".list-group-item");
  const $input = $item.find("form input");
  const $titleP = $item.find("p.title-name");

  if ($input.length === 0) return;

  if ($input.hasClass("hidden")) {
    $input.removeClass("hidden").focus();
    $titleP.addClass("hidden");
  } else {
    // closing editor: if value changed, save; otherwise just close
    const newTitle = $input.val().trim();
    const oldTitle = $titleP.text().trim();

    if (newTitle && newTitle !== oldTitle) {
      // reuse submit logic: perform PUT to the form action
      const $form = $item.find("form.edit-form");
      const url = $form.attr("action");

      $.ajax({ url, method: "PUT", data: { title: newTitle } })
        .done((response) => {
          $titleP.text(newTitle).removeClass("hidden");
          $input.addClass("hidden");
          $item.find("p.creation-date").removeClass("hidden");
        })
        .fail(() => {
          // on failure, reopen editor for retry
          $input.removeClass("hidden").focus();
        });
    } else {
      // nothing changed or empty -> just close
      $input.addClass("hidden");
      $titleP.removeClass("hidden");
    }
  }
});

$(".edit-form").on("submit", function (e) {
  e.preventDefault();

  const $thisElement = $(this);
  const url = $thisElement.attr("action");
  const title = $thisElement.find("input").val();
  const method = "PUT";

  $.ajax({
    url,
    method,
    data: { title },
  }).done((response) => {
    $thisElement
      .siblings("p.title-name")
      .text(title)
      .removeClass("hidden")
      .end()
      .find("input")
      .addClass("hidden");
    $thisElement.siblings("p.creation-date").removeClass("hidden");
  });
});

$(".list-tasks .done").on("click", function (e) {
  e.preventDefault();

  const $thisElement = $(this);
  const url = $thisElement.attr("href");
  const method = "PUT";
  const data = "completed=" + true;

  $.ajax({ url, method, data }).done((response) => {
    location.reload();
  });
});
