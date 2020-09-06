package models

type ChangeFormFolderRequest struct {
	Id           string `json:"id"`
	LastFolderId string `json:"lastFolderId"`
	NewFolderId  string `json:"newFolderId"`
}
