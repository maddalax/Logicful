<div>
    <div class="row">
        <div class="col-lg-12">
    <div class="card card-body bg-white border-light mb-4">
        <h2 class="h5 mb-4">General information</h2>
        <form>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="mb-3">
                        <label for="first_name">First Name</label>
                        <input class="form-control" id="first_name" type="text" placeholder="Enter your first name">
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="mb-3">
                        <label for="last_name">Last Name</label>
                        <input class="form-control" id="last_name" type="text" placeholder="Also your last name">
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-md-6 mb-3">
                    <div class="mb-3">
                        <label for="birthday">Birthday</label>
                        <input type="text" class="form-control flatpickr-input" id="birthday" data-toggle="date" placeholder="Select your birth date">
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="gender">Gender</label>
                    <select class="form-select" id="gender" aria-label="Default select example">
                        <option>Female</option>
                        <option>Male</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input class="form-control" id="email" type="email" placeholder="name@company.com">
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="mb-3">
                        <label for="phone">Phone</label>
                        <input class="form-control" id="phone" type="number" placeholder="+12-345 678 910">
                    </div>
                </div>
            </div>
            <h2 class="h5 my-4">Adress</h2>
            <div class="row">
                <div class="col-sm-9 mb-3">
                    <div class="mb-3">
                        <label for="address">Address</label>
                        <input class="form-control" id="address" type="text" placeholder="Enter your home address">
                    </div>
                </div>
                <div class="col-sm-3 mb-3">
                    <div class="mb-3">
                        <label for="number">Number</label>
                        <input class="form-control" id="number" type="number" placeholder="No.">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 mb-3">
                    <div class="mb-3">
                        <label for="city">City</label>
                        <input class="form-control" id="city" type="text" placeholder="City">
                    </div>
                </div>
                <div class="col-sm-4 mb-3">
                    <label for="country2">Country</label>
                    <select class="form-select" id="country2" aria-label="Default select example">
                        <option>United States</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Spain</option>
                        <option>Italy</option>
                        <option>Russia</option>
                        <option>Japan</option>
                        <option>India</option>
                        <option>China</option>
                    </select>
                </div>
                <div class="col-sm-4">
                    <div class="mb-3">
                        <label for="zip">ZIP</label>
                        <input class="form-control" id="zip" type="tel" placeholder="ZIP">
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button type="submit" class="btn btn-primary">Save All</button>
            </div>
        </form>
    </div>

    <div class="card card-body bg-white border-light">
        <h2 class="h5 mb-4">Alerts & Notifications</h2>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex align-items-center justify-content-between pl-0 py-3 border-bottom">
                <div>
                    <h3 class="h6 mb-1">Company News</h3>
                    <span class="small">Get Spaces news, announcements, and product updates</span>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckNotifi1" checked>
                    <label class="form-check-label" for="flexSwitchCheckNotifi1"></label>
                </div>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between pl-0 py-3 border-bottom">
                <div>
                    <h3 class="h6 mb-1">Account Activity</h3>
                    <span class="small">Get important notifications about you or activity you've missed</span>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckNotifi2">
                    <label class="form-check-label" for="flexSwitchCheckNotifi2"></label>
                </div>
            </li>
            <li class="list-group-item d-flex align-items-center justify-content-between pl-0 py-3">
                <div>
                    <h3 class="h6 mb-1">Meetups Near You</h3>
                    <span class="small">Get an email when a Dribbble Meetup is posted close to my location</span>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckNotifi3">
                    <label class="form-check-label" for="flexSwitchCheckNotifi3"></label>
                </div>
            </li>
        </ul>
    </div>
        </div>
    </div>
</div>