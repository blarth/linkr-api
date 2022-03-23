import urlMetadata from "url-metadata"

urlMetadata('https://www.youtube.com/watch?v=TPkP5mO7ATI').then(
  function (metadata) { // success handler
    console.log(metadata)
  },
  function (error) { // failure handler
    console.log(error)
  })