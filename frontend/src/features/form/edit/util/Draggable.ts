export function transformDraggedElement(el, data) {
    if(data.name === 'string') {
        el.innerHTML = "<label>New Text Input</label><input class='form-control shadow'/>";
    }
    if(data.name === 'combobox') {
        el.innerHTML = "<label>New Dropdown</label><select class='form-control shadow'><option>Dropdown Value</option></select>";
    }
    if(data.name === 'switch') {
        el.innerHTML = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">New Toggle</label>
            </div>`
    }
    if(data.name === 'date') {
        el.innerHTML = "<label>New Date</label><input type='date' class='form-control shadow'></input>";
    }
    if(data.name === 'block') {
        el.innerHTML = "<div style='background-color: #f0f0f0;margin-top:5px;padding: 10px 10px 3px;border-radius: 0.45em'><h5>New Content Block</h5><p>Content will display here.</p></div>"
    }
    return el
}