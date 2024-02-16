import axios from 'axios'

const url_get_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/space?key=" + import.meta.env.VITE_API_KEY

export function getBooks(){

    try{

        return axios.get(url_get_books)
        .then(function(response){
            let spacesFirebase = response.data.documents
            let spaces = []

            for(let sp of spacesFirebase){
                let space = {
                    id: sp.fields.id.stringValue,
                    title: sp.fields.title.stringValue,
                    description: sp.fields.description.stringValue,
                }
                spaces.push(space)
            }
            return spaces
        })

    } catch(e){
        console.error(e)
    }

}

const url_add_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/space?key=" + import.meta.env.VITE_API_KEY

export function addBooksAPI(id, title, category, description){

    try{

        return axios.post(
            url_add_books,
            {
                "fields": {
                "id": {
                    "stringValue": id
                    },
                  "title": {
                    "stringValue": title
                  },
                  "category": {
                    "stringValue": category
                  },
                  "description": {
                    "stringValue": description
                  }
                }
              }
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}

export function updateBooksAPI(id, title, category, description){

    const url_update_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/table/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.patch(
            url_update_books,
            {
                "fields": {
                    "title": {
                        "stringValue": title
                      },
                      "category": {
                        "stringValue": category
                      },
                      "description": {
                        "stringValue": description
                      }
                }
              }
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}

export function deleteBooksAPI(id){

    const url_delete_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/table/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.delete(
            url_delete_books
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}