import sharp from 'sharp'

const saveImage = (data) => {
    sharp(data, {
        raw: {
            width: 640,
            height: 480,
            channels: 4
        }
    }).toFile('./test.png', (e) => {
        console.error(e)
    })

}
export default saveImage