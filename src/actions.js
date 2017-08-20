const ActionTypes = {
    data: {
        pending: 'DATA_PENDING',
        arrived: 'DATA_ARRIVED'
    },
    input: {
        change: 'INPUT_CHANGED'
    },
    error: 'ERROR'
}

const Actions = {
    pending() {
        return {
            type: ActionTypes.data.pending
        }
    },
    arrived(bpi) {
        return {
            type: ActionTypes.data.arrived,
            bpi
        }
    },
    change(value) {
        return {
            type: ActionTypes.input.change,
            value
        }
    },
    error(err) {
        return {
            type: ActionTypes.error,
            error: err
        }
    }
}

export { ActionTypes, Actions as default };
