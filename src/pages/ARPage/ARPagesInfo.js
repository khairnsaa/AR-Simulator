import '../../style/App.css';

import { useContext, useEffect, useState } from 'react';
import { ARContext } from '../../context/ARContext';
import { PreviewObject } from '../../context/PreviewObject';
import { ModuleContext } from '../../context/ModuleContext';
import { useParams } from 'react-router-dom';
import useCapture from '../../hooks/useCapture';
import useFetchAR from '../../hooks/useFetchAR';
import parse from 'html-react-parser';

// import icon
import closeIcon from '../../asset/icons/close.svg'
import placeAR from '../../asset/icons/place.svg'
import rotateLeftIcon from '../../asset/icons/rotate_right.svg'
import rotateRightIcon from '../../asset/icons/rotate_left.svg'
import runIcon from '../../asset/icons/run.svg'
import PopupInput from '../../components/PopupInput';

const ARPages = () => {
    let labTitle;
    const {modulId, labId} = useParams()
    const {activateAR} = useContext(ARContext)
    const {showObject} = useContext(PreviewObject)
    const { captureOutput, capturefrequency, captureResponse } = useCapture()
    const {labList} = useContext(ModuleContext)
    
    const [indikatorValue, setIndikatorValue] = useState({
        frequencyValue:500,
        resistorValue: 1000,
        kapasitorValue: 0.0000006,
        induktorValue: 0.47,
        resistorTwoValue: 600,
        kapasitorTwoValue: 0.0000001,
        rButterworth: 600,
        cButterworth: 100,
        lButterworth: 100,
        fcButterWorth: 1000
    })

    // eslint-disable-next-line
    if(labList.length !== 0) labList.map((lab) => { if(lab.labId === labId) labTitle = lab.title;})
    const {checkLab} = useFetchAR(modulId, labTitle, indikatorValue)

    useEffect(() => {
        drawAndCapture()
        // eslint-disable-next-line
        if(labList.length !== 0) labList.map(lab => {
            if(lab.labId === labId) showObject(lab.modelAR)
        })
    })

    const drawAndCapture = () => {
        checkLab()
        setTimeout(() => { 
            captureOutput()
            capturefrequency()
            captureResponse()
        }, [500] )
    }
    
    const checkARSupport = async (model) => {
        // apabila browser yang digunakan memiliki fungsi navigator.xr dan apabila fungsi itu disupport maka akan terbuka sesi AR, apabila sesi AR tidak di support akan mendapatkan pemberitahuan.
        const isArSessionSupported = navigator.xr && navigator.xr.isSessionSupported && await navigator.xr.isSessionSupported("immersive-ar");
        if (isArSessionSupported) activateAR(model)
        else alert('kamera hp kamu gak support AR :\'(')
    }

    return (
        <div>
            <div className="ar-container">
            {
                // Apabila variabel lablist memiliki jumlah lebih dari 1 maka akan ditampilkan data dari lablist
                labList.length !== 0 ?
                // apabila id lab yang dibuka pengguna sama dengan id lab yang tersedia dari API maka data yang memiliki Id tersebut akan ditampilkan
                labList.map(lab => lab.labId === labId ? (
                    <div className="ar-content">
                        <h1>{lab.title}</h1>
                        <section className="lab-description">
                            {parse(lab.description)}
                        </section>
                        <div className="show-object">
                            <h2>susunan rangkaian pada lab ini</h2>
                            <div className="canvas-container"></div>
                        </div>
                        {/* apabila pengguna memencet tombol Start AR maka perangkat yang digunakan pengguna akan di cek terlebih dahulu apakah sudah support untuk AR atau belum */}
                        <button onClick={() => checkARSupport(lab.modelAR)} className='ar-btn btn-edited'>Start AR</button>
                    </div>
                ) : <></>)
                : <div id='loading'></div>
            }
            </div>
            <div className="output-container">
                <div className="output-wave"><canvas id="canvas"></canvas></div>
                <div className="output-response"><canvas id="canvasResponse"></canvas></div>
                <div className="frequency-counter">{indikatorValue.frequencyValue} Hz</div>
            </div>

            {/* inside AR session */}
            <div id="stabilization"></div>
            <div className="widgets">
                {/* Navigation */}
                <div className="navigation">
                    {/* barisan pertama dari kumpulan widget berisi dari 2 buah tombol */}
                    <div className="top-nav">
                        {/* tombol run untuk menjalankan rangkaian filter */}
                        <button style={{"marginRight": "0.5rem"}} className="run-btn btn-edited ar-session-btn">
                            <img src={runIcon} alt="" />
                        </button>
                        {/* popup akan tampul pada saat user memencet tombol Hz yang berfungsi untuk mengganti = ganti parameter yang tersedia */}
                        <PopupInput 
                            drawAndCapture={drawAndCapture}   
                            indikatorValue = {indikatorValue}
                            labList = {labList}
                            id = {labId}
                            setIndikatorValue = {setIndikatorValue}
                        />   
                    </div>
                    {/* barisan kedua dari kumpulan widget berisi dari 3 buah tombol */}
                    <div className="bottom-nav">
                        {/* tombol rotate left untuk memutar rangkaian kearah kiri */}
                        <button className='rotate-btn rotate-left btn-edited ar-session-btn'>
                            <img src={rotateLeftIcon} alt="rotate left" />
                        </button>
                        {/* tombol place untuk meletakkan rangkaian di tempat yang diinginkan */}
                        <button className='place-btn btn-edited ar-session-btn'>
                            <img src={placeAR} alt="place" />
                        </button>
                        {/* tombol rotate right untuk memutar rangkaian kearah kanan */}
                        <button className='rotate-btn rotate-right btn-edited ar-session-btn'>
                            <img src={rotateRightIcon} alt="rotate right" />
                        </button>
                    </div>
                </div>

                {/* close btn untuk menutup sesi AR*/}
                <button className='close-btn btn-edited ar-session-btn'>
                    <img src={closeIcon} alt="close" />
                </button>
            </div>
        </div>
    );
}
 
export default ARPages;