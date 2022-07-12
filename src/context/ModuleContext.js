import { createContext, useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie"

export const ModuleContext = createContext();

export const ModuleContextProvider = ({ children }) => {
    
    const token = Cookies.get('token')

    // Module State
    const [moduleNum, setModuleNum] = useState(1)
    const [module, setModule] = useState({
        moduleNumber: moduleNum,
        moduleTitle: '',
    })
    const [moduleList, setModuleList] = useState([])

    // Theory State
    const [ theoryNum, setTheoryNum ] = useState(1)
    const [ theoryList, setTheoryList ] = useState([])
    const [ theory, setTheory ] = useState({
        theoryNumber: theoryNum,
        title: '',
    })
    const [theoryDescription, setTheoryDescription] = useState('')
    const [image, setImage] = useState(null)

    // Lab State
    const [ labNum, setLabNum ] = useState(1)
    const [ labList, setLabList ] = useState([])
    const [labModel, setlabModel] = useState(null)
    const [ lab, setLab ] = useState({
        labNumber: labNum,
        title: '',
    })
    
    // ---------- Module CRUD ----------
    const getModule = async () => {
        const result = await axios.get('https://ar-filter-frequency-app.herokuapp.com/api/module')
        const data = result.data.results
        setModuleList(data.map(modul => {
            return {
                moduleNumber: modul.moduleNumber,
                moduleTitle: modul.moduleTitle,
                modulId: modul.id,
            }
        }))
    }

    const getDetailModule = (modulId) => {
        // library axios digunakan untuk mengambil api dari link yang ada
        axios.get(`https://ar-filter-frequency-app.herokuapp.com/api/module/${modulId}`, 
        {headers: {"Authorization" : "Bearer "+ token, 'Access-Control-Allow-Origin': '*'}})
        .then(res => {
            const dataModul = res.data.results
            // setelah data dari API telah diambil maka dari data tersebut datanya akan disimpan sesuai variable masing - masing
            // apabila datanya adalah modul maka akan disimpan pada variabel module
            setModule(dataModul)
             // apabila datanya adalah teori / materi maka akan disimpan pada variabel theory
            setTheoryList(dataModul.theory.map(materi => {
                return {
                    theoryNumber: materi.theoryNumber,
                    title: materi.title,
                    description: materi.description,
                    image: materi.image,
                    theoryId: materi._id,
                    moduleNumber: materi.moduleNumber,
                    moduleTitle: materi.modulTitle,
                    moduleId: materi.moduleId,

                }
            }))
             // apabila datanya adalah lab maka akan disimpan pada variabel lab
            setLabList(dataModul.lab.map(lab => {
                return {
                    labNumber: lab.labNumber,
                    title: lab.title,
                    description: lab.description,
                    thumbnailAR: lab.thumbnailAR,
                    modelAR: lab.modelAR,
                    labId: lab._id,
                    moduleNumber: lab.moduleNumber,
                    moduleTitle: lab.modulTitle,
                    moduleId: lab.moduleId,

                }
            }))
        })
    }
    
    const checkModuleNumber = () => {
        moduleList.map(modul => {
            if(moduleNum === modul.moduleNumber) setModuleNum(modul.moduleNumber +1)
        })
    }
    
    const handleChangeModule = (e) => {
        setModule({
            ...module, 
            moduleNumber: moduleNum,
            [e.target.name]: e.target.value
        })
    }

    const addModule = () => {
        // library axios digunakan untuk membantu menambahkan materi dengan method post ke URL API yang tertulis
        axios.post('https://ar-filter-frequency-app.herokuapp.com/api/module/create', {
            moduleNumber: module.moduleNumber,
            title: module.moduleTitle,
        }, {headers: {"Authorization" : `Bearer ${token}`}}) //untuk menambahkan modul dibutuhkan bearer token
        .catch(err => console.log(err))
        setModuleNum(moduleNum + 1)
        setModule({moduleTitle: ''})
    }

    // get module value so it can be updated
    const editModule = async (modulId) => {
        const result = await axios.get(`https://ar-filter-frequency-app.herokuapp.com/api/module/${modulId}`, 
        {headers: {"Authorization" : "Bearer "+ token, 'Access-Control-Allow-Origin': '*'}})
        const data = result.data.results
        
        setModule({
            moduleTitle: data.moduleTitle,
            moduleNum: data.moduleNumber,
            modulId: data.id
        })
    }

    // updating module
    const updateModule = async(moduleId) => {
        axios.put(`https://ar-filter-frequency-app.herokuapp.com/api/module/${moduleId}/update`, {
            title: module.moduleTitle,
        }, {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
    }

    const deleteModule = (moduleId) => {
        axios.delete(`https://ar-filter-frequency-app.herokuapp.com/api/module/${moduleId}`,
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))
    }

    // ---------- Theory CRUD ----------
    const checkTheoryNumber = () => {
        if(module.theory.length === 0) setTheoryNum(1) 
        else if(module.theory.length > 0) module.theory.map(theory => setTheoryNum(theory.theoryNumber + 1))
    }

    const handleChangeTheory = (e) => {
        setTheory({
            ...theory,
            [e.target.name]: e.target.value
        })
    }

    const getDetailTheory = (theoryId) => {
        axios.get(`https://ar-filter-frequency-app.herokuapp.com/api/module/${theoryId}/get-theory`)
        .then(data => {
            let result = data.data.result
            setTheory({title: result.title})
            setTheoryDescription(result.description)
            setImage(result.image)
        })
    }

    // handling description for theory and lab
    const handleDescription = (desc) => {
        const str = desc.replace(/^\<p\>/,"").replace(/\<\/p\>$/,"");
        setTheoryDescription(str)
    }

    // library axios digunakan untuk membantu menambahkan materi dengan method post ke URL API yang tertulis
    const addTheory = (moduleId, modulNumber, modulTitle) => {
        // http://localhost:8000/api/module/:moduleId/create-theory
        const data = new FormData()
        data.append("theoryNumber", theoryNum)
        data.append("title", theory.title)
        data.append("description", theoryDescription)
        data.append("moduleNumber", modulNumber)
        data.append("moduleTitle", modulTitle)
        data.append("image", image, image.name)
        axios.patch(`https://ar-filter-frequency-app.herokuapp.com/api/module/${moduleId}/create-theory`, data,
        {headers: {"Authorization" : `Bearer ${token}`}}) //untuk menambahkan materi dibutuhkan bearer token
        .catch(err => console.log(err))

        setTheory({title: '',})
        setTheoryDescription('')
        setImage(null)
    }

    // updateTheory
    // api/module/theoryId/update-theory
    const updateTheory = async(theoryId) => {
        const data = new FormData()
        data.append("title", theory.title)
        data.append("description", theoryDescription)
        data.append("image", image, image.name)
        axios.patch(`https://ar-filter-frequency-app.herokuapp.com/api/module/${theoryId}/update-theory`, data,
        {headers: {"Authorization" : `Bearer ${token}`}})
        .catch(err => console.log(err))

        setTheory({title: '',})
        setTheoryDescription('')
        setImage(null)
    }


    const deleteTheory = (moduleId, theoryId) => {
        // api/module/:id/:theoryId/delete-theory
        console.log(token)
        axios.patch(`https://ar-filter-frequency-app.herokuapp.com/api/module/${moduleId}/${theoryId}/delete-theory`, {}, {
            headers: {"authorization": `Bearer ${token}`}
        }).catch(err => console.log(err))
    }

    const handleImage = (e) => setImage(e.target.files[0])
    
    // ---------- Lab CRUD ----------
    const checkLabNumber = () => {
        if(module.lab.length === 0) setLabNum(1)
        else if(module.lab.length > 0) module.lab.map(lab => setLabNum(lab.labNumber + 1))
   }

    const handleChangeLab = (e) => {
        setLab({
            ...lab, 
            labNumber: labNum,
            [e.target.name]: e.target.value
        })
    }
    const handleModel = (e) => setlabModel(e.target.files[0])

    const getDetailLab = (labId) => {
        axios.get(`https://ar-filter-frequency-app.herokuapp.com/api/module/${labId}/get-lab`)
        .then(data => {
            let result = data.data.result
            setLab({title: result.title})
            setTheoryDescription(result.description)
            setImage(result.image)
        })
    }

    const addLab = (moduleId, modulNumber, modulTitle) => {
        // http://localhost:8000/api/module/:moduleId/create-lab
        const data = new FormData()
        data.append("labNumber", labNum)
        data.append("title", lab.title)
        data.append("description", theoryDescription)
        data.append("moduleNumber", modulNumber)
        data.append("moduleTitle", modulTitle)
        data.append("thumbnail", image, image.name)
        data.append("model", labModel, labModel.name)
        axios.patch(`https://ar-filter-frequency-app.herokuapp.com/api/module/${moduleId}/create-lab`, data,
        {headers: {"Authorization" : `Bearer ${token}`, 'Access-Control-Allow-Origin': '*'}})
        .catch(err => console.log(err))
        setLabNum(labNum + 1)

        setLab({title: '',})
        setTheoryDescription('')
        setImage(null)
        setlabModel(null)
    }

    const updateLab = (labId) => {
        const data = new FormData()
        data.append("title", lab.title)
        data.append("description", theoryDescription)
        data.append("image", image, image.name)
        axios.patch(`https://ar-filter-frequency-app.herokuapp.com/api/module/${labId}/update-lab`, data,
        {headers: {"Authorization" : `Bearer ${token}`, 'Access-Control-Allow-Origin': '*'}})
        .catch(err => console.log(err))

        setLab({title: ''})
        setTheoryDescription('')
        setImage(null)
        setlabModel(null)
    }
    
    const deleteLab = (moduleId, labId) => {
        // untuk menghapus lab dibutuhkan 2 parameter yaitu id modul dimana lab itu berada dan id dari lab itu sendiri
        axios.patch(`https://ar-filter-frequency-app.herokuapp.com/api/module/${moduleId}/${labId}/delete-lab`, {}, {
            headers: {"authorization": `Bearer ${token}`}
        }).catch(err => console.log(err))
    }

    return (
        <ModuleContext.Provider value={{
                module, 
                setModule, 
                addModule,
                getModule,
                moduleList,
                handleChangeModule,
                deleteModule,
                getDetailModule,
                editModule,
                updateModule,
                theoryList,
                theory,
                image,
                theoryDescription,
                addTheory,
                handleChangeTheory,
                handleDescription,
                theoryDescription,
                updateTheory,
                getDetailTheory,
                deleteTheory,
                labList,
                addLab,
                lab,
                updateLab,
                handleChangeLab,
                getDetailLab,
                deleteLab,
                handleModel,
                handleImage,
                checkModuleNumber,
                checkTheoryNumber,
                checkLabNumber
            }}>
            {children}
        </ModuleContext.Provider>
    )
}