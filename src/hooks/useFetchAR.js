import { useContext } from 'react';
import useFormula from '../hooks/useFormula';
import { ModuleContext } from '../context/ModuleContext';
import { useEffect } from 'react';

const useFetchAR = (modulId, title, indikatorValue) => {

    const {fc, 
        LPFRCFormula, 
        HPFRCFormula, 
        LPFRLFormula, 
        HPFRLFormula, 
        BPFFormula, 
        BSFFormula,
        ButterworthFormula,
        ChebychevFormula
    } = useFormula()
    const {getDetailModule} = useContext(ModuleContext)

    useEffect(() => {getDetailModule(modulId)}, [])

    const checkLab = () => {
        if(title !== undefined){
            if(title.includes("LPF RC")) {
                LPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            } else if(title.includes("LPF RL")) {
                LPFRLFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.induktorValue)
                )
            } else if(title.includes("HPF RC")) {
                HPFRCFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            } else if(title.includes("HPF RL")) {
                HPFRLFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.induktorValue)
                )
            }  else if(title.includes("Band Pass")) {
                BPFFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.resistorTwoValue), 
                    parseFloat(indikatorValue.kapasitorValue), 
                    parseFloat(indikatorValue.kapasitorTwoValue),
                )
            } else if(title.includes("Band Stop")) {
                BSFFormula(
                    parseFloat(indikatorValue.frequencyValue), 
                    parseFloat(indikatorValue.resistorValue), 
                    parseFloat(indikatorValue.kapasitorValue)
                )
            } else if(title.toUpperCase().includes("BUTTERWORTH")) {
                ButterworthFormula(
                    parseFloat(indikatorValue.fcButterWorth),
                    parseFloat(indikatorValue.rButterworth),
                    parseFloat(indikatorValue.frequencyValue)
                )
            } else if(title.toUpperCase().includes("CHEBY")) {
                ChebychevFormula(
                    parseFloat(indikatorValue.fcButterWorth),
                    parseFloat(indikatorValue.rButterworth),
                    parseFloat(indikatorValue.frequencyValue)
                )
            }
        }

    }

    return{checkLab, fc};
}

export default useFetchAR;