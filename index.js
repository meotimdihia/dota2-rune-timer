const fastify = require('fastify')({})

async function beep(loop = 2) {
  for (let i = 0; i < loop; i++) {
	  process.stderr.write("\007")
	  await new Promise(resolve => setTimeout(resolve, 500))
  }
}
// Declare a route

const date = new Date()
let alerted = date.getTime() - 30000
let alertedBounty = date.getTime() - 30000
fastify.post('/', (request, reply) => {
	
	if (request.body && request.body.map && request.body.map.clock_time) {
		
		const time = Number(request.body.map.clock_time)
		
		// alert for rune on the river
		const date = new Date()

		if (date.getTime() - alerted > 30000 && (Math.round(time / 60) % 2 == 0) && (time % 60 > 30) && (time % 60 < 45)) {
			alerted = date.getTime()
			console.log("Check runes on the river!")
			beep()
		}
		
		// alert for bounty runes
		if (date.getTime() - alertedBounty > 30000 && (Math.round(time / 60) % 5 == 0) && (time % 60 > 30) && (time % 60 < 45)) {
			alertedBounty = date.getTime()
			console.log("Check bounty runes!")
			beep(3)
		}
		
		let minute
		if (time > 0) {
			minute = Math.floor(time / 60)
		} else {
			minute = Math.floor(time / 60) + 1
		}
		console.log(`time ${minute}' ${Math.floor(time % 60)}`)
	}
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    console.log(`Server listening on ${fastify.server.address().port}`)
	console.log(`\n`)
	console.log(`Please copy file: "gamestate_integration_runetimer.cfg" to "{steam_directory}\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\gamestate_integration_runetimer.cfg"`)
	console.log(`\n`)
	console.log(`The default steam path is "C:\Program Files (x86)\Steam\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\gamestate_integration_runetimer.cfg"`)
	console.log(`\n`)
	
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()