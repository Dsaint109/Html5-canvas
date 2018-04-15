const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')

// let diagonal = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))
// console.log(diagonal)

c.fillStyle = "rgba(255, 200, 0, 0.3)"

// c.fillRect(x, y, width, height)
c.fillRect(0, 0, 100, 100)

// Drawing a line
c.beginPath()
c.moveTo(50, 300)
c.lineTo(300, 50)
c.lineTo(300, 300)
c.lineTo(50, 300)
c.strokeStyle = "#e57373"
c.stroke()

// create an Arc/Circle
// c.arc(x: int, y: int, r: int, startAngle: float, endAngle: float, drawCounterClockwise: bool = false
c.beginPath()
c.arc(300, 300, 30, 0, Math.PI * 2, false)
c.stroke()

// Multiple cirecles
for (let i = 0; i < 3; i++) {
	c.beginPath()
	c.arc(300+(i *10), 300 + (10 * i), 30, 0, Math.PI * 2, false)
	c.stroke()
}