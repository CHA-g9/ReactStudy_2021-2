import React, { useRef, useState, useEffect, memo, useLayoutEffect } from "react";

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    바위 : 0, 
    가위 : 1,
    보 : -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();
    
    /* 리액트 사이클과 유사한 역할, 일대일 대응은 아님 */
    useEffect(() => {
        interval.current = setInterval(changeHand(), 100);
        return () => {
            //componentWillUnmount 역할 부분
            clearInterval(interval.current);
        }
        // 두 번째 인수 배열에 넣은 값이 바뀌면 useEffect 실행
        // 그러니까 여기는 이미지 코드 바뀔 떼마다 계속 바뀌는 것
        // 아예 안 넣으면 한번만 실행되어서 componentDidMount와 동일한 역할을 하는 것.
    }, [imgCoord]);
    // 이 친구는 화면이 바뀌고 나서 실행된다.

    //useLayoutEffect();
    // 화면이 리사이징되기 전에 발생 - 레이아웃의 변화를 감지하는 것

    const changeHand = () => {
        if (imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);          
        } else if (imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult("비겼습니다!");
        } else if  ([-1, 2]. includes(diff)) {
            setResult("WIN!");
            setScore((prevScore) => {prevScore + 1});
        } else {
            setResult("LOSE!");
            setScore((prevScore) => {prevScore - 1});
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand(), 100);
        }, 2000);
    };
    
    return (
        <>
            <div id = "computer" style= {{background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="rock" className = "btn" onClick = {onClickBtn('바위')}>바위</button>
                <button id="scissor" className = "btn" onClick = {onClickBtn('가위')}>가위</button>
                <button id="paper" className = "btn" onClick = {onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 스코어 : {score}점</div>
        </>
    );
    
}


export default RSP;