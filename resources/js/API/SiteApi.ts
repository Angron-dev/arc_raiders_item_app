import axios from 'axios';

class SiteApi {
    static async fetchData(url: string) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            throw error;
        }
    }

    static getAllRarity() {
        return this.fetchData('/item_rarity');
    }

    static getAllFoundIn() {
        return this.fetchData('/found_in');
    }
    static getAllItemTypes() {
        return this.fetchData('/item_types');
    }
}

export default SiteApi;
