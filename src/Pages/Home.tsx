import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";

interface Props {}

const Home: React.FC<Props> = () => {
    const isMobileView = useMediaQuery();

    return (
        <div className="container mt-3">
            {!isMobileView && <img src="/logo.png" alt="Logo" className="logo" />}
            <p>Home Page</p>
        </div>
    );
};

export default Home;