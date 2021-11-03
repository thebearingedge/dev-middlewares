import.meta.webpackHot?.accept()

fetch('/api/hello')
  .then(res => res.json())
  .then(message => {
    const $pre = document.querySelector('pre')
    $pre.textContent = JSON.stringify(message, null, 2)
  })
