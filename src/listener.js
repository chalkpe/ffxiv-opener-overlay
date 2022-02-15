const isCmdOpcode = (opcode) => opcode?.toLowerCase() === '0038'
const isUseOpcode = (opcode) => opcode?.toLowerCase() === '082b'

const getHost = () => new URLSearchParams(document.location.search).get('HOST_PORT')

function listenOverlayPlugin (callback) {
  document.addEventListener('onLogLine', e => {
    const { opcode, payload } = e.detail

    switch (opcode) {
      case 0:
        if (isCmdOpcode(payload[0])) return callback({ type: 'cmd', args: payload[2] })
        if (isUseOpcode(payload[0])) return callback({ type: 'use', message: payload[2] })
        return

      case 2:
        return callback({
          type: 'me',
          id: payload[0],
          name: payload[1]
        })

      case 3:
        return callback ({
          type: 'add',
          id: payload[0],
          job: payload[2],
          level: parseInt(payload[3], 16),
          server: payload[6]
        })
    }
  })
}

function listenACTWebSocket (url, callback) {
  // TODO: Add support ModernApi for OverlayPlugin
  const ws = new WebSocket(new URL('/BeforeLogLineRead', url).href)

  ws.onerror = () => setTimeout(listenACTWebSocket(url, callback), 1000)
  ws.onmessage = function (e) {
    if (e.data === '.') return ws.send('.')
    const { msgtype: opcode, msg: payload } = JSON.parse(e.data)

    switch (opcode) {
      case 'SendCharName':
        return callback({
          type: 'me',
          id: payload.charID,
          name: payload.charName
        })

      case 'AddCombatant':
        return callback({
          type: 'add',
          id: payload.id,
          level: payload.level,
          job: payload.job.toString(16),
        })

      case 'Chat': {
        const m = payload.split('|')
        if (m[0] === '00' && isCmdOpcode(m[2])) return callback({ type: 'cmd', args: m[4] })
        if (m[0] === '00' && isUseOpcode(m[2])) return callback({ type: 'use', message: m[4] })
        if (m[0] === '03') {
          return callback({
            type: 'add',
            id: parseInt(m[2], 16),
            job: m[4].toLowerCase(),
            level: parseInt(m[5], 16),
            server: m[8]
          })
        }

        return
      }
    }
  }

  window.addEventListener('unload', () => ws.close())
}

export default function (callback) {
  try {
    const m = getHost()
    m ? listenACTWebSocket(m, callback) : listenOverlayPlugin(callback)
  } catch (err) {
    console.error(err)
  }
}