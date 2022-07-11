import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ModuleContext } from "../../context/ModuleContext";
import { useParams } from "react-router"
import { Editor } from '@tinymce/tinymce-react';

const AddTheoryForm = () => {
    const {id, theoryId} = useParams()
    const {
        handleChangeTheory, 
        addTheory, 
        getDetailModule, 
        module, 
        handleImage, 
        handleDescription, 
        checkTheoryNumber, 
        checkLabNumber,
        theory,
        theoryDescription,
        getDetailTheory,
        updateTheory
    } = useContext(ModuleContext)

    const navigate = useNavigate();
    const editorRef = useRef(null);
    const goBack = () => navigate(-1)

    useEffect(() => {
        getDetailModule(id)
        checkTheoryNumber()
        checkLabNumber()
        getDetailTheory(theoryId)
        console.log(theory) 
    }, [])

    const handleSubmitTheory = (e) => {
        if(theoryId !== undefined) updateTheory(theoryId)
        else addTheory(id, module.moduleNumber, module.moduleTitle)
        goBack()
        e.preventDefault()
    }   

    return (
        <div className="admin-form-container">
            <AdminNavbar />
            <h1>Form Tambah Materi</h1>
            <form onSubmit={handleSubmitTheory}>
                <input 
                    type="text" 
                    name='title' 
                    id='title' 
                    required
                    value={theory.title}
                    placeholder="Judul Materi" 
                    className="input-judul input-text" 
                    onChange={handleChangeTheory}
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
                    ></input>
                </section>
                <Editor
                    textareaName="description"
                    value={theoryDescription }
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
                <button style={{"marginTop": '1rem'}} className="add-form-btn btn-edited">Tambah</button>
            </form>
        </div>
    );
}
 
export default AddTheoryForm;