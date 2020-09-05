package models

type Changeable struct {
	ChangeTime string `json:"changeTime"`
	ChangeBy   string `json:"changeBy"`
}

type Creatable struct {
	CreateTime string `json:"createTime"`
	CreateBy   string `json:"createBy"`
}

type Versioned struct {
	Version int64 `json:"version,omitempty"`
}
