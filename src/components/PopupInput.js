import Popup from 'reactjs-popup';

const PopupInput = ({drawAndCapture, indikatorValue, labList, id, setIndikatorValue}) => {
   
    const handleSumbit = e => {
        e.preventDefault()
        drawAndCapture()
        setIndikatorValue({
            frequencyValue: indikatorValue.frequencyValue,
            resistorValue: indikatorValue.resistorValue,
            kapasitorValue: indikatorValue.kapasitorValue,
            induktorValue: indikatorValue.induktorValue,
            resistorTwoValue: indikatorValue.resistorTwoValue,
            kapasitorTwoValue: indikatorValue.kapasitorTwoValue,
            rButterworth: indikatorValue.rButterworth,
            cButterworth: indikatorValue.cButterworth,
            lButterworth: indikatorValue.lButterworth,
            fcButterWorth: indikatorValue.fcButterWorth
        })
        document.querySelector('.keterangan').innerHTML= `Parameter berhasil diubah!`
    }
     
    const handleRadio = (e) => {
        if(e.target.value === 'frekuensi') {
            document.querySelector('.input-freq').style.display = 'block'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
            document.querySelector('.input-fc').style.display = 'none'
        }
        else if(e.target.value === 'kapasitor') {
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'block')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
            document.querySelector('.input-fc').style.display = 'none'
        }
        else if(e.target.value === 'resistor') {
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'block')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
            document.querySelector('.input-fc').style.display = 'none'
        }
        else if(e.target.value === 'induktor') {
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'block'
            document.querySelector('.input-fc').style.display = 'none'
        }
        else if(e.target.value === 'fc') {
            document.querySelectorAll('.input-resistor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-freq').style.display = 'none'
            document.querySelectorAll('.input-kapasitor').forEach(el => el.style.display = 'none')
            document.querySelector('.input-induktor').style.display = 'none'
            document.querySelector('.input-fc').style.display = 'block'
        }
    }
    return ( 
        <Popup trigger={<button className="frequency-btn ar-session-btn btn-edited"><p>Hz</p></button>} modal>
            <form className="box-modal" onSubmit={handleSumbit}>
                <div className="input-menu">
                    <label htmlFor="indikator">Indikator: </label>
                    <select name="indikator" id="indikator" onChange={handleRadio}>
                        <option value="frekuensi">frekuensi</option>
                        <option value="resistor">Resistor</option>
                        {
                            labList.length !== 0 ?
                            labList.map(lab => lab.labId === id ? (
                                lab.title.toUpperCase().includes('RL') ? 
                                <option value="induktor">Induktor</option> :
                                lab.title.toUpperCase().includes('BUTTERWORTH') || lab.title.toUpperCase().includes('CHEBY') ?
                                <option value="fc">Fc</option> : <option value="kapasitor">Kapasitor</option>
                            ) : <></>) : <></>
                        }
                    </select>
                </div>
                <section className='input-frequency'>
                    <input 
                        type="number" 
                        step="any"
                        style={{"display": "block"}}
                        className='input-freq-form input-text input-freq'
                        placeholder='Frekuensi (Hz)'
                        onChange={(e) => indikatorValue.frequencyValue = e.target.value}
                    />
                    {
                        labList.length !== 0? 
                        labList.map(lab => lab.labId === id ?
                            lab.title.toUpperCase().includes('BAND PASS') ?
                            <>  
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-kapasitor' placeholder={'Kapasitor 1 (F)'}onChange={(e) => indikatorValue.kapasitorValue = e.target.value}/>
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-kapasitor' placeholder={'Kapasitor 2 (F)'} onChange={(e) => indikatorValue.kapasitorValue = e.target.value}/>
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor 1 (Ohm)' onChange={(e) => indikatorValue.resistorValue = e.target.value} />
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor 2 (Ohm)' onChange={(e) => indikatorValue.resistorValue = e.target.value} />
                            </> : 
                            lab.title.toUpperCase().includes('BUTTERWORTH') || lab.title.toUpperCase().includes('CHEBY') ?
                            <>
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor (Ohm)' onChange={(e) => indikatorValue.rButterworth = e.target.value} />
                            </> 
                            :
                            <>
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-kapasitor' placeholder={'Kapasitor (F)'} onChange={(e) => indikatorValue.kapasitorValue = e.target.value} />
                                <input type="number" step="any" style={{"display": "none"}} className='input-freq-form input-text input-resistor' placeholder='Resistor (Ohm)' onChange={(e) => indikatorValue.resistorValue = e.target.value} />
                            </> 
                            : <></>)
                        : <></>
                    }
                    <input 
                        type="number"
                        step="any"
                        style={{"display": "none"}}
                        className='input-freq-form input-text input-fc'
                        placeholder={'Frekuensi Cutoff (Hz)'}
                        onChange={(e) => indikatorValue.fcButterWorth = e.target.value}
                    />
                    <input 
                        type="number"
                        step="any"
                        style={{"display": "none"}}
                        className='input-freq-form input-text input-induktor'
                        placeholder={'Induktor (H)'}
                        onChange={(e) => indikatorValue.induktorValue = e.target.value}
                    />
                    <button className='change-freq-btn'>Ubah</button>
                </section>
                <section className="keterangan"></section>
            </form>
        </Popup> 
    );
}
 
export default PopupInput;