const Twitter = require("twitter");

function newClient(subdomain = 'api') {
  return new Twitter({
    subdomain,
    consumer_key: process.env.LEGEND_API_KEY_TWITTER,
    consumer_secret: process.env.LEGEND_API_SECRET_KEY_TWITTER,
    access_token_key: process.env.LEGEND_ACCESS_TOKEN_TWITTER,
    access_token_secret: process.env.LEGEND_ACCESS_TOKEN_SECRET_TWITTER,
  });
}

const uploadClient = newClient('upload')
const apiClient = newClient()

const fs = require("fs")
const { gifLibrary } = require('./message-library/gif-listing')

const pathToFile = './message-library/gif-library/' + gifLibrary[Math.floor(Math.random() * gifLibrary.length)];
const mediaType = "image/gif"

const mediaData = fs.readFileSync(pathToFile)
const mediaSize = fs.statSync(pathToFile).size

async function initializeMediaUpload(status) {
  try {
    const res = await uploadClient.post("media/upload", {
      command: "INIT",
      total_bytes: mediaSize,
      media_type: mediaType
    })
    return await appendFileChunk(res.media_id_string, status)
  } catch (e) {
    console.log("error in initialize : ", e)
  }
}

async function appendFileChunk(mediaId, status) {
  try {
    await uploadClient.post("media/upload", {
      command: "APPEND",
      media_id: mediaId,
      media: mediaData,
      segment_index: 0
    })
    return await finalizeUpload(mediaId, status);
  } catch (e) {
    console.log("error append : ", e)
  }
}

async function finalizeUpload(mediaId, status) {
  try {
    await uploadClient.post("media/upload", {
      command: "FINALIZE",
      media_id: mediaId
    })
    return await publishStatusUpdate(mediaId, status)
  } catch (e) {
    console.log('error in finalize :', e)
  }
}

async function publishStatusUpdate(mediaId, status) {
  try {
    const res = await apiClient.post("statuses/update", {
      status,
      media_ids: mediaId
    })
    return res;
  } catch (e) {
    console.log("error publish: ", e)
    return e
  }
}

module.exports = { initializeMediaUpload }