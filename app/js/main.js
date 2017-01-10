$(() => {
  $('#create-shareable-link').submit(function onSubmit (e) {
    e.preventDefault()

    $.getJSON('/builds', $(this).serialize())
      .then(console.log)
      .catch(console.log)
  })
})
