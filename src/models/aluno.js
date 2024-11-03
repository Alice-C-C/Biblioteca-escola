import db from "../config/db.js";

const Schema = db.Schema;

const AlunoSchema = new Schema({
    aluno: {
        type: String,
        required: true
    },

})

const Aluno = db.model("Aluno", AlunoSchema);
export default Aluno