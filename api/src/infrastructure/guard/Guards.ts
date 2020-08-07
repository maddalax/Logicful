export function assertNotEmpty(value) {
    let isEmpty = !value ? true : false;
    if(value == null) {
        isEmpty = true;
    }
    else if(Array.isArray(value)) {
        isEmpty = value.length === 0;
    }
    else if(typeof value === "object") {
        isEmpty = Object.keys(value).length === 0;
    }
    if(isEmpty) {
        throw new Error("Value was empty. " + JSON.stringify(value));
    }
}

export function assertNotNull(...values : any[]) {
    for(const v of values) {
        if(v == null) {
            throw new Error("Value was null");
        }
    }
}