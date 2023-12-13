import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
 
export default function OAuth() {
    console.log('Not Ok')
    const dispatch = useDispatch();

    const handleClick = async() => {

        console.log('OK')

        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const res = await axios.post('/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            })
            dispatch(signInSuccess(res.data));

        } catch (error) {
            console.log('Could not login with Google', error);
        }
    }

    return (
        <button type='button' onClick={handleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-70'>
            Continue With Google
        </button>
    )
}
