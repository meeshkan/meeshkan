import { Button } from '@chakra-ui/core'
import { motion } from 'framer-motion'

const Path = props => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="currentColor"
        strokeLinecap="round"
        {...props}
    />
)

const MenuToggleButton = ({ toggle }) => (
    <Button
        onClick={toggle}
        size="sm"
        display={['inline', 'none', 'none', 'none']}
        variant="ghost"
    >
        <svg
            height="19"
            viewBox="0 0 21.5 19"
            width="21.5"
        >
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                transition={{ duration: 0.1 }}
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </svg>
    </Button>
)

export default MenuToggleButton
