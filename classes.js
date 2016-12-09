class Node {
	constructor (constrX, constrY) {
		this.x = constrX
		this.y = constrY
		this.checked = false
	}
}

class NodeManager {
	constructor (amount, ctx, width, height) {
		this.cnv = {
			width: width,
			height: height,
			ctx: ctx
		}
		this.checkedNodes = 0
		this.pathLength = 0
		this.list = new Array(amount)
		this.list = Array(... Array(amount)).map( () => {} )
		this.list = this.list.map( (element, index) => {
			let x = Math.round( Math.random() * width )
			let y = Math.round( Math.random() * height )
			return new Node(x, y)
		})
	}
	selectNode(id) {
		this.list[id].checked = true
		this.checkedNodes++
		this.selectedNode = id
	}
	chooseNeighbour() {
		//console.log(this)
		let listOfDistances = Array(... Array(this.list.length)).map( () => {} )
		let x = this.list[this.selectedNode].x
		let y = this.list[this.selectedNode].y
		let shortestDist = {dist: Infinity, id: 0}
		listOfDistances.map( () => Infinity)
		listOfDistances.map( (element, index) => {
			let loopedNode = this.list[index]
			if (loopedNode.checked) return element
			let distX = Math.abs(x - loopedNode.x)
			let distY = Math.abs(y - loopedNode.y)
			let overallDistance = Math.sqrt(distX * distX + distY * distY)
			//console.log()
			if (overallDistance < shortestDist.dist) {
				shortestDist.dist = overallDistance
				shortestDist.id = index
			}
			return overallDistance
		})
		if (shortestDist.dist !== Infinity) {
			this.selectNode(shortestDist.id)
			//console.log(this.pathLength)
			this.pathLength += shortestDist.dist
			let strokeData = {
				source: {
					x: x,
					y: y
				},
				target: {
					x: this.list[shortestDist.id].x,
					y: this.list[shortestDist.id].y
				}
			}
			//console.log(strokeData)
			this.render(strokeData)
			setTimeout(that => this.chooseNeighbour(that), 100, this)
		} else {
			//console.log('end')
			window.alert('Result: ' + this.pathLength)
		}

	}
	render(stroke) {
		let cnv = this.cnv
		//cnv.ctx.fillStyle = 'black'
		//cnv.ctx.fillRect(0, 0, cnv.width, cnv.height)
		this.list.forEach( element => {
			cnv.ctx.fillStyle = (element.checked) ? 'red' : 'white'
			cnv.ctx.fillRect(element.x, element.y, 2, 2)
		})
		cnv.ctx.strokeStyle = 'white'
		cnv.ctx.beginPath()
		cnv.ctx.moveTo( stroke.source.x, stroke.source.y )
		cnv.ctx.lineTo( stroke.target.x, stroke.target.y )
		cnv.ctx.stroke()
	}
}
