import {showShareSection} from './get-share-link'

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
      .catch(console.log) // TODO: error.
  })
})

function onSuccess (data) {
  const form = $(FORM_ID)
  form.hide()

  showShareSection(data)
}
