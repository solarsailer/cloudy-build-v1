/* global localStorage */

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

const namespace = 'data-store'

$(() => {
  $(`[${namespace}]`).each(function () {
    initializeStore(this)
  })
})

function initializeStore (store) {
  const $store = $(store)

  const key = $store.attr(namespace)
  const $toggle = getStoreToggle(key)

  const storedValue = localStorage.getItem(key)

  if (storedValue !== null) {
    $store.val(storedValue)
    $toggle.prop('checked', true)
  }

  $toggle.change(() => changeStoreToggle($store, $toggle, key))

  // And trigger once to initialize.
  $toggle.change()
}

function getStoreToggle (key) {
  return $(`[${namespace}-toggle="${key}"]`)
}

// Check the state of the toggle and:
// - Store data if checked.
// - Clean otherwise.
function changeStoreToggle (store, toggle, key) {
  const $store = $(store)
  const $toggle = $(toggle)

  const isChecked = $toggle.is(':checked')

  if (isChecked) {
    $store.change(() => refreshStore($store, key))

    // And trigger once to initialize.
    $store.change()
  } else {
    $store.off('change')
    localStorage.removeItem(key)
  }
}

function refreshStore (store, key) {
  const $store = $(store)
  if (!$store.val) return

  localStorage.setItem(key, $store.val())
}
