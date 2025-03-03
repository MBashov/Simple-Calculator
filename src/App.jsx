import { useState } from 'react'
import './App.css'

function App() {

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleButtonClick = (e) => {
        const buttonValue = e.target.value;

        setError(false);

        if (
            (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') &&
            (value === '' || /[+\-*\/]$/.test(value))
        ) {
            return;
        }

        setValue(value + buttonValue);
    }

    const handleClear = () => {
        setValue('');
        setError(false);
    }

    const handleDelete = () => {
        setValue(value.slice(0, -1));
        setError(false);
    };

    const handleEquals = () => {

        try {
            if (value === '' || /[+\-*\/]$/.test(value)) {
                throw new Error('Invalid Expression');
            }

            // Handle division by zero
            if (value.includes('/0')) {
                throw new Error('Cannot divide by zero');
            }

            const result = eval(value);

            // If the result is a valid number, set the value
            if (!isNaN(result)) {
                setValue(result.toString());
            } else {
                throw new Error('Invalid Expression');
            }
        } catch (err) {
            setError(true);
            setValue('Error'); // Display error message
        }
    };

    return (
        <>
            <div className='container'>
                <div className='calculator'>
                    <form action="">
                        <div>
                            <input type="text" readOnly value={value} />
                        </div>
                        {error && <div className="error-message">Invalid Expression</div>}
                        <div>
                            <input type="button" value="AC" onClick={handleClear} />
                            <input type="button" value="DE" onClick={handleDelete} />
                            <input type="button" value="/" onClick={handleButtonClick} />
                        </div>
                        <div>
                            <input type="button" value="7" onClick={handleButtonClick} />
                            <input type="button" value="8" onClick={handleButtonClick} />
                            <input type="button" value="9" onClick={handleButtonClick} />
                            <input type="button" value="*" onClick={handleButtonClick} />
                        </div>
                        <div>
                            <input type="button" value="4" onClick={handleButtonClick} />
                            <input type="button" value="5" onClick={handleButtonClick} />
                            <input type="button" value="6" onClick={handleButtonClick} />
                            <input type="button" value="-" onClick={handleButtonClick} />
                        </div>
                        <div>
                            <input type="button" value="1" onClick={handleButtonClick} />
                            <input type="button" value="2" onClick={handleButtonClick} />
                            <input type="button" value="3" onClick={handleButtonClick} />
                            <input type="button" value="+" onClick={handleButtonClick} />
                        </div>
                        <div>
                            <input type="button" value="0" onClick={handleButtonClick} />
                            <input type="button" value="." onClick={handleButtonClick} />
                            <input type="button" value="=" onClick={handleEquals} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default App
