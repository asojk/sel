import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion } from 'motion/react'
import { useGesture } from '@use-gesture/react'
import { clients } from '../constants/clients'
import { ImageKeys } from '../assets/assets'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

export interface Client {
	name: string
	coordinates: [number, number]
	logo: ImageKeys
	url: string
	description: string
}

interface Position {
	coordinates: [number, number]
	zoom: number
}

interface MapChartProps {
	setActiveClient: (client: Client | null) => void
	setShowPopup: (show: boolean) => void
}

const MapChart: React.FC<MapChartProps> = ({ setActiveClient, setShowPopup }) => {
	const [position, setPosition] = useState<Position>({ coordinates: [-87, 38], zoom: 2 }) // Adjusted initial zoom
	const [isFullScreen, setIsFullScreen] = useState(false)
	const mapContainerRef = useRef<HTMLDivElement>(null)

	const handleZoomIn = useCallback(() => {
		if (position.zoom >= 4) return
		setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }))
	}, [position.zoom])

	const handleZoomOut = useCallback(() => {
		if (position.zoom <= 1) return
		setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }))
	}, [position.zoom])

	const handleMoveEnd = useCallback((position: Position) => {
		setPosition(position)
	}, [])

	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen)
		if (!isFullScreen) {
			mapContainerRef.current?.requestFullscreen()
		} else if (document.fullscreenElement) {
			document.exitFullscreen()
		}
	}

	useGesture(
		{
			onPinch: ({ offset: [d] }) => {
				setPosition((pos) => ({
					...pos,
					zoom: Math.min(Math.max(pos.zoom + d / 50, 1), 4),
				}))
			},
			onDrag: ({ movement: [mx, my] }) => {
				setPosition((pos) => ({
					...pos,
					coordinates: [pos.coordinates[0] - mx / 100 / pos.zoom, pos.coordinates[1] + my / 100 / pos.zoom],
				}))
			},
		},
		{
			target: mapContainerRef,
			eventOptions: { passive: false },
		}
	)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (mapContainerRef.current && !mapContainerRef.current.contains(event.target as Node)) {
				setShowPopup(false)
				setActiveClient(null)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [setActiveClient, setShowPopup])

	const calculateMarkerSize = (zoom: number) => {
		return Math.max(20 / zoom, 2) // Adjust marker size based on zoom
	}

	return (
		<div
			ref={mapContainerRef}
			className={`relative ${isFullScreen ? 'fixed inset-0 z-50' : 'h-full w-full'} bg-n-light dark:bg-n-dark`}>
			<ComposableMap projection="geoAlbersUsa" className="h-full w-full">
				<ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									fill="#D6D6DA"
									stroke="#FFFFFF"
									className="outline-none transition-colors duration-200 ease-in-out hover:fill-s-light focus:fill-s-light dark:fill-n-6 dark:stroke-n-9 dark:hover:fill-s"
								/>
							))
						}
					</Geographies>
					{clients.map((client) => (
						<Marker key={client.name} coordinates={client.coordinates}>
							<motion.circle
								r={calculateMarkerSize(position.zoom)}
								fill="#33B588"
								stroke="#fff"
								strokeWidth={2 / position.zoom}
								className="cursor-pointer"
								whileHover={{ scale: 1.5 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => {
									setActiveClient(client)
									setShowPopup(true)
								}}
								transition={{ duration: 0.15 }}
							/>
						</Marker>
					))}
				</ZoomableGroup>
			</ComposableMap>
			<div className="absolute right-4 top-4 flex flex-col space-y-2">
				<motion.button
					onClick={handleZoomIn}
					className="rounded border border-p-3 bg-p px-3 py-1 text-n-light shadow hover:bg-p-light focus:outline-none focus:ring-2 focus:ring-s"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					+
				</motion.button>
				<motion.button
					onClick={handleZoomOut}
					className="rounded border border-p-3 bg-p px-3 py-1 text-n-light shadow hover:bg-p-light focus:outline-none focus:ring-2 focus:ring-s"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					-
				</motion.button>
				<motion.button
					onClick={toggleFullScreen}
					className="rounded border border-p-3 bg-p px-3 py-1 text-n-light shadow hover:bg-p-light focus:outline-none focus:ring-2 focus:ring-s"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					{isFullScreen ? 'Exit' : 'Full'}
				</motion.button>
			</div>
		</div>
	)
}

export default MapChart
