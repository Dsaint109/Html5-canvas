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

		for (let i = 0; i < 500; i++) {
			this.circles.push(new Circle({
				context: this.context, 
				width: this.canvas.width, 
				height: this.canvas.height, 
				x: this.canvas.width/2, 
				y: this.canvas.height/2, 
				dx: Math.random() * 7, 
				dy: Math.random() * 5,
				radius: Math.floor(Math.random() * 9 + 1)
			}))	
		}
	}

	draw() {
		this.clear();

		for (let i = 0; i < this.circles.length; i++) {		
			this.circles[i].draw()
		}
	}

	animate() {
		this.draw();
		this.animationFrame = window.requestAnimationFrame(() => this.animate());
	}
}


class Circle 
{
	constructor(options) {
		this.width = options.width
		this.height = options.height
		this.context = options.context
		
		this.maxRadius = 75
		this.minRadius = 5

		this.x = options.x || 200
		this.y = options.y || 200
		this.dx = options.dx || 5
		this.dy = options.dy || 5
		this.radius = options.radius || 100

		this.colors = ['#e57373', '#99edcc', '#9a275a', '#274156', '#d81e5b', '#3a335']
		this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
	}

	draw() {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		this.context.fillStyle = this.color
		this.context.fill()
		this.update()
	}

	update() {
		if (this.x + this.radius > this.width || this.x - this.radius < 0)
			this.dx = -this.dx;

		if (this.y + this.radius > this.height || this.y - this.radius < 0)
			this.dy = -this.dy;

		this.x += this.dx
		this.y += this.dy

		// Interactivity
		if (mouse.x - this.x < 150 && mouse.x - this.x > -150 
			&& mouse.y - this.y < 150 && mouse.y - this.y > -150)
			this.radius += (this.radius < this.maxRadius) ? 2: 0
		else if (this.radius > this.minRadius)
			this.radius -= 2
	}
}

const mouse = {
	x: undefined,
	y: undefined
}

const cnvs = new Canvas(document.querySelector('canvas'))

window.addEventListener('mousemove', function (event) {
	mouse.x = event.x
	mouse.y = event.y
})