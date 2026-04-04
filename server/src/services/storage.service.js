const ImageKit = require('@imagekit/nodejs')

const ik = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadfile(buffer) {
    try {
        const res = await ik.files.upload({
            file: buffer.toString("base64"),
            fileName: Date.now() + ".jpg"
        })

        return res

    } catch (err) {
        console.error(err)
        throw err
    }
}


module.exports = uploadfile