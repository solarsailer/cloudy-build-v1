const FORM_ID = '#get-latest-builds'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

$(() => {
  const form = $(FORM_ID)

  form.submit(function onSubmitted (e) {
    e.preventDefault()

    $.getJSON('/builds', form.serialize())
      .then(onSuccess)
      .catch(onError)
  })
})

function onSuccess (data) {
  // TODO
}

function onError () {
  // TODO: error.
}
