import axios from '@/core/axios';
import authModel from './auth';

export default {
    auth: authModel(axios),
};
