import { useColorModeValue } from '@chakra-ui/react';

export const useColorFromNumber = (type = 'percentage') => {
    const cyan = useColorModeValue('cyan.500', 'cyan.400');
    const yellow = useColorModeValue('yellow.500', 'yellow.400');
    const red = useColorModeValue('red.500', 'red.400');

    return (value) => {
        let color;

        switch(type) {
            case 'decimal':
                if (value > 0) {
                    color = cyan;
                } else if (value < 0 && value > -1) {
                    color = yellow;
                } else {
                    color = red;
                }
                break;
            case 'percentage':
                if (value <= 50) {
                    color = red;
                } else if (value > 50 && value <= 75) {
                    color = yellow;
                } else {
                    color = cyan;
                }
                break;
        }

        return color;
    }
};
