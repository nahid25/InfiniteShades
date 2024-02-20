import { useMediaQuery } from "@chakra-ui/react";

export const useMediaQueryHook = () => {
    const [isMobileDevice] = useMediaQuery("(max-width:600px)");
    const [matchesSM] = useMediaQuery("(max-width:600px)");
    const [matchesMD] = useMediaQuery("(min-width:600px) and (max-width:1200px)");
    const [matchesLG] = useMediaQuery("(min-width:1200px)");


    const getCols = () => {
        if (matchesSM) {
            return 1
        } else if (matchesMD) {
            return 2
        } else if (matchesLG) {
            return 3;
        }
        return undefined
    }
    return { isMobileDevice, getCols }
}