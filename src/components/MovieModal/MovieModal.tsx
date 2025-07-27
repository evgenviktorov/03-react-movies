import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import css from './MovieModal.module.css'

interface MovieModalProps {
	onClose: () => void
	backdropPath: string
	title: string
	overview: string
	releaseDate: string
	voteAverage: number
}

export default function MovieModal({
	onClose,
	backdropPath,
	title,
	overview,
	releaseDate,
	voteAverage,
}: MovieModalProps) {
	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [onClose])

	return createPortal(
		<div
			className={css.backdrop}
			role='dialog'
			aria-modal='true'
			onClick={handleBackdropClick}
		>
			<div className={css.modal}>
				<button
					className={css.closeButton}
					onClick={onClose}
					aria-label='Close modal'
				>
					&times;
				</button>
				<img
					src={`https://image.tmdb.org/t/p/original${backdropPath}`}
					alt={title}
					className={css.image}
				/>
				<div className={css.content}>
					<h2>{title}</h2>
					<p>{overview}</p>
					<p>
						<strong>Release Date:</strong> {releaseDate}
					</p>
					<p>
						<strong>Rating:</strong> {voteAverage}/10
					</p>
				</div>
			</div>
		</div>,
		document.body
	)
}
