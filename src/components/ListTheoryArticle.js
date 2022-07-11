import editIcon from '../asset/icons/edit.svg'
import deleteIcon from '../asset/icons/delete.svg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ModuleContext } from '../context/ModuleContext';

const ListTheoryArticle = ({ title, number }) => {
    const {deleteTheory, deleteLab} = useContext(ModuleContext)
    return (
        <div className="list">
            <p className="judul-materi">
                {title}
            </p>
            <div className="call-to-action">
                <Link to='/addForm' className="edit-btn">
                    <img src={editIcon} className='cta-btn' alt="edit"  />
                </Link>
                <button className="delete-btn"  value={number}>
                    <img src={deleteIcon} className='cta-btn' alt="delete" onClick={(e) => deleteTheory(e.target.parentElement.value)} />
                </button>
            </div>
        </div>
    );
}
 
export default ListTheoryArticle;