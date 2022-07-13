import { useState } from 'react';
import { ResultCalc } from '../../App';
import './Form.css'

const Props = {
    onChangeTriangleSide: (side: string, sideValue: string) => void;
    onCalcTriangleSides: (result: ResultCalc) => void;
}


const Form = ({ onChangeTriangleSide, onCalcTriangleSides }: Props) => {
    const [aSide, setASide] = useState('');
    const [bSide, setBSide] = useState('');
    const [cSide, setCSide] = useState('');

    const handleOnChangeASide = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        (bSide === '' || cSide === '') && parseInt(inputValue) > 0 ? setASide(inputValue) : setASide('');
        onChangeTriangleSide('a', inputValue);
    }

    const handleOnChangeBSide = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        (aSide === '' || cSide === '') && parseInt(inputValue) > 0 ? setBSide(inputValue) : setBSide('');
        onChangeTriangleSide('b', inputValue);
    }

    const handleOnChangeCSide = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        (aSide === '' || bSide === '') && parseInt(inputValue) > 0 ? setCSide(inputValue) : setCSide('');
        onChangeTriangleSide('c', inputValue);
    }

    const setResultMessage = async (aSideInt: number, bSideInt: number, cSideInt: number) => {
        let success = false;
        let message = '';
        let aSideStr = '';
        let bSideStr = '';
        let cSideStr = '';

        if (isNaN(bSideInt) || isNaN(cSideInt)) {
            message = 'A hipotenusa é menor que um dos catetos... Certeza que não é um triângulo retângulo!';
        } else if (aSideInt === 0 && bSideInt === 0 && cSideInt === 0) {
            message = 'Com nenhum valor inserido não temos como tirar conclusões aqui, né?';
        } else {
            success = true;
            message = 'De fato, temos um triângulo retângulo aqui. Boa, Pitágoras!';
            aSideStr = aSideInt.toFixed(2).replace('.00', '');
            bSideStr = bSideInt.toFixed(2).replace('.00', '');
            cSideStr = cSideInt.toFixed(2).replace('.00', '');
        }

        return { success, message, aSideStr, bSideStr, cSideStr };
    }

    const clearFormFields = async () => {
        setASide('');
        onChangeTriangleSide('a', '');
        setBSide('');
        onChangeTriangleSide('b', '');
        setCSide('');
        onChangeTriangleSide('c', '');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let aSideInt = parseFloat(aSide ? aSide : '0');
        let bSideInt = parseFloat(bSide ? bSide : '0');
        let cSideInt = parseFloat(cSide ? cSide : '0');
        let result = {} as ResultCalc;

        if (aSideInt === 0) {
            aSideInt = Math.sqrt(Math.pow(bSideInt, 2) + Math.pow(cSideInt, 2));
        } else if (bSideInt === 0) {
            bSideInt = Math.sqrt(Math.pow(aSideInt, 2) - Math.pow(cSideInt, 2));
        } else if (cSideInt === 0) {
            cSideInt = Math.sqrt(Math.pow(aSideInt, 2) - Math.pow(bSideInt, 2));
        }

        result = await setResultMessage(aSideInt, bSideInt, cSideInt);
        if (result.success) await clearFormFields();
        onCalcTriangleSides(result);
    }

    return (
        <div className="form-container">
            <div className="form-content">

                <h2>Teorema de Pitágoras</h2>
                <p>Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.</p>
                <form id="form-triangle" onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="a-side-input">a:</label>
                        <input
                            value={aSide}
                            onChange={handleOnChangeASide}
                            type="number"
                            min="1"
                            name="a-side-input"
                            id="a-side-input"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="b-side-input">b:</label>
                        <input
                            value={bSide}
                            onChange={handleOnChangeBSide}
                            type="number"
                            min="1"
                            name="b-side-input"
                            id="b-side-input"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="c-side-input">c:</label>
                        <input
                            value={cSide}
                            onChange={handleOnChangeCSide}
                            type="number"
                            min="1"
                            name="c-side-input"
                            id="c-side-input"
                        />
                    </div>

                    <div className="input-group">
                        <button form="form-triangle">Calcular</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default Form;