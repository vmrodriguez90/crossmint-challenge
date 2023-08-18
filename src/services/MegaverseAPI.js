import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class MegaverseAPI {
    constructor(candidateId) {
        this.candidateId = candidateId;
        this.requestQueue = [];
        this.isProcessingQueue = false;
        this.maxRetries = 3; // Maximum number of retries per request
    }

    async addToQueue(requestFunction, args) {
        this.requestQueue.push({ requestFunction, args });
        if (!this.isProcessingQueue) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.requestQueue.length === 0) {
            this.isProcessingQueue = false;
            return;
        }
        
        this.isProcessingQueue = true;
        const { requestFunction, args } = this.requestQueue.shift();
        let retries = 0;

        while (retries <= this.maxRetries) {
            try {
                await requestFunction.apply(this, args);
                break; // Break loop if request succeeds
            } catch (error) {
                console.error('Request error:', error.message);
                if (retries < this.maxRetries) {
                    console.log('Retrying...');
                    retries++;
                } else {
                    console.error('Max retries reached. Request failed.');
                    // Handle failure after max retries here
                    break;
                }
            }
        }

        setTimeout(() => this.processQueue(), 1000); // Delay between requests
    }

    async request(endpoint, method, data = {}) {
        const url = `${BASE_URL}${endpoint}`;
        console.log(`url: ${url}, method: ${method}, data: ${JSON.stringify(data)}`);
        const config = {
            method: method,
            url,
            data: { ...data, candidateId: this.candidateId },
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createShape(config) {
        return this.addToQueue(this.request, config);
    }

    async deleteShape(config) {
        return this.addToQueue(this.request, config);
    }
    
    async getGoalMap() {
        return await this.request(`/map/${this.candidateId}/goal`, 'GET');
    }

    async resetMap(matrixSize) {
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                this.addToQueue(this.deletePolyanet, [i, i]);
                this.addToQueue(this.deleteCometh, [i, i]);
                this.addToQueue(this.deleteSoloon, [i, i]);
            }
        }
    }


}

export default MegaverseAPI;
