import { useState, useEffect } from "react";

const useMediaQuery = (query: string = '(max-width : 780px)'): boolean => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(()=>{
        const mediaQuery = window.matchMedia(query);

        const handledChange = () =>  setMatches(mediaQuery.matches);
        
        mediaQuery.addEventListener('change', handledChange);

        return () => mediaQuery.removeEventListener('change', handledChange);
        
    }, [query])
    return matches;
}

export default useMediaQuery;