const isCmdOpcode = (opcode) => opcode?.toLowerCase() === '0038'
const isUseOpcode = (opcode) => opcode?.toLowerCase() === '082b'

const getHostPort = () => new URLSearchParams(document.location.search).get('HOST_PORT')

const num = (data) => (typeof data === 'string' ? parseInt(data, 16) : data)
const hex = (data) => (typeof data === 'number' ? data.toString(16) : data).toLowerCase()

function listenOverlayPlugin (callback) {
  window.addOverlayListener('ChangePrimaryPlayer', data => {
    callback({
      type: 'me',
      name: data.charName,
      id: hex(data.charID)
    })
  })

  window.addOverlayListener('LogLine', data => {
    const [opcode, timestamp, ...payload] = data.line
    switch (opcode) {
      case '03':
        return callback ({
          type: 'add',
          id: hex(payload[0]),
          job: hex(payload[2]),
          level: num(payload[3]),
          server: payload[6]
        })

      case '00':
        if (isCmdOpcode(payload[0])) return callback({ type: 'cmd', args: payload[2] })
        if (isUseOpcode(payload[0])) return callback({ type: 'use', timestamp, message: payload[2] })
        return
    }
  })

  window.startOverlayEvents()
}

function listenACTWebSocket (url, callback) {
  const ws = new WebSocket(new URL('/BeforeLogLineRead', url).href)

  ws.onerror = () => setTimeout(listenACTWebSocket(url, callback), 1000)
  ws.onmessage = function (e) {
    if (e.data === '.') return ws.send('.')
    const { msgtype: opcode, msg: payload } = JSON.parse(e.data)

    switch (opcode) {
      case 'SendCharName':
        return callback({
          type: 'me',
          name: payload.charName,
          id: hex(payload.charID)
        })

      case 'AddCombatant':
        return callback({
          type: 'add',
          id: hex(payload.id),
          job: hex(payload.job),
          level: num(payload.level)
        })

      case 'Chat': {
        const m = payload.split('|')

        if (m[0] === '00' && isCmdOpcode(m[2])) {
          return callback({ type: 'cmd', args: m[4] })
        }

        if (m[0] === '00' && isUseOpcode(m[2])) {
          return callback({ type: 'use', timestamp: m[1], message: m[4] })
        }

        if (m[0] === '03') {
          return callback({
            type: 'add',
            id: hex(m[2]),
            job: hex(m[4]),
            level: num(m[5]),
            server: m[8]
          })
        }
      }
    }
  }

  window.addEventListener('unload', () => ws.close())
}

export default function (callback) {
  const hostPort = getHostPort()
  try {
    if (hostPort) {
      listenACTWebSocket(hostPort, callback)
    } else {
      listenOverlayPlugin(callback)
    }
  } catch (err) {
    console.error(err)
  }
}