'use strict'

let path = require('path')
let fs = require('fs')
let readline = require('readline')
let ytdl = require('youtube-dl')
let randomstring = require('randomstring')

/**
 * Parse youtube playlist and convert video stream to mp4
 * @params {String} url - youtube playlist url
 */
function parsePlaylist(url) {

    let video = ytdl(url)
    let downloadPath = '' //please set download path 

    video.on('error', (err) => {
        console.log('error 2:', err)
    })

    let size = 0
    video.on('info', (info) => {
        size = info.size
        let output = downloadPath + randomstring.generate(7) + '.mp4'
        video.pipe(fs.createWriteStream(output))
    })

    let pos = 0
    video.on('data', (chunk) => {
        pos += chunk.length
        // `size` should not be 0 here.
        if (size) {
            let percent = (pos / size * 100).toFixed(2)
            readline.cursorTo(process.stdout, 0)
            readline.clearLine(process.stdout, 1)
            process.stdout.write(percent + '%')
        }
    })

    video.on('complete', (info) => {
        console.log('filename: ' + info._filename + ' already downloaded.')
    })

    video.on('next', playlist)

}

/**
 * TODO - please change the playlist code, ex:listCode = 'PLsyOSbh5bs15OXJIigNdRgK0za-JXwhz1'
 */
let listCode = ''
parsePlaylist('https://www.youtube.com/playlist?list=' + listCode)