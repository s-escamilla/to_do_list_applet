const {app, BrowserWindow} = require('electron')

async function hideWindow(window){
  window.hide()
}
async function showWindow(window){
  window.show()
}

function createWindow(parent){
  const childWindow = new BrowserWindow({
      width: 200,
      height: 200,
      alwaysOnTop:true,
      title:'child',
      focusable:false,
      show:false,
      frame: false, // Set to false to remove title bar
      webPreferences: {
        nodeIntegration: true
      },
      parent:parent
    })
    childWindow.loadFile('index.html')
    return childWindow
}
function createButton(width,height){
  var widthScaled = 45
  var heightScaled = 40
  console.log(heightScaled)
  console.log(widthScaled)
  const mainWindow = new BrowserWindow({
    'min-Height':20,
    'min-Width':20,
    movable:true,
    title:'button',
    width: widthScaled,
    height:heightScaled,
    icon:true,
    x:width / 3,
    y: 0,
    resizable:false,
    frame: false, // Set to false to remove title bar
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('button.html')
  mainWindow.setAlwaysOnTop(1)
  
  return mainWindow
}

app.whenReady().then(async () => {
  const { screen } = require('electron')
  var disp = screen.getPrimaryDisplay()
  const { width, height } = disp.workAreaSize
  console.log(width,height)
  var window = createButton(width,height)
  var windowChild = createWindow(window)
  var activeInd = false
  windowChild
  window.addListener('focus',function(){
    if (activeInd){

        windowChild.hide()
        console.log('hide')
        activeInd = false}
    else{
        windowChild.show()
        console.log('show')
        activeInd = true}

    window.blur()
    
    console.log('clicked')

  })
  
  app.on('activate', function () {
    console.log("test")
    if (BrowserWindow.getAllWindows().length === 0) 
      createButton(width,height)

  })
})
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })