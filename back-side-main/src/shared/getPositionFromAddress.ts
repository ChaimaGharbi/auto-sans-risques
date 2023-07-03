
import * as axios from 'axios';
export const  getPositionFromAddress = async (address: any)=> {
    
    try {
      const reponse = await axios.default.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAP_KEY}`
      );
      
      if (reponse.data.results.length === 0) {
        return undefined;
      } else {
        return reponse.data.results[0].geometry.location;
      }
    } catch (error) {
      
    }
  }