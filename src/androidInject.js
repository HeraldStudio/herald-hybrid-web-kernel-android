console.log('inject')
window.goto = path => {
    console.log(path)
    window.router.push(path);
}
  
window.androidMessage = message => {
    console.log(message)
}
