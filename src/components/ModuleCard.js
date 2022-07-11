import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../asset/icons/delete.svg'
import editIcon from '../asset/icons/edit.svg'
import { ModuleContext } from '../context/ModuleContext';

const ModuleCard = ({ number, title, id }) => {
    const navigate = useNavigate();

    const toModulePage = () => {
        navigate(`/modul/${id}`)
    }

    const {deleteModule, editModule} = useContext(ModuleContext)
    
    return (
        <div  className='list hover-list'>
            <p className="judul-artikel" style={{'width' : '100%'}} onClick={toModulePage}>
                {`Modul ${number} : ${title}`}
            </p>
            <div className="call-to-action" id={id}>
                <button onClick={e => editModule(e.target.parentElement.parentElement.id)} className="edit-btn">
                    <img src={editIcon} className='cta-btn' alt="edit"  />
                </button>
                <button className="delete-btn" onClick={e => deleteModule(e.target.parentElement.parentElement.id)}>
                    <img src={deleteIcon} className='cta-btn' alt="delete" />
                </button>
            </div>
        </div>
    );
}
 
export default ModuleCard;