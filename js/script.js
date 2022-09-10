;(function () {
  let overlay = document.createElement('div')
  let button = document.createElement('button')
  let boxs = document.querySelectorAll('.game-container .game-block')
  let blocksContainer = document.querySelector('.game-container ')
  let blocks = Array.from(boxs)
  let promeptAnswer
  let name = document.querySelector('.name span')
  window.onload = function () {
    overlay.className = 'overlay'

    overlay.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.7)'

    button.style.cssText =
      'position: absolute;width: fit-content;padding: 10px 15px;background-color: rgb(33, 150, 243);color: rgb(255, 255, 255);cursor: pointer;font-size: 40px;top:50%;left:50%;transform:translate(-50%,-50%);outline:none'
    button.innerHTML = 'Start Game'
    document.body.appendChild(overlay)
    document.body.appendChild(button)
  }
  //start button
  button.onclick = function () {
    promeptAnswer = window.prompt('Enter Your Name')
    if (promeptAnswer !== '') {
      name.innerHTML = promeptAnswer

      overlay.style.cssText = 'display:none'
      this.style.cssText = 'display:none'
    }
  }
  //Aadd random order in blocks
  let orderRange = [...Array(boxs.length).keys()]
  shuffleOrderRange()

  blocks.forEach((block, index) => {
    block.style.order = orderRange[index]
  })
  //Shuffle
  function shuffleOrderRange () {
    let cureent = orderRange.length,
      temp
    let count = orderRange.length
    let random
    while (cureent > 0) {
      random = Math.floor(Math.random() * count)
      cureent--

      temp = orderRange[cureent]

      orderRange[cureent] = orderRange[random]
      orderRange[random] = temp
    }
  }

  flipBlock()
  //add class rotate to game-block
  function flipBlock () {
    let allFilppedBlocks
    blocks.forEach(box => {
      box.addEventListener('click', e => {
        e.target.closest('.game-block').classList.add('rotate')
        allFilppedBlocks = blocks.filter(flip =>
          flip.classList.contains('rotate')
        )

        //if there is 2 blocks selected
        if (allFilppedBlocks.length == 2) {

            stopClicking();
            checkMatchedBlock(allFilppedBlocks[0],allFilppedBlocks[1]);
            console.log(allFilppedBlocks[0],allFilppedBlocks[1])
        }
      })

      //collect all fliped card
    })
  }
  let duration =500;

  function stopClicking()
  {
    //Add Class no Clicking to main container
    blocksContainer.classList.add("no-clicking")
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking")

    },duration)
}
function checkMatchedBlock(firstBlock,secondBlock)
{
    let triesElement=document.querySelector(".tries-number span");
    if(firstBlock.dataset.tecnologie === secondBlock.dataset.tecnologie)
    {
        firstBlock.classList.remove("rotate");
        secondBlock.classList.remove("rotate");
    
        firstBlock.classList.add("match");
        secondBlock.classList.add("match");
    }else{
        triesElement.innerHTML = Number(triesElement.innerHTML) + 1; 
        
        setTimeout(()=>{
            firstBlock.classList.remove("rotate");
            secondBlock.classList.remove("rotate");
        },duration)
    }

}

  //duration for close game-block
})()
