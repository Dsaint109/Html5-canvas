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
		this.circle = new Circle({
			context: this.context, 
			width: this.canvas.width, 
			height: this.canvas.height, 
			x: this.canvas.width/2, 
			y: this.canvas.height/2, 
			radius: 40
		})
	}

	draw() {
		this.clear();		
		this.circle.draw()
	}

	animate() {
		this.draw();
		this.animationFrame = window.requestAnimationFrame(() => this.animate());
	}
}

class Circle
{
	constructor(options) {
		this.context = options.context
		this.width = options.width
		this.height = options.height

		this.x = options.x || this.width/2
		this.y = options.y || this.height/2
		this.radius = options.radius || 75

		this.dy = 5
		this.gravity = 1
		this.friction = 0.95
	}

	draw() {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		this.context.fillStyle = '#e57373'
		this.context.fill()
		this.update()
	}

	update() {
		if (this.y + this.radius > this.height)
			this.dy = -this.dy * this.friction; 
		else
			this.dy += this.gravity
		this.y += this.dy
	}
}

const cnvs = new Canvas(document.querySelector('canvas'))