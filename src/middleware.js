import indexRouter from './routes';
import roomMastersRouter from './routes/roomMaster.route';
export const routes = {
    '/': indexRouter,
	'/room-master': roomMastersRouter,
	// Tag to use
    /**
     * Developer Note
     * Kindly DO NOT DELETE "Tags Comments"
     * May Break Auto Generation Functionality
     */
};

