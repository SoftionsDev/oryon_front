import { differenceInSeconds } from 'date-fns';
import { BACKEND_ROUTES, ENVIRONMENT } from '../../constants';

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match('rgba')) {
    let triplet = hex.slice(5).split(',').slice(0, -1).join(',');
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
  }
};

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}


export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}


export function getBackendRoutes () {
  console.log(ENVIRONMENT)
  console.log(BACKEND_ROUTES)
  return BACKEND_ROUTES[ENVIRONMENT];
}


export const handleGetInfo = async (getFunction, API_URL, SERVICE, transformObject, setState, setError) => {
  try {
      const initial_data = await getFunction(API_URL, SERVICE)
      const data = transformObject(initial_data)
      setState(data)
  } catch (error) {
      setError(true)
      console.log(error)
  }
}

export const handleDelete = async (deleteFunction, API_URL, SERVICE, id, setError) => {
  try {
      const response = await deleteFunction(API_URL, SERVICE, id)
      if (response.error) {
          setError(true)
          console.log(response.error)
      }
  } catch (error) {
      setError(true)
      console.log(error)
  }
}
