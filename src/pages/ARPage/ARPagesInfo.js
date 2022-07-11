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
        const isArSessionSupported = navigator.xr && navigator.xr.isSessionSupported && await navigator.xr.isSessionSupported("immersive-ar");
        if (isArSessionSupported) activateAR(model)
        else alert('kamera hp kamu gak support AR :\'(')
    }

    return (
        <div>
            <div className="ar-container">
            {
                labList.length !== 0 ?
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

                    <div className="top-nav">
                        <button style={{"marginRight": "0.5rem"}} className="run-btn btn-edited ar-session-btn">
                            <img src={runIcon} alt="" />
                        </button>
                        <PopupInput 
                            drawAndCapture={drawAndCapture}   
                            indikatorValue = {indikatorValue}
                            labList = {labList}
                            id = {labId}
                            setIndikatorValue = {setIndikatorValue}
                        />   
                    </div>
                    <div className="bottom-nav">
                        <button className='rotate-btn rotate-left btn-edited ar-session-btn'>
                            <img src={rotateLeftIcon} alt="rotate left" />
                        </button>
                        <button className='place-btn btn-edited ar-session-btn'>
                            <img src={placeAR} alt="place" />
                        </button>
                        <button className='rotate-btn rotate-right btn-edited ar-session-btn'>
                            <img src={rotateRightIcon} alt="rotate right" />
                        </button>
                    </div>
                </div>

                {/* close btn */}
                <button className='close-btn btn-edited ar-session-btn'>
                    <img src={closeIcon} alt="close" />
                </button>
            </div>
        </div>
    );
}
 
export default ARPages;