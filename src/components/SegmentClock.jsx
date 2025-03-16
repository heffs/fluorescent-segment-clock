import { useState, useEffect } from 'react';
import SevenSegmentDisplay from './SevenSegmentDisplay';

export default function SegmentClock() {
    const [time, setTime] = useState(new Date);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function timeDigit(ix) {
        if (ix < 2) {
            return time.getHours().toString().padStart(2, "0")[ix];
        } else if (ix < 4) {
            return time.getMinutes().toString().padStart(2, "0")[ix - 2];
        } else {
            return time.getSeconds().toString().padStart(2, "0")[ix - 4];
        }
    }
    return (
        <div className="clock-container"> 
            <div className="segment-clock">
                <SevenSegmentDisplay character={timeDigit(0)} height={100} width={100} digitWidth={60} />
                <SevenSegmentDisplay character={timeDigit(1)} height={100} width={100} digitWidth={60} />
                <svg className="segment-separator" width="20" height="100">
                    <defs>
                        <radialGradient id="segment-separator-grad" cx="50%" cy="50%" r="100%" fx="55%" fy="50%">
                            <stop offset="0%" stopColor="#fffefe" />
                            <stop offset="18%" stopColor="#fffefe" />
                            <stop offset="25%" stopColor="#fde577" />
                            <stop offset="33%" stopColor="#fc9b71" />
                            <stop offset="100%" stopColor="#ec0a16" />
                        </radialGradient>
                    </defs>
                    <circle cx="50%" cy="33%" r="7%" fill="url(#segment-separator-grad)" />
                    <circle cx="50%" cy="67%" r="7%" fill="url(#segment-separator-grad)" />
                </svg>
                <SevenSegmentDisplay character={timeDigit(2)} height={100} width={100} digitWidth={60} />
                <SevenSegmentDisplay character={timeDigit(3)} height={100} width={100} digitWidth={60} />
                <svg className="segment-separator" width="20" height="100">
                    <defs>
                        <radialGradient id="segment-separator-grad" cx="50%" cy="50%" r="100%" fx="55%" fy="50%">
                            <stop offset="0%" stopColor="#fffefe" />
                            <stop offset="18%" stopColor="#fffefe" />
                            <stop offset="25%" stopColor="#fde577" />
                            <stop offset="33%" stopColor="#fc9b71" />
                            <stop offset="100%" stopColor="#ec0a16" />
                        </radialGradient>
                    </defs>
                    <circle cx="50%" cy="33%" r="7%" fill="url(#segment-separator-grad)" />
                    <circle cx="50%" cy="67%" r="7%" fill="url(#segment-separator-grad)" />
                </svg>
                <SevenSegmentDisplay character={timeDigit(4)} height={100} width={100} digitWidth={60} />
                <SevenSegmentDisplay character={timeDigit(5)} height={100} width={100} digitWidth={60} />
            </div>
        </div>
    )
}