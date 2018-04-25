const mouse = {
	x: undefined,
	y: undefined
}


class Canvas
{
	constructor(element, context = '2d') {
		this.canvas = element
		this.context = this.canvas.getContext(context)

		window.addEventListener('resize', () => this.init())

		this.init()
	}

	init() {
		this.stop()
		this.clear()

		this.resize()

		this.createCircles()
		this.animate()
	}

	stop() {
		window.cancelAnimationFrame(this.animationFrame)
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	createCircles() {
		this.circles = []

		this.circles[0] = new Circle({context: this.context, x: window.innerWidth/2, y: window.innerHeight/2, radius: 100, color: '#99edcc'})
		this.circles[1] = new Circle({context: this.context, x: undefined, y: undefined, radius: 30, color: '#274156', bind: mouse})
	}

	draw() {
		this.clear();

		for (let i = 0; i < this.circles.length; i++) {		
			this.circles[i].draw();
		}
	}

	getDistance() {
		let x = this.circles[0].x - this.circles[1].x
		let y = this.circles[0].y - this.circles[1].y
		let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
		return z
	}

	animate() {
		this.draw();
		this.animationFrame = window.requestAnimationFrame(() => this.animate());
		
		if (this.getDistance() < (this.circles[0].radius + this.circles[1].radius))
			this.circles[0].color = this.circles[1].color
		else
			this.circles[0].color = '#99edcc'
	}
}

class Circle 
{
	constructor(options) {
		this.context = options.context
		this.x = options.x 
		this.y = options.y
		this.radius = options.radius
		this.color = options.color 
		this.bind = options.bind || null
	}

	draw() {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		this.context.fillStyle = this.color
		this.context.fill();
		this.context.closePath();
		this.update()
	}

	update() {
		if (this.bind !== null) {
			this.x = this.bind.x
			this.y = this.bind.y	
		}
	}
}

const cnvs = new Canvas(document.querySelector('canvas'))

window.addEventListener('mousemove', function (event) {
	mouse.x = event.x
	mouse.y = event.y
})