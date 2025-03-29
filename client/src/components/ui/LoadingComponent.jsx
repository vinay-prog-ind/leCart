import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingComponent({type="primary"}) {
    return (
        <div className={`${type}-loading`}>
            <DotLottieReact
                src="https://lottie.host/cfd35095-eb31-40d7-9252-041e572c861e/OoMGqgD6Kb.lottie"
                loop
                autoplay
                />
        </div>
    );
}
