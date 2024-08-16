import { useState, useEffect, useRef } from "react";
import {setNewOffset, autoGrow, setZIndex, getColors} from '../utils.js'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import Spinner from "../icons/Spinner.jsx";
import DeleteButton from "./DeleteButton.jsx";

const NoteCard = ({ note, setNotes, setSelectedNote }) => {

    const colors = note.colors;
    const [position, setPositon] = useState(note.position);
    const body = note.body;

    const [colorHeader, colorBody, colorText] = getColors(colors);

    const [saving, setSaving] = useState(false);

    const keyUpTimer = useRef(null);

    const handleKeyUp = async () => {
        //1 - Initiate "saving" state
        setSaving(true);
     
        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
     
        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };

    const user = JSON.parse(localStorage.getItem('user'));

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
     
            setZIndex(cardRef.current);
     
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;
     
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            setSelectedNote(note);
        }
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

        const newPosition = setNewOffset(cardRef.current); //{x,y}
        saveData("position", newPosition);
    };

    const saveData = async (key, value) => {
        const payload = { [key] : value };
        try {
            const docRef = doc(db, "users", user.uid, "notes", note.$id);

            await updateDoc(docRef, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
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
                <DeleteButton noteId={note.$id} setNotes={setNotes} />
                {
                    saving && (
                        <div className="card-saving">
                            <Spinner color={colors.colorText} />
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
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
                        setSelectedNote(note);
                    }}
                    onKeyUp={handleKeyUp}
                ></textarea>
            </div>
        </div>
    )
};

export default NoteCard;