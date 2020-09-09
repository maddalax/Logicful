package searcher

import (
	"fmt"
	"github.com/blevesearch/bleve"
	"github.com/logicful/service/storage"
	"io/ioutil"
	"os"
)

func Index(key string, id string, data interface{}) (bleve.Index, error) {
	files := []string{
		"store",
		"index_meta.json",
	}
	noIndex := false
	var path = "/tmp/" + key
	err := os.Mkdir(path, 0644)
	if err != nil {
		return nil, err
	}
	for i := range files {
		bytes, err := storage.DownloadToBytes("search-indexes", key+files[i])
		if err != nil {
			return nil, err
		}
		if bytes == nil {
			noIndex = true
			break
		}
		err = ioutil.WriteFile(path+"/"+files[i], bytes, 0644)
		if err != nil {
			return nil, err
		}
	}
	var index bleve.Index
	if noIndex {
		mapping := bleve.NewIndexMapping()
		index, err := bleve.New(path, mapping)
		if err != nil {
			return nil, err
		}
		err = index.Index(key, data)
		if err != nil {
			return nil, err
		}
	} else {
		index, err := bleve.Open(path)
		if err != nil {
			return nil, err
		}
		err = index.Index(id, data)
		if err != nil {
			return nil, err
		}
	}
	dirFiles, err := ioutil.ReadDir(path)
	for i := range dirFiles {
		println(dirFiles[i].Name())
	}
	for i := range files {
		bytes, err := ioutil.ReadFile(path + "/" + files[i])
		if err != nil {
			return nil, err
		}
		_, err = storage.SetBytes(bytes, key+files[i], "search-indexes", "private")
		if err != nil {
			return nil, err
		}
	}

	return index, nil
}

func Search(key string, q string) ([]string, error) {
	files := []string{
		"store",
		"index_meta.json",
	}
	noIndex := false
	var path = "/tmp/" + key
	err := os.Mkdir(path, 0644)
	if err != nil {
		return nil, err
	}
	for i := range files {
		bytes, err := storage.DownloadToBytes("search-indexes", key+files[i])
		if err != nil {
			return nil, err
		}
		if bytes == nil {
			noIndex = true
			break
		}
		err = ioutil.WriteFile(path+"/"+files[i], bytes, 0644)
		if err != nil {
			return nil, err
		}
	}

	if noIndex {
		return nil, nil
	}

	index, err := bleve.Open(path)
	if err != nil {
		return nil, err
	}

	query := bleve.NewQueryStringQuery(q)
	search := bleve.NewSearchRequest(query)
	search.Fields = []string{"*"}
	count, _ := index.DocCount()
	println(count)
	searchResults, err := index.Search(search)
	if err != nil {
		return nil, err
	}
	var result []string
	for i := range searchResults.Hits {
		doc := searchResults.Hits[i].Fields
		result = append(result, fmt.Sprint(doc[""]))
	}
	return result, nil
}
