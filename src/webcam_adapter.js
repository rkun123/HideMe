import virtualcam from 'node-virtualcam'

const fps = 30
let started = false

const initCam = () => (virtualcam)

const startCam = (cam, width, height) => {
    if(started) {
        console.info('Virtualcam has already started.')
        return cam
    }

    console.log('Start cam', width, height)
    try {
        cam.start(width, height, fps, 10)
    } catch(e) {
        console.error(e)
    }
    started = true
    console.log(`virtual cam output started (${width}x${height} @ ${fps}fps)`);
    return cam
}

const sendFrame = (cam, frame, data) => {
    console.info(`frame: ${frame}`)
    cam.send(frame, data)
}

const stopCam = (cam) => {
    try {
        cam.stop()
    } catch(e) {
        console.error(e)
    }
    console.log('Stop camera')
}

export { initCam, startCam, stopCam, sendFrame }