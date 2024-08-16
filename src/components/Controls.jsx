import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";

const Controls = ({notes, setNotes, selectedNote}) => {
    return (
        <div id="controls">
            <AddButton notes={notes} setNotes={setNotes} />
            {colors.map((color) => (
                <Color key={color.id} color={color} notes={notes} setNotes={setNotes} selectedNote={selectedNote} />
            ))}
        </div>
    );
};

export default Controls;