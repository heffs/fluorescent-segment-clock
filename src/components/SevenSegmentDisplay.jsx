import "./SevenSegmentDisplay.css";

// Props:
// character:string: 0-9, A-F
// activeSegments:number: 0-127
// digitHeight: number: the height of the digit
// digitWidth: number: the width of the digit
// height: number: the height of the entire component
// width: number: the width of the entire component
// segmentWidth: number: the width of each segment
// gap: number: gap between segments
// If character is empty, show the activeSegments
export default function SevenSegmentDisplay(props) {
    const height = props.height || 100;
    const width = props.width || 100;
    const digitHeight = props.digitHeight || height;
    const digitWidth = props.digitWidth || digitHeight * 0.8;
    const segmentWidth = props.segmentWidth || digitHeight * 0.1;
    const horizPad = (width - digitWidth) / 2;
    const vertPad = (height - digitHeight) / 2;
    const gap = props.gap || segmentWidth * 0.1;
    const sd = digitHeight * 0.02;

    const characterMap = {
        0: 63,
        1: 6,
        2: 91,
        3: 79,
        4: 102,
        5: 109,
        6: 125,
        7: 7,
        8: 127,
        9: 111,
        A: 119,
        B: 124,
        C: 57,
        D: 94,
        E: 121,
        F: 113,
    };

    // Determine which segments are active
    let activeSegments = [];
    if (props.character) {
        activeSegments = setActiveSegments(characterMap[props.character]);
    } else {
        activeSegments = setActiveSegments(props.activeSegments);
    }

    const inactiveColour = "#221d1c";

    const v1 = horizPad;
    const v2 = horizPad + segmentWidth / 2;
    const v4 = horizPad + digitWidth - segmentWidth;

    const h1 = vertPad;
    const h2 = vertPad + segmentWidth / 2;
    const h4 = vertPad + digitHeight / 2 - segmentWidth / 2;
    const h5 = vertPad + digitHeight / 2;
    const h7 = vertPad + digitHeight - segmentWidth;

    const sw = segmentWidth;
    const sw2 = segmentWidth / 2;
    const asw = digitWidth - segmentWidth - gap * 2;    // Actual segment width (for horizontal segments)

    const horizPoints = `${gap},${sw2} ${gap + sw2},0 ${gap + asw - sw2},0 ${gap + asw},${sw2} ${gap + asw - sw2}, ${sw} ${gap + sw2},${sw}`;

    const sh = (digitHeight - segmentWidth) / 2;    // Segment height (for vertical segments)
    const ash = sh - gap * 2;                       // Actual segment height
    const vertPoints = `${sw2},${gap} ${sw},${gap + sw2} ${sw},${gap + ash - sw2} ${sw2},${gap + ash} 0,${gap + ash - sw2} 0,${gap + sw2}`;


    function setActiveSegments(seg) {
        const segments = [];
        for (let i = 0; i < 7; i++) {
            segments.push((seg >> i) & 1);
        }
        return segments;
    }

    return (
        <div className="seven-segment-container" style={{ width: `${width}px`, height: `${height}px`, maxWidth: `${width}px`, maxHeight: `${height}px` }}>
            <svg className={`seven-segment__seg-1 seven-segment ${activeSegments[0] ? 'active-segment' : ''}`} style={{ left: `${v2}px`, top: `${h1}px` }} height={segmentWidth} width={digitWidth-segmentWidth}>

                {/* First svg contains defs for all the segments */}
                <defs>
                    <linearGradient
                        id="segment-horizGrad"
                        x1="0%"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                    >
                        <stop offset="0%" stopColor="#ec0a16" />
                        <stop offset="10%" stopColor="#fc9b71" />
                        <stop offset="20%" stopColor="#fde577" />
                        <stop offset="40%" stopColor="#fffefe" />
                        <stop offset="60%" stopColor="#fffefe" />
                        <stop offset="80%" stopColor="#fde577" />
                        <stop offset="90%" stopColor="#fc9b71" />
                        <stop offset="100%" stopColor="#ec0a16" />
                    </linearGradient>
                    <filter id="segment-blur" x="0" y="0">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={sd} />
                    </filter>
                    <mask id="segment-horizMask">
                        <polygon
                            points={horizPoints}
                            fill="white"
                        />
                    </mask>
                    <linearGradient
                        id="segment-vertGrad"
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#ec0a16" />
                        <stop offset="11%" stopColor="#fc9b71" />
                        <stop offset="22%" stopColor="#fde577" />
                        <stop offset="44%" stopColor="#fffefe" />
                        <stop offset="56%" stopColor="#fffefe" />
                        <stop offset="78%" stopColor="#fde577" />
                        <stop offset="89%" stopColor="#fc9b71" />
                        <stop offset="100%" stopColor="#ec0a16" />
                    </linearGradient>
                    <mask id="segment-vertMask">
                        <polygon
                            points={vertPoints}
                            fill="white"
                        />
                    </mask>

                </defs>
                <polygon points={horizPoints} fill={activeSegments[0] ? 'url(#segment-horizGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-horizMask)" />
            </svg>
            <svg className={`seven-segment__seg-2 seven-segment ${activeSegments[1] ? 'active-segment' : ''}`} style={{left:`${v4}px`, top:`${h2}px`}} height={(digitHeight-segmentWidth)/2} width={segmentWidth}>
                <polygon points={vertPoints} fill={activeSegments[1] ? 'url(#segment-vertGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-vertMask)"/>
            </svg>
            <svg className={`seven-segment__seg-3 seven-segment ${activeSegments[2] ? 'active-segment' : ''}`} style={{left:`${v4}px`, top:`${h5}px`}} height={(digitHeight-segmentWidth)/2} width={segmentWidth}>
                <polygon points={vertPoints} fill={activeSegments[2] ? 'url(#segment-vertGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-vertMask)"/>
            </svg>
            <svg className={`seven-segment__seg-4 seven-segment ${activeSegments[3] ? 'active-segment' : ''}`} style={{ left: `${v2}px`, top: `${h7}px` }} height={segmentWidth} width={digitWidth-segmentWidth}>
                <polygon points={horizPoints} fill={activeSegments[3] ? 'url(#segment-horizGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-horizMask)" />
            </svg>
            <svg className={`seven-segment__seg-5 seven-segment ${activeSegments[4] ? 'active-segment' : ''}`} style={{left:`${v1}px`, top:`${h5}px`}} height={(digitHeight-segmentWidth)/2} width={segmentWidth}>
                <polygon points={vertPoints} fill={activeSegments[4] ? 'url(#segment-vertGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-vertMask)"/>
            </svg>
            <svg className={`seven-segment__seg-6 seven-segment ${activeSegments[5] ? 'active-segment' : ''}`} style={{left:`${v1}px`, top:`${h2}px`}} height={(digitHeight-segmentWidth)/2} width={segmentWidth}>
                <polygon points={vertPoints} fill={activeSegments[5] ? 'url(#segment-vertGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-vertMask)"/>
            </svg>
            <svg className={`seven-segment__seg-7 seven-segment ${activeSegments[6] ? 'active-segment' : ''}`} style={{ left: `${v2}px`, top: `${h4}px` }} height={segmentWidth} width={digitWidth-segmentWidth}>
                <polygon points={horizPoints} fill={activeSegments[6] ? 'url(#segment-horizGrad)' : inactiveColour} filter="url(#segment-blur)" mask="url(#segment-horizMask)" />
            </svg>
        </div>
    );
}
