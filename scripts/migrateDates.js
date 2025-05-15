import 'dotenv/config';
import mongoose from 'mongoose';
import Emprestimo from '../src/models/emprestimo.js';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
            `@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}` +
            `?retryWrites=true&w=majority`;

