document.addEventListener('DOMContentLoaded', () => {
	const cnv = document.querySelector('#cnv')
	const ctx = cnv.getContext('2d')
	const nodesAmount = parseInt(prompt('Please input the amount of nodes'))
	let search = new NodeManager(nodesAmount, ctx, cnv.width, cnv.height)
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, cnv.width, cnv.height)
	search.selectNode(0)
	//search.render()
	search.chooseNeighbour()
	console.log(search.list.pathLength)
	//console.log()
	//let myNode = new Node(10, 12)
///	for (let i = 0 ; i < nodesAm)

	//console.log(myNode.getX())
})
