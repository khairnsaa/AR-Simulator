import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ArticleContext } from "../../context/ArticleContext";
import { Editor } from '@tinymce/tinymce-react';

const AddArticleForm = () => {
    const {id} = useParams()
    const {handleChangeArticle, addArticle, handleDescription, handleImage, editArticle, article, updateArticle} = useContext(ArticleContext)
    const navigate = useNavigate();

    const goBack = () => navigate(-1)

    const handleSubmitArticle = (e) => {
        e.preventDefault()
        goBack()
        if(id === undefined) addArticle()
        else updateArticle(id)
    }

    useEffect(() => {
        console.log(id)
        if(id !== undefined) {
            editArticle(id)
            console.log(article)
        }
        
    },[])

    const editorRef = useRef(null);

    
    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <div style={{"width": "80vw", "margin": "auto"}}>
                <h1>Form Tambah Artikel</h1>
            </div>
            <form onSubmit={handleSubmitArticle}>
                <input 
                    type="text" 
                    name='title' 
                    required 
                    placeholder="Judul Artikel" 
                    value={article.title}
                    className="input-judul input-text" 
                    onChange={handleChangeArticle}
                />
                <section className="add-image">
                    <label htmlFor="modelAR">Image:</label>
                    <input 
                        type="file" 
                        name='image' 
                        required 
                        className="input-image" 
                        accept="image/*" 
                        onChange={handleImage}
                        value={article.image}
                    />
                </section>
                <input 
                    type="text" 
                    name='category' 
                    required 
                    value={article.category}
                    placeholder="kategori Artikel" 
                    className="input-kategori input-text" 
                    onChange={handleChangeArticle}
                />
                <Editor
                    textareaName="description"
                    value={article.description}
                    onEditorChange={(newValue, editor) => handleDescription(newValue)}
                    apiKey="8dotdc22kact10o1q74xf3s2eurvoappeug7wgxa90gwt1sq"
                    onInit={(evt, editor) => editorRef.current = editor}
                    plugins={['lists', 'nonbreaking', 'preview', 'image']}
                    init={{
                    menubar: false,
                    toolbar: 'undo redo | ' +
                    'bold italic underline | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' + 'blockquote image |', 
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                />
                <button className="add-form-btn btn-edited">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddArticleForm;