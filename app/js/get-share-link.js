const FORM_ID = '#get-share-link'
const SELECT_ID = '#builds'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

$(() => {
  const form = $(FORM_ID)
  form.hide()

  form.submit(function onSubmitted (e) {
    e.preventDefault()

    $.getJSON('/share-link', $(this).serialize())
      .then(console.log)
      .catch(console.log) // TODO: error.
  })
})

function showShareSection (data) {
  populateBuildList(data)

  $(FORM_ID).show()
}

function populateBuildList (json) {
  const $receiver = $(SELECT_ID)

  _.map(json, createBuild)
    .forEach($el => $el.appendTo($receiver))
}

function createBuild (value, key) {
  return $(`<option value="${value}">${key} #${value}</option>`)
}

// -------------------------------------------------------------
// Exports.
// -------------------------------------------------------------

module.exports = {
  showShareSection
}
