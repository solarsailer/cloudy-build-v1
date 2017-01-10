'use strict'

// -------------------------------------------------------------
// Submission.
// -------------------------------------------------------------

$(() => {
  const form = $('#get-latest-builds')

  form.submit(function onSubmitted (e) {
    e.preventDefault()

    $.getJSON('/builds', $(this).serialize())
      .then(console.log)
      .catch(console.log)
  })
})
