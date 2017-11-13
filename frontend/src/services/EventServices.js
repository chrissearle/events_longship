function getEvent(event, cb) {
    return fetch(`/event/${event}/`, {
        accept: 'application/json',
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(`HTTP Error ${response.statusText}`)
    error.status = response.statusText
    error.response = response
    throw error
}

function parseJSON(response) {
    return response.json()
}

function sendAnswer(event, answer, cb) {
    return fetch(`/event/${event}/attend`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(answer)
    })
        .then(checkStatus)
        .then(cb)
}

const EventService = {getEvent, sendAnswer}

export default EventService