const getHost = () => /HOST_PORT=(wss?:\/\/.+)/.exec(window.location.search)

function listenOverlayPlugin (callback) {
  document.addEventListener('onLogLine', e => {
    console.log(e.detail)
    const { opcode, payload } = e.detail

    switch (opcode) {
      case 0:
        if (payload[0] !== '082b') return
        return callback({
          type: 'use',
          message: payload[2]
        })

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
        })
    }
  })
}

function listenACTWebSocket (url, callback) {
  const ws = new WebSocket(url + 'OnLogLineRead')
  ws.onerror = () => listenACTWebSocket(url, callback)
  ws.onmessage = function (e, m, a) {
    if (e.data === '.') return ws.send('.')

    console.log(e.data)
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
        m = payload.slice(15).split(':')
        a = m.slice(2).join(':')

        if (m[0] === '00' && m[1] === '0038') return callback({ type: 'cmd', args: a })
        if (m[0] === '00' && m[1] === '082b') return callback({ type: 'use', message: a })
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