const Circles = () => {
    // Utility function for setting base circle styles
    // Removed Tailwind's opacity class here to control opacity precisely using the style prop for better subtlety.
    const baseStyle =
        "absolute rounded-full filter blur-3xl mix-blend-multiply pointer-events-none transition-opacity duration-1000";

    return (
        // Fixed container to cover the entire viewport
        <div className="fixed inset-0 overflow-hidden">
            {/* Container for the circles */}
            <div className="relative w-full h-full">
                {/* Circle 1: Largest and Subtlest Purple (Top-Left Bias) */}
                <div
                    className={`${baseStyle} bg-purple-300 w-[700px] h-[700px]`}
                    style={{
                        // Anchor point is at 33% from top/left. This keeps it away from the absolute corner.
                        top: "33%",
                        left: "33%",
                        // Shift up and left gently to bias the cluster towards the top-left of the middle
                        transform: "translate(-40%, -40%)",
                        // Very low opacity for subtle effect
                        opacity: 0.15,
                    }}
                ></div>

                {/* Circle 2: Medium size, Violet color (Central Bias) */}
                <div
                    className={`${baseStyle} bg-indigo-200 w-[500px] h-[500px]`}
                    style={{
                        // Anchor point slightly further right/down
                        top: "45%",
                        left: "45%",
                        // Gentle shift
                        transform: "translate(-30%, -30%)",
                        opacity: 0.1,
                    }}
                ></div>

                {/* Circle 3: Smallest, Fuschia color (Bottom-Right Bias relative to the cluster) */}
                <div
                    className={`${baseStyle} bg-fuchsia-300 w-[300px] h-[300px]`}
                    style={{
                        // Anchor point near the center of the screen
                        top: "55%",
                        left: "55%",
                        // Gentle shift
                        transform: "translate(-20%, -20%)",
                        opacity: 0.15,
                    }}
                ></div>
            </div>
        </div>
    );
};
