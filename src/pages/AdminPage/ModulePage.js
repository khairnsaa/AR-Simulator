import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import editIcon from '../../asset/icons/edit.svg'
import deleteIcon from '../../asset/icons/delete.svg'
import { ModuleContext } from "../../context/ModuleContext";
import { useEffect } from "react";
import { useParams } from "react-router"

const ModulePage = () => {
    let { id } = useParams()

    const {
        getDetailModule, 
        module, 
        theoryList, 
        labList, 
        deleteTheory, 
        deleteLab,
    } = useContext(ModuleContext)

    useEffect(() => {
        getDetailModule(id)
    }, [theoryList])

    return (
        <div>
            <AdminNavbar />
            <div className="module-page-body">
                <h1>{`Modul ${module.moduleNumber}: ${module.moduleTitle}`}</h1>
                <div className="theory-list">
                    <div className="title-btn">
                        <h3>Theory</h3>
                        <Link to={`/addTheoryForm/${id}`} className="btn-edited add-btn">Tambah Materi</Link>
                    </div>
                    {theoryList.map(theory => (
                        <div className="list" key={theory.title}>
                            <p className="judul-materi">
                                {`${theory.moduleNumber}.${theory.theoryNumber}: ${theory.title}`}
                            </p>
                            <div className="call-to-action">
                                <Link to={`/addTheoryForm/edit/${id}/${theory.theoryId}`} className="edit-btn" value={theory.theoryNumber}>
                                    <img src={editIcon} className='cta-btn' alt="edit"/>
                                </Link>
                                <button className="delete-btn" value={theory.theoryNumber}>
                                    <img src={deleteIcon} className='cta-btn' alt="delete" onClick={() => deleteTheory(theory.moduleId, theory.theoryId)} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lab-list">
                    <div className="title-btn">
                        <h3>Lab</h3>
                        <Link to={`/addLabForm/${id}`} className="btn-edited add-btn">Tambah Lab</Link>
                    </div>
                    {labList.map(lab => (
                        <div className="list" key={lab.labId}>
                            <p className="judul-materi">
                                {`${lab.moduleNumber}.${lab.labNumber}: ${lab.title}`}
                            </p>
                            <div className="call-to-action">
                                <Link to={`/addLabForm/edit/${id}/${lab.labId}`} className="edit-btn">
                                    <img src={editIcon} className='cta-btn' alt="edit"  />
                                </Link>
                                <button className="delete-btn" value={lab.labNumber}>
                                    <img src={deleteIcon} className='cta-btn' alt="delete" onClick={() => deleteLab(lab.moduleId, lab.labId)} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default ModulePage;