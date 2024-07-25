import Trash from "../icons/Trash";
import { useState, useEffect, useRef } from "react";
import {setNewOffset, autoGrow, setZIndex, getColors} from '../utils.js'

const NoteCard = ({ note }) => {

    const colors = note.colors;
    const [position, setPositon] = useState(note.position);
    const body = note.body;

    const [colorHeader, colorBody, colorText] = getColors(colors);


    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);

    const mouseDown = (e) => {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e) => {
        setZIndex(cardRef.current);
        //1 - Calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        //2 - Update start position for next move.
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        //3 - Update card top and left position.
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPositon(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    return (
        <div
            className="card"
            style={{
                backgroundColor: colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            ref={cardRef}
        >
            <div
                className="card-header"
                style={{ backgroundColor: colorHeader }}
                onMouseDown = { mouseDown }
            >
                <Trash />
            </div>

             <div className="card-body">
                <textarea
                    style={{ color: colorText }}
                    defaultValue={body}
                    ref={textAreaRef}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                    }}
                ></textarea>
            </div>
        </div>
    )
};

export default NoteCard;