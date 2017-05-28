$('.list-tasks .remove').on('click', function(e) {
	e.preventDefault()

	const $thisElement = $(this)
	const url = $thisElement.attr("href")
	const method = 'DELETE'

	$.ajax({url, method})
		.done( response => {
		$thisElement
      .parents('.list-group-item')
        .remove()
	})
})

$('.list-tasks .edit').on('click', function(e) {
	e.preventDefault()

	const $thisElement = $(this)

  	$thisElement
    .parents('.list-group-item')
      .find("form input")
        .removeClass("hidden")
        .focus()
        .end()
      .find("p")
        .addClass("hidden")
})

$(".edit-form").on("submit", function(e) {
  e.preventDefault();

  const $thisElement = $(this)
  const url = $thisElement.attr("action")
  const title = $thisElement.find('input').val()
  const method = 'PUT'

  $.ajax({
    url,
    method,
    data: {title}
  })
  .done( response => {
    $thisElement
      .siblings("p.title-name")
        .text(title)
        .removeClass("hidden")
        .end()
      .find("input")
        .addClass("hidden")
    $thisElement
      .siblings("p.creation-date")
        .removeClass("hidden")
  })
})

$('.list-tasks .done').on('click', function(e) {
    e.preventDefault()

    const $thisElement = $(this)
    const url = $thisElement.attr("href")
    const method = 'PUT'
    const data = 'completed=' + true

    $.ajax({ url, method, data })
      .done( response => {
        location.reload()
      })
})