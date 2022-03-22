const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

/*
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight; */ 
canvas.width = CANVAS_SIZE;              //캔버스 크기를 가져옴
canvas.height = CANVAS_SIZE;       //이 pixel modifier 사이즈를 안줘서 아까 작동안했음 

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //하얀 배경. 얘가 없으면 투명배경저장
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY; /* 전체 화면에서 마우스 위치 감지 */
    if (!painting) {
        console.log("creating path in ", x, y);
        ctx.beginPath();     /* path 는 선이 나오는 시작점 이전의 경로, 즉 마우스가 캔버스 위에 떠다니는 경로. 클릭해서 긋기 시작하면= 선이 나오기 시작하면 이 if문은 작동안함 */
        ctx.moveTo(x, y);
    } else {
        console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size; 
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";     
    }
}

function handleCanvasClick(){
    if (filling) {      //filling과 painting을 구분
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); 
    }
    
}

function handleCM(event){
    event.preventDefault();  //우클릭 방지(save 버튼으로 저장하도록)
}

function handSaveClick(){
    const image = canvas.toDataURL(); //default = png
    const link = document.createElement("a");
    link.href = image;
    link.download = "[PaintJS🎨]";
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting);  /* 캔버스를 벗어나면 false가 돼야함 */
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); //for each 옆의 color은 array 안의 각각의 아이템들을 대표하는 것 뿐 이름이 어떻게 되든 괜츦음

if (range){
    range.addEventListener("input", handleRangeChange);
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click", handSaveClick);
}