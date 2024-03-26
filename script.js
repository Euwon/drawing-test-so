// Initialize canvas, context, and default drawing settings
let color = "black";
let strokeSize = 10;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to resize and initialize the canvas with a white background
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; // Adjust based on your button size and spacing
  ctx.fillStyle = 'white'; // Set the fill style to white
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white
}

// Call resizeCanvas on load and resize
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Function to change the current drawing color and size
function changeColorAndSize(selectedColor, selectedStrokeSize) {
  color = selectedColor;
  strokeSize = selectedStrokeSize;
}

// Set up drawing state and event listeners
let painting = false;

function startPosition(e) {
  // Check if the mouse event is a right-click (button code 2); if so, return early
  if (e.button === 2|| e.button === 1) return;
  
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = strokeSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  // Prevent the default action to avoid potential scrolling and other behaviors
  e.preventDefault();

  let x, y;
  if (e.type === 'mousemove') {
    x = e.clientX;
    y = e.clientY;
  } else if (e.type === 'touchmove') {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    return; // If the event type is not supported, exit the function
  }

  // Get the mouse position relative to the canvas
  const rect = canvas.getBoundingClientRect();
  x -= rect.left;
  y -= rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Prevent right-click context menu on the canvas
canvas.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Add mouse event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// Add touch event listeners
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', draw, { passive: false });

// Download button event listener
document.getElementById('downloadBtn').addEventListener('click', function() {
  const format = document.getElementById('formatSelect').value;
  const fileNameExtension = format.split('/')[1];
  const image = canvas.toDataURL(format);
  const link = document.createElement('a');
  link.download = `myDrawing.${fileNameExtension}`;
  link.href = image;
  link.click();
});
