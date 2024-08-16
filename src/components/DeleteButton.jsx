import Trash from "../icons/Trash";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteButton = ({ noteId, setNotes }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const handleDelete = async (e) => {
        const confirmDelete = window.confirm("메모를 지우시겠습니까?");
        if (confirmDelete) {
            await deleteDoc(doc(db, "users", user.uid, "notes", noteId));
            setNotes((prevState) =>
                prevState.filter((note) => note.$id !== noteId)
            );
        }
    };

    return (
        <div id="delete-btn" onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;