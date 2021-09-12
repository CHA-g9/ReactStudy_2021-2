import React, {useState} from "react";
import Try from "./try";

function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1){
        const chosen = candidate.splice(Math.random()*(9-i), 1)[0];
        array.push(chosen);
    }
    return array;
};

const NumberBaseball = () => {
    const [result, setResult] = useState("");
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onChangeInput = (e) => {
        console.log(answer);
        setValue(e.target.value);
    };
    
    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value == answer.join('')){
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result:'홈런!'}]
            });

            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10회 이상 틀렸으므로 실패입니다. 답은 ${this.state.answer.join(",")}입니다.`);

                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for (let i = 0; i < 4; i += 1){
                    if (answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                    setTries((prevTries) => {
                        return [...prevTries, {try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.`}]
                    });
                    setValue('');
                }
            }
        };

    };

    return (
        <>
            <h1>{value}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
            </form>
            <div>시도 횟수: {tries.length}</div>
            <ul>
                {tries.map((v, i)=> {
                    return (
                        <Try key = {`${i+1}차시도`} tryInfo = {v} />
                    );
                })}
            </ul>
        </>
    );
};
export default NumberBaseball_Hooks; // import로 불러서 쓰기