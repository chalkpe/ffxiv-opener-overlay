const getHost = () => /HOST_PORT=(wss?:\/\/.+)/.exec(window.location.search)

function listenOverlayPlugin (callback) {
  document.addEventListener('onLogLine', e => {
    const { opcode, payload } = e.detail

    switch (opcode) {
      case 0:
        if (payload[0] === '0038') return callback({ type: 'cmd', args: payload[2] })
        if (payload[0] === '082b') return callback({ type: 'use', message: payload[2] })
        break

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
  const ws = new WebSocket(url + 'BeforeLogLineRead')
  ws.onerror = () => listenACTWebSocket(url, callback)
  ws.onmessage = function (e, m) {
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

      case 'Chat':
        m = payload.split('|')
        if (m[0] === '00' && m[2] === '0038') return callback({ type: 'cmd', args: m[4] })
        if (m[0] === '00' && m[2] === '082b') return callback({ type: 'use', message: m[4] })
        if (m[0] === '03') return callback({ type: 'add', id: parseInt(m[2], 16), job: m[4], level: parseInt(m[5], 16), server: m[8] })
    }
  }

  window.addEventListener('unload', () => ws.close())
}

export default function (callback) {
  try {
    const m = getHost()
    if (!m) listenOverlayPlugin(callback)
    else listenACTWebSocket(m[1], callback)
  } catch (err) {
    console.error(err)
  }
}