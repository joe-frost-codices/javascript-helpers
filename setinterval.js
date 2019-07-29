const countDown = setInterval(()=>{
        let newTime = this.state.timer
        newTime--
        if (newTime < 0) {
          clearInterval(countDown)
          this.addSelectedByInfoToAnswersArray()
          setTimeout(() => {this.setState({isRevealed:true})},50 )
        } else {
          this.setState({timer: newTime})
        }
      } ,1000)
    }, 8000)
