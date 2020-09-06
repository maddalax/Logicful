package models

type Changeable struct {
	ChangeDate string `json:"changeTime"`
	ChangeBy   string `json:"changeBy"`
}

type Creatable struct {
	CreationDate string `json:"creationDate"`
	CreateBy     string `json:"createBy"`
}

type Versioned struct {
	Version int64 `json:"version,omitempty"`
}

type TokenResponse struct {
	Token      string `json:"token"`
	Expiration int64  `json:"expiration"`
}
