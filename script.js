var speechRecognition = window.webkitSpeechRecognition
var recoginion = new speechRecognition()
var textbox = $("#textbox")
var  instructions = $("#instructions")
var content = ''

recoginion.continuous = true 

// recoginion i9s started

recoginion.onstart = function(){
    instructions.text("Recognition started ")

}

recoginion.onspeechend = function(){
    instructions.text("there is no voice")

}

recoginion.onerror = function(){
    instructions.text("Try again, Please! ")

}

recoginion.onresult = function(event){
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript
      content += transcript
      textbox.val(content)

}

$("#start-btn").click(function(event){
    if(content.length)
    {   content += ' '      }
    recoginion.start()
})

textbox.on('input',function(){

    content = $(this).val()
})


if ("serial" in navigator) {
    // The Web Serial API is supported.
  }
  
  document.querySelector('button').addEventListener('click', async () => {
    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();
  });
  
  // Get all serial ports the user has previously granted the website access to.
  const ports = await navigator.serial.getPorts();
  
  // Filter on devices with the Arduino Uno USB Vendor/Product IDs.
  const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 }
    ];
    
    // Prompt user to select an Arduino Uno device.
    const port = await navigator.serial.requestPort({ filters }); 
    
    const { usbProductId, usbVendorId } = port.getInfo(); 
  
    // Prompt user to select any serial port.
   port = await navigator.serial.requestPort();
  
  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 });

  const writer = port.writable.getWriter();

const data = new Uint8Array([104, 101, 108, 108, 111]); // hello
await writer.write(data);


// Allow the serial port to be closed later.
writer.releaseLock();

const textEncoder = new TextEncoderStream();
const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

 writer = textEncoder.writable.getWriter();

await writer.write("hello");

await port.close();




 