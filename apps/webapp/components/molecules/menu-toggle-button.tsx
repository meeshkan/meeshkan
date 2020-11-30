import { Button } from '@chakra-ui/react';
import MenuIconPath from '../atoms/menu-icon-path';

type MenuToggleButtonProps = {
	toggle: (i?: number) => void;
};

const MenuToggleButton = ({ toggle }: MenuToggleButtonProps) => (
	<Button
		onClick={() => toggle()}
		size="sm"
		display={['inline', 'inline', 'inline', 'none']}
		variant="ghost"
	>
		<svg height="19" viewBox="0 0 21.5 19" width="21.5">
			<MenuIconPath
				variants={{
					closed: { d: 'M 2 2.5 L 20 2.5' },
					open: { d: 'M 3 16.5 L 17 2.5' },
				}}
			/>
			<MenuIconPath
				d="M 2 9.423 L 20 9.423"
				transition={{ duration: 0.1 }}
				variants={{
					closed: { opacity: 1 },
					open: { opacity: 0 },
				}}
			/>
			<MenuIconPath
				variants={{
					closed: { d: 'M 2 16.346 L 20 16.346' },
					open: { d: 'M 3 2.5 L 17 16.346' },
				}}
			/>
		</svg>
	</Button>
);

export default MenuToggleButton;
