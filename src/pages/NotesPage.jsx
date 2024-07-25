import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc ,getDoc } from "firebase/firestore";
import Profile from "../components/Profile";
import GoogleAuth from "../components/GoogleAuth";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(user){
            getNotes()
        }
    }, []);


    const getNotes = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const data = docSnap.data();

        setNotes(data.notes);
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    };

    return (
        <div>
            {user ? <Profile user={user}/> : <GoogleAuth />}
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))}
        </div>
    );
};

export default NotesPage;