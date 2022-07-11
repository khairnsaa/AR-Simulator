import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Admin Pages
import AdminPanelLogin from './pages/AdminPage/AdminPanelLogin';
import AddArticleForm from './pages/AdminPage/AddArticleForm';
import Home from './pages/AdminPage/Home';
import ListArticle from './pages/AdminPage/ListArticle';
import ListModul from './pages/AdminPage/ListModul';
import AdminHomePage from './pages/AdminPage/AdminHomePage';
import ModulePage from './pages/AdminPage/ModulePage';
import AddTheoryForm from './pages/AdminPage/AddTheoryForm';
import AddLabForm from './pages/AdminPage/AddLabForm';

// AR PAGES
import ARPagesInfo from './pages/ARPage/ARPagesInfo';
import LoginRouter from "./LoginRouter";

const Router = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    <LoginRouter>
                        <AdminHomePage />
                    </LoginRouter>
                } />
                <Route path='/login' element={<AdminPanelLogin />} />
                <Route path='/addForm' element={<AddArticleForm />} />
                <Route exact path='/addForm/edit/:id' element={<AddArticleForm />} />
                <Route path='/addTheoryForm/:id' element={<AddTheoryForm />} />
                <Route exact path='/addTheoryForm/edit/:id/:theoryId' element={<AddTheoryForm />} />
                <Route path='/addLabForm/:id' element={<AddLabForm />} />
                <Route exact path='/addLabForm/edit/:id/:labId' element={<AddLabForm />} />
                <Route path='/listArtikel' element={<ListArticle />} />
                <Route path='/listModul' element={<ListModul />} />
                <Route path='/modul/:id' element={<ModulePage />} />

                {/* AR PAge */}
                <Route path='/ARApp/:modulId/:labId' element={<ARPagesInfo />} />
            </Routes>
        </BrowserRouter>
    );  
}

export default Router
