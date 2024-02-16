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