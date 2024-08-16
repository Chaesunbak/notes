import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Profile from "../components/Profile";
import GoogleAuth from "../components/GoogleAuth";
import Controls from "../components/Controls";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(user){
            getNotes()
        }
    }, []);


    const getNotes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users", user.uid, "notes"));
            let notes = [];
            querySnapshot.forEach((note) => {
                notes.push(note.data());
            });
            setNotes(notes);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {user ? <Profile user={user}/> : <GoogleAuth />}
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} setNotes={setNotes} setSelectedNote={setSelectedNote}/>
            ))}
            <Controls notes={notes} setNotes={setNotes} selectedNote={selectedNote} />
        </div>
    );
};

export default NotesPage;