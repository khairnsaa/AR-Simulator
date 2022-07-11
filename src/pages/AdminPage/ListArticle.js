import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import { ArticleContext } from "../../context/ArticleContext";
import editIcon from '../../asset/icons/edit.svg'
import deleteIcon from '../../asset/icons/delete.svg'
import { useEffect } from "react";

const AdminPanelListArticle = () => {
    const {articleList, deleteArticle, getArticle} = useContext(ArticleContext)

    useEffect(() => {
        getArticle()
    })

    return ( 
        <div className="admin-panel-container">
            <AdminNavbar />
            <div className="list-container">
                <h1 className="list-title">List Artikel</h1>
                <Link to='/addForm'><button className="btn-edited add-module-btn">Tambah Article</button></Link>
                {articleList.map((article) => (
                    <div className="list" key={article.articleId}>
                        <p className="judul-materi">
                            {article.articleTitle}
                        </p>
                        <div className="call-to-action" id={article.articleId}>
                            <Link to={`/addForm/edit/${article.articleId}`} className="edit-btn">
                                <img src={editIcon} className='cta-btn' alt="edit"  />
                            </Link>
                            <button className="delete-btn">
                                <img src={deleteIcon} className='cta-btn' alt="delete" onClick={(e) => deleteArticle(e.target.parentElement.parentElement.id)} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default AdminPanelListArticle;