import { createContext, useState } from "react";
import * as THREE from 'three'
import { GLTFLoader } from '../Loaders/GLTFLoader'
import { OrbitControls } from "../controller/OrbitControls";

export const ARContext = createContext();

export const ARContextProvider = ({ children }) => {

    const { XRWebGLLayer } = window;
    let session, renderer, camera;
    let reticle, currentModel;
    let imageMaterialOutput, imageMaterialFrequency, imageMaterialResponse;
    const [stabilized, setStabilized] = useState(false)

    const activateAR = async (filterModel) => {

        // create canvas, camera, renderer, scene
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl', {xrCompatible: true})
        const scene = new THREE.Scene();

        document.querySelector('.ar-container').classList.add('ar')
        document.querySelector('.widgets').classList.add('ar')
        document.querySelector('#stabilization').classList.add('ar')
        
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            preserveDrawingBuffer: true,
            canvas: canvas,
            context: gl
        })
        renderer.autoClear = false;
        renderer.outputEncoding = THREE.sRGBEncoding;

        camera  = new THREE.PerspectiveCamera()
        camera.matrixAutoUpdate = false;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10,15,10);
        scene.add(light);

        // controller for rotating object        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set(0, 0, -0.2);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // create new AR session;
        session = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test', 'dom-overlay'],
            domOverlay: {root: document.body}
        })
        session.updateRenderState({ baseLayer: new XRWebGLLayer(session, gl)})

        const referenceSpace = await session.requestReferenceSpace('local');
        const viewerSpace = await session.requestReferenceSpace('viewer');
        const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

        // rendering image texture
        const imageTextureLoader = new THREE.TextureLoader();
        const addImage = () => {
            imageMaterialOutput = new THREE.MeshBasicMaterial({
                map: imageTextureLoader.load(sessionStorage.getItem('imageOutput')),
                side: THREE.DoubleSide
            })

            return imageMaterialOutput
        }
        const addImageFreq = () => {
            imageMaterialFrequency = new THREE.MeshBasicMaterial({
                map: imageTextureLoader.load(sessionStorage.getItem('imageFrequency')),
                side: THREE.DoubleSide
            })
            
            return imageMaterialFrequency
        }
        const addImageResponse = () => {
            imageMaterialResponse = new THREE.MeshBasicMaterial({
                map: imageTextureLoader.load(sessionStorage.getItem('imageResponse')),
                side: THREE.DoubleSide
            })
            
            return imageMaterialResponse
        }

        // load 3d model
        const loader = new GLTFLoader();
        loader.load("https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf" , gltf => {
            reticle = gltf.scene;
            reticle.visible = false;
            scene.add(reticle)
        })

        // loading AR Object
        const loadModel = () => {
            loader.load(filterModel, (gltf) => {
                currentModel = gltf.scene;
                currentModel.visible = false;
                currentModel.children.map(plane => {
                    if( plane.name === 'Plane_frequency001') {
                        plane.material = addImageFreq()
                        plane.material.visible = false
                    }
                    else if( plane.name === 'Plane_output001') {
                        plane.material = addImage()
                        plane.material.visible = false
                    }
                    else if( plane.name === "Plane_response001") {
                        plane.material = addImageResponse()
                        plane.material.visible = false
                    }
                })
                scene.add(currentModel)
            })
        }
        loadModel();

        // rotate object
        const rotateObject = degree => {
            if(currentModel && reticle.visible) currentModel.rotateOnWorldAxis(new THREE.Vector3(0,1,0), degree)
        }

        const onXRFrame = (time, frame) => {
            session.requestAnimationFrame(onXRFrame);

            gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer);

            const pose = frame.getViewerPose(referenceSpace);
            if(pose){
                const view = pose.views[0];
                const viewport = session.renderState.baseLayer.getViewport(view);

                renderer.setSize(viewport.width, viewport.height);

                camera.matrix.fromArray(view.transform.matrix);
                camera.projectionMatrix.fromArray(view.projectionMatrix);
                camera.updateMatrixWorld(true);
                
                const hitTestResults = frame.getHitTestResults(hitTestSource);

                if(stabilized === false && hitTestResults.length > 0){
                    setStabilized(true)
                    document.querySelector('#stabilization').classList.add('stabilized');
                }

                if (hitTestResults.length > 0 && reticle) {
                    const hitPose = hitTestResults[0].getPose(referenceSpace);
                    reticle.visible = true;
                    reticle.position.set(hitPose.transform.position.x, hitPose.transform.position.y, hitPose.transform.position.z)
                    reticle.updateMatrixWorld(true);
                }
                renderer.render(scene, camera);
            }
        }
        session.requestAnimationFrame(onXRFrame)
        controls.addEventListener('change', onXRFrame);

        // place AR object
        document.querySelector('.place-btn').addEventListener('click', () => {
            if(reticle.visible){
                currentModel.visible = true;
                currentModel.castShadow = true
                currentModel.position.setFromMatrixPosition(reticle.matrix);
            }
        })
 
        // rotate btn
        document.querySelector('.rotate-left').addEventListener('click', () => rotateObject(-0.1)) 
        document.querySelector('.rotate-right').addEventListener('click', () => rotateObject(0.1)) 

        
        // run btn
        document.querySelector('.run-btn').addEventListener('click', () => {
            currentModel.children.map(plane => {
                if( plane.name === 'Plane_frequency001') {
                    plane.material = addImageFreq()
                    plane.material.visible = true
                } else if( plane.name === 'Plane_output001') {
                    plane.material = addImage()
                    plane.material.visible = true
                } else if( plane.name === "Plane_response001") {
                    plane.material = addImageResponse()
                    plane.material.visible = true
                }
            })
            
        })

        document.querySelector('.close-btn').addEventListener('click', () => {
            session.end();
            document.querySelector('.ar-container').classList.remove('ar')
            document.querySelector('.widgets').classList.remove('ar')
            currentModel = null
            renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    return (
        <ARContext.Provider value={{ activateAR }}>
            { children }
        </ARContext.Provider>
    )
}