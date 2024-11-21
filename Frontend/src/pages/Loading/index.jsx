import styles from "./LoadingPage.module.scss";
import { useState, useEffect } from "react";

function LoadingPage() {
    const [raindrops, setRaindrops] = useState([]);

    useEffect(() => {
        const numberOfRaindrops = 500;
        const drops = [];
        for (let i = 0; i < numberOfRaindrops; i++) {
            const randomLeft = Math.random() * 100;
            const randomDuration = Math.random() * 1.5 + 0.5;
            const randomDelay = Math.random() * 1;
            const randomHeight = Math.random() * 20 + 1;

            drops.push({
                left: `${randomLeft}%`,
                duration: `${randomDuration}s`,
                delay: `${randomDelay}s`,
                height: `${randomHeight}px`,
            });
        }
        setRaindrops(drops);
    }, []);

    return (
        <div className={styles.rainContainer}>
            <div className={styles.loadingText}>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
            {raindrops.map((drop, index) => (
                <div
                    key={index}
                    className={styles.rain}
                    style={{
                        left: drop.left,
                        animationDuration: drop.duration,
                        animationDelay: drop.delay,
                        height: drop.height,
                    }}
                ></div>
            ))}
        </div>
    );
}

export default LoadingPage;
