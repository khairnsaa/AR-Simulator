import { useState } from "react";
import { createContext } from "react";

export const OutputWaveContext = createContext();

export const OutputWaveContextProvider = ({ children }) => {

    

    const draw = (frequency) => {
        // get values directly from form
        let Vp=1
        let fo= frequency
        let phase=0
        let Vmax=2
        let Tmax=0.001
        let N=2000
        fo=Number(fo);
        phase=Number(phase);
        Vmax=Number(Vmax);
        Tmax=Number(Tmax);
        N=Number(N);

        // define canvas
        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        if (canvas===null || !canvas.getContext) return;
        const ctx=canvas.getContext("2d");

        // fill canvas
        ctx.fillStyle="#dddddd";
        ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
        
        // define origin at plot center
        const axes={};
        axes.x0 = 0.5 + 0.5*canvas.width;  // x0, y0 place plot origin in middle of canvas
        axes.y0 = 0.5 + 0.5*canvas.height;
        
        // draw axes
        showAxes(ctx,axes);
        
        var x=[], y=[];  // x,y plotting variables
        let dt, tstart, tstop;             // time variables
        
        // define plot paramaters
        tstart=-Tmax;
        tstop=Tmax;
        dt = (tstop - tstart) / (N-1);				// time increment over N points
        axes.xscale = (canvas.width)/(2*Tmax); 	// x pix per s
        axes.yscale = (canvas.height)/(2*Vmax);    // y pix per V
        axes.N = N;
        
        
        // create function 
        for ( let i=0; i<N; i++) {
            x[i]=tstart + i*dt;
            y[i] = Vp*Math.sin(2*3.1415*fo*x[i] + phase*3.1415/180) ;
        }
        
        // display variables for debug, remove /* and */
        /*
        alert(   "N=" + N + "\n"
                + "dt=" + dt + "\n"
                + "tstart=" + tstart + "\n"
                + "tstop=" + tstop + "\n"    
                + "fo=" + fo + "\n"  
                + "x[50]=" + x[50] + "\n"        );
        */
        
        // plot function
        GraphArray(ctx,axes,x,y,"rgb(0,0,256)",2); 
    
    }
    
    ///////////////////////////////////////////////////////
    const GraphArray = (ctx,axes,x,y,color,thick) => {

        let i, x0, y0, xscale, yscale, xp, yp;
        
        x0=axes.x0;  
        y0=axes.y0;
        xscale=axes.xscale;  
        yscale=axes.yscale;

        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;

        for (i=0; i<axes.N; i++) {
            // translate actual x,y to plot xp,yp
            xp = x0 + x[i]*xscale;
            yp = y0 - y[i]*yscale;
            
            // draw ine to next point
            if (i==0) ctx.moveTo( xp, yp );
            else ctx.lineTo( xp, yp );
        }
        
        ctx.stroke();
    }
    //////////////////////////////////////////////////////
    const showAxes = (ctx,axes) => {
        const x0=axes.x0, w=ctx.canvas.width;
        const y0=axes.y0, h=ctx.canvas.height;
        
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)"; 
        // X axis
        ctx.moveTo(0,y0);    
        ctx.lineTo(w,y0);  
        // Y axis
        ctx.moveTo(x0,0);    
        ctx.lineTo(x0,h);  
        ctx.stroke();
    
    }
    /////////////////////////////////////////////////////
    return (
        <OutputWaveContext.Provider value={{draw}}>
            {children}
        </OutputWaveContext.Provider>
    )
}