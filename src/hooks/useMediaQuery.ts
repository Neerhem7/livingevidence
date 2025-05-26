import { useState, useEffect } from "react";

const DEFAULT_MEDIA_QUERY = '(max-width: 768px)';

const useMediaQuery = (query: string = DEFAULT_MEDIA_QUERY): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        
        setMatches(media.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        media.addEventListener('change', listener);

        return () => {
            media.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;