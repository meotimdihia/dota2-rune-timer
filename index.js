const fastify = require('fastify')({})
const exec = require('child_process').exec

async function beep(loop = 2) {
  for (let i = 0; i < loop; i++) {
    process.stderr.write("\007")
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

exec("ping sgp-1.valve.net", (error, stdout, stderr) => {
  exec("ping sgp-2.valve.net", (error2, stdout2, stderr2) => {
    const match = stdout.match(/Average = (\d+)ms/m)
    const match2 = stdout2.match(/Average = (\d+)ms/m)
    if (match) {
      console.log('ping to Singapore server 1: ' + match[1] + 'ms');
    }
    if (match2) {
      console.log('ping to Singapore server 2: ' + match2[1] + 'ms');
    }
  })
})

const date = new Date()
let alerted = date.getTime() - 30000
let alertedBounty = date.getTime() - 30000

fastify.post('/', (request, reply) => {
  
  if (    request.body && request.body.auth
      &&  request.body && request.body.map
      && request.body.map.clock_time
  ) {
    if (request.body.auth.token != 'hello1234') {
      console.log('The token need to be "hello1234"')
    }

    const time = Number(request.body.map.clock_time)
    const date = new Date()
    
    // alert for rune on the river
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
    console.log(`Time ${minute}' ${Math.floor(time % 60)}, GPM: ${request.body.player.gpm}, XPM: ${request.body.player.xpm}`)
  }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    console.log(`-----`)
    console.log(`Server listening on ${fastify.server.address().port}`)
    console.log(`-----`)
    console.log(`Please copy file: "gamestate_integration_runetimer.cfg" to "{steam_directory}\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration\\gamestate_integration_runetimer.cfg"`)
    console.log(`-----`)
    console.log(`The default steam path is "C:\\Program Files (x86)\\Steam\\steamapps\\common\\dota 2 beta\\game\\dota\\cfg\\gamestate_integration\\gamestate_integration_runetimer.cfg"`)
    console.log(`-----`)
    console.log(`When time for runes is comming, the program alert system beep`)
    console.log(`Beep should be alert 2 times for runes on river, and 3 times for bounty runes`)
    console.log(`-----`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
