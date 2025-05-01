import { useDispatch, useSelector } from 'react-redux';
import { setStoreTheme, getStoreTheme } from '../store/actions/themeSlice';

const useStore = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state)=> state.theme)
	
    const getTheme = () => {
		return theme?.value
	}
    const setTheme = (data) => dispatch(setStoreTheme(data));

    return { getTheme, setTheme };
};

export default useStore;
