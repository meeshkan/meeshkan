import { useRouter } from 'next/router'
import Card from '../components/card'

const CardPage = () => {
	const router = useRouter()
	const {
		query: {
			title,
			tag,
		},
	} = router

	return (
		<Card
			title={String(title || '')}
			tag={String(tag || '')}
			width={process.env.CARD_WIDTH}
			height={process.env.CARD_HEIGHT}
		/>
	)
}

export default CardPage
