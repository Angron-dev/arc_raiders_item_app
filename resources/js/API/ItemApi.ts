import axios from "axios";

class ItemApi {
    static getAllItems() {
        return axios.get('/items');
    }

}
