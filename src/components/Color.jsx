import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Color = ({ color, notes, setNotes, selectedNote }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const colorName = color.id;

    const changeColor = async () => {

        if(selectedNote === null){
            alert("메모를 선택해주세요");
            return
        }

        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: colorName,
            };
     
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            const collectionRef = doc(db, "users", user.uid, "notes", String(currentNoteIndex+1));

            // Set the "capital" field of the city 'DC'
            await updateDoc(collectionRef, {
                colors: colorName,
            });

        } catch (e){
            console.log(e);
        }
    };

    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;