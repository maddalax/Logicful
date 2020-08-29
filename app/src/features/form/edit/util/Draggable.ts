export function transformDraggedElement(el : any, data : any, index : number) {
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
    if(data.name === 'file') {
        el.innerHTML = `<label>New File</label><div class="form-file">
        <input type="file" class="form-file-input" />
        <label class="form-file-label">
          <span class="form-file-text">Choose a file...</span>
          <span class="form-file-button">Browse</span>
        </label>
      </div>`
    }
    if(data.name === 'address') {
        el.innerHTML = `<label>New File</label>
<input class="form-control"/>

<input class="form-control"/>

<div class="container">
  <div class="row">
    <div class="col">
<input class="form-control"/>
    </div>
    <div class="col">
<select class='form-control shadow'><option>Select State</option></select>
    </div>
  </div>
</div>

<input class="form-control"/>

      </div>`
    }
    return el
}
