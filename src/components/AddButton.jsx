import colors from "../assets/colors.json";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRef } from "react";
import Plus from "../icons/Plus";

const AddButton = ({notes, setNotes}) => {
    const startingPos = useRef(10);
 
    const user = JSON.parse(localStorage.getItem('user'));

    const noteId = String(notes.length + 1);

    const addNote = async () => {
        const docData = {
            $id: noteId,
            body: "",
            colors: "color-yellow",
            position: {
                x: startingPos.current,
                y: startingPos.current,
            },
        };

        startingPos.current += 10;
 
        await setDoc(doc(db, "users", user.uid, "notes", noteId), docData);

        setNotes((prevState) => [docData, ...prevState]);
    };
 
    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;