import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookie"

export const ArticleContext = createContext()

export const ArticleContextProvider = ({ children }) => {

    const token = Cookies.get('token')

    // Article State
    const [ articleList, setArticleList ] = useState([])
    const [ article, setArticle ] = useState({
        title: '',
        category: '',
    })
    const [articleDescription, setArticleDescription] = useState('')
    const [image, setImage] = useState(null)

    // Theory CRUD
    const getArticle = async () => {
        const result = await axios.get('http://localhost:8000/api/article')
        const data = result.data.results
        setArticleList(data.map(article => {
            return {
                articleTitle: article.title,
                articleCategory: article.category,
                articleId: article.id
            }
        }))
    }

    const handleChangeArticle = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        })
    }

    const handleDescription = (desc) => {
        const str = desc.replace(/^\<p\>/,"").replace(/\<\/p\>$/,"");
        setArticleDescription(str)
    }

    const handleImage = (e) => setImage(e.target.files[0])

    const addArticle = () => {
        const data = new FormData()
        data.append("title", article.title)
        data.append("category", article.category)
        data.append("description", articleDescription)
        data.append("image", image, image.name)
        axios.post(`http://localhost:8000/api/article/create`, data,
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))

        setArticle({
            articleTitle: '',
            articleCategory: '',
        })
        setImage(null)
        setArticleDescription('')
    }

    // get module value so it can be updated
    const editArticle = async (id) => {
        const result = await axios.get(`http://localhost:8000/api/article/${id}`, {headers: {"Authorization" : "Bearer "+ token}})
        const data = result.data.data;
        setArticle({
            title: data.title,
            category: data.category
        })
        setArticleDescription(data.description)
        setImage(data.image)
        
    }
    
    // updating module
    const updateArticle = async(id) => {
        const dataNew = new FormData()
        dataNew.set("title", article.title)
        dataNew.set("category", article.category)
        dataNew.set("description", articleDescription)
        dataNew.set("image", image, image.name)
        axios.put(`http://localhost:8000/api/article/${id}/update`, dataNew, 
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
    }
    
    const deleteArticle = (articleId) => {
        axios.delete(`http://localhost:8000/api/article/${articleId}`,
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
    }

    return (
        <ArticleContext.Provider value={{
            getArticle,
            articleList,
            addArticle,
            handleChangeArticle,
            handleDescription,
            handleImage,
            deleteArticle,
            editArticle,
            article,
            updateArticle
        }}>
           {children} 
        </ArticleContext.Provider>
    )
}