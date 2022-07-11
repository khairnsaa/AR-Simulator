import { createContext } from "react";

export const OutputResponseContext = createContext()

export const OutputResponseProvider = ({children}) => {
    
    const responseLPF = (freq, fmin) => {
        const canvas = document.querySelector('#canvasResponse');
    
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for(let i = 0; i <= Math.floor(canvas.width /2); i++){
            canvasContext.beginPath();
            canvasContext.lineWidth = 3
            canvasContext.moveTo(0, canvas.height/3);
            canvasContext.lineTo(i, canvas.height/3);
            canvasContext.stroke();
            if(i === Math.floor(canvas.width/2)){
                // transition band
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i+50, canvas.height - 20);
                canvasContext.stroke();
                canvasContext.font = "15px Arial";
                const flow = `${fmin.toFixed(2)} Hz`
                canvasContext.fillText(flow, i + 50, canvas.height);
                // cutoff
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i, canvas.height - 20);
                canvasContext.setLineDash([5, 3])
                canvasContext.font = "15px Arial";
                const frequency = `${freq.toFixed(2)} Hz`
                canvasContext.fillText(frequency, i - 50, canvas.height);
                canvasContext.stroke();
            }
        }
    }
    
    const responseHPF = (fc, fmax) => {
        const canvas = document.querySelector('#canvasResponse');
    
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for(let i = 0; i <= Math.floor(canvas.width /2); i++){
            canvasContext.beginPath();
            canvasContext.lineWidth = 3
            canvasContext.moveTo(canvas.width / 2, canvas.height/3);
            canvasContext.lineTo(canvas.width, canvas.height/3);
            canvasContext.stroke();
            if(i === Math.floor(canvas.width/2)){
                // transition band
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i-50, canvas.height - 20);
                canvasContext.stroke();
                canvasContext.font = "20px Arial";
                const frequency = `${fmax.toFixed(1)} Hz`
                canvasContext.fillText(frequency, i - 150, canvas.height);
                // cutoff
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i, canvas.height - 20);
                canvasContext.setLineDash([5, 3])
                canvasContext.font = "20px Arial";
                const frequencyCutoff = `${fc.toFixed(1)} Hz`
                canvasContext.fillText(frequencyCutoff, i - 50, canvas.height);
                canvasContext.stroke();
            }
        }
    }
    const responseBPF = (fcl, fch, fmin, fmax) => {
        const canvas = document.querySelector('#canvasResponse');
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Draw the pass band line.
        canvasContext.beginPath();
        canvasContext.lineWidth = 3
        canvasContext.moveTo(canvas.width/4, canvas.height/3);
        canvasContext.lineTo(canvas.width/2 + canvas.width/4, canvas.height/3);
        canvasContext.stroke();

        // Draw the transition band low line.
        canvasContext.beginPath();
        canvasContext.moveTo((canvas.width/4), canvas.height/3);
        canvasContext.lineTo(canvas.width/6, canvas.height-20);
        canvasContext.stroke();
        canvasContext.font = "15px Arial";
        const frequencyLow = `${fmin.toFixed(1)} Hz`
        canvasContext.fillText(frequencyLow, (canvas.width/6-40), canvas.height);

        // Draw the transition band high line.
        canvasContext.beginPath();
        canvasContext.moveTo(canvas.width/2 + canvas.width/4, canvas.height/3);
        canvasContext.lineTo(canvas.width/2 + canvas.width/3, canvas.height-20);
        canvasContext.stroke();
        canvasContext.font = "15px Arial";
        const frequencyHigh = `${fmax.toFixed(1)} Hz`
        canvasContext.fillText(frequencyHigh, canvas.width/2 + canvas.width/3-10, canvas.height);

        // Draw the cutt off high line.
        canvasContext.beginPath();
        canvasContext.moveTo((canvas.width/2 + canvas.width/4), canvas.height/3);
        canvasContext.setLineDash([5, 4])
        canvasContext.lineTo(canvas.width/2+ canvas.width/4, canvas.height - 20);
        canvasContext.stroke();
        canvasContext.font = "15px Arial";
        const frequencyCutoffHigh = `${fch.toFixed(1)} Hz`
        canvasContext.fillText(frequencyCutoffHigh, canvas.width/2+canvas.width/4-50, canvas.height);

        
        // Draw the cutoff low line.
        canvasContext.beginPath();
        canvasContext.moveTo((canvas.width/4), canvas.height/3);
        canvasContext.setLineDash([5, 4])
        canvasContext.strokeStyle = '#000';
        canvasContext.lineTo((canvas.width/4), canvas.height - 20);
        canvasContext.stroke();
        canvasContext.font = "15px Arial";
        const frequencyCutoffLow = `${fcl.toFixed(1)} Hz`
        canvasContext.fillText(frequencyCutoffLow, (canvas.width/4), canvas.height);
    }

    const responseBSF = (fn) => {
        const canvas = document.querySelector('#canvasResponse');
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw the red line.
        canvasContext.beginPath();
        canvasContext.lineWidth = 3
        canvasContext.moveTo(canvas.width/2 + canvas.width / 6, canvas.height/3);
        canvasContext.lineTo(canvas.width, canvas.height/3);
        canvasContext.stroke();

        // Draw the red line.
        canvasContext.beginPath();
        canvasContext.lineWidth = 3
        canvasContext.moveTo(0, canvas.height/3);
        canvasContext.lineTo(canvas.width/3, canvas.height/3);
        canvasContext.stroke();

        // Draw the green line.
        canvasContext.beginPath();
        canvasContext.moveTo(canvas.width/3, canvas.height/3);
        canvasContext.lineTo((canvas.width/2), canvas.height-20);
        canvasContext.stroke();

        // green 2
        canvasContext.beginPath();
        canvasContext.moveTo(canvas.width/2 + canvas.width /6, canvas.height/3);
        canvasContext.lineTo((canvas.width/2), canvas.height - 20);
        canvasContext.stroke();

        // // Draw the blue line.
        canvasContext.beginPath();
        canvasContext.moveTo(canvas.width/2, canvas.height);;
        canvasContext.setLineDash([5, 3])
        canvasContext.lineTo(canvas.width/2, 400);
        canvasContext.font = "15px Arial";
        const fc = `${fn.toFixed(1)} Hz`
        canvasContext.fillText(fc, canvas.width/2, canvas.height);
    }

    const responseButterworth = () => {
        const canvas = document.querySelector('#canvasResponse');
    
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        for(let i = 0; i <= Math.floor(canvas.width /2); i++){
            canvasContext.beginPath();
            canvasContext.lineWidth = 3
            canvasContext.moveTo(0, canvas.height/3);
            canvasContext.lineTo(i, canvas.height/3);
            canvasContext.stroke();
            if(i === Math.floor(canvas.width/2)){
                // transition band
                canvasContext.beginPath();
                canvasContext.moveTo(i, canvas.height/3);
                canvasContext.lineTo(i+15, canvas.height - 20);
                canvasContext.stroke();
            }
        }
    }

    const responseChebychev = () => {
        const canvas = document.querySelector('#canvasResponse');
        const canvasContext=canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvasContext.beginPath();
        canvasContext.strokeStyle = '#f00';
        canvasContext.lineWidth = 3
        canvasContext.moveTo(0, canvas.height/3);
        canvasContext.bezierCurveTo(canvas.width/6, canvas.height/60+ canvas.height/4, canvas.height/10, canvas.height/3 + canvas.height/10, canvas.width/3, canvas.height/3 );
        canvasContext.bezierCurveTo(canvas.height/3, canvas.height/60 + canvas.width/4, canvas.height/4, canvas.height + canvas.height/2, canvas.width + canvas.width/2, canvas.height);
        canvasContext.stroke();
    }
    return (
        <OutputResponseContext.Provider value={{
            responseLPF, 
            responseHPF, 
            responseBPF, 
            responseBSF,
            responseButterworth,
            responseChebychev
        }}>
            {children}
        </OutputResponseContext.Provider>
    )
}