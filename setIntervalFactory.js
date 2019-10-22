const resetQuestionBeingTyped = {
  handle: 0,
  start() {
    self.props.onQuestionBeingTyped(true)
    this.stop()
    this.handle = setInterval(()=>{
      self.props.onQuestionBeingTyped(false)}, 10000)
  },
  stop() {
    if (this.handle) {
      clearInterval(this.handle)
      this.handle = 0
    }
  }
}

const handleKeyPress = () => (ev) => {
  ev.preventDefault()
  resetQuestionBeingTyped.start()
}
