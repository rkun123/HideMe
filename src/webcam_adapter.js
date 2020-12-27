import virtualcam from 'node-virtualcam'

const fps = 30
const initCam = () => {

}

const startCam = (width, height) => {
    console.log('Start cam', width, height)
    virtualcam.stop()
    virtualcam.start(width, height, fps, 10)
    console.log(`virtual cam output started (${width}x${height} @ ${fps}fps)`);
    return virtualcam
}

const sendFrame = (cam, frame, data) => {
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

export { startCam, stopCam, sendFrame }