const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");


canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
/*canvas.width = 700;              //캔버스 크기를 가져옴
canvas.height = 700;*/        //이 pixel modifier 사이즈를 안줘서 아까 작동안했음 

ctx.strokeStyle = "#2c2c2c";
ctx.linewidth = 2.5;

let painting = false;

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

function onMouseDown(event) {
    painting = true;  /* 클릭하면 true */
}

function onMouseUp(event) {
    stopPainting()
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting);  /* 캔버스를 벗어나면 false가 돼야함 */
}