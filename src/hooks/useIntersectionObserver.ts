import { useState, useEffect, RefObject } from 'react'

function useIntersectionObserver(
	elementRef: RefObject<Element>,
	{ threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit = {}
): IntersectionObserverEntry | undefined {
	const [entry, setEntry] = useState<IntersectionObserverEntry>()

	useEffect(() => {
		const node = elementRef.current
		if (!node) return

		const observer = new IntersectionObserver(([entry]) => setEntry(entry), { threshold, root, rootMargin })

		observer.observe(node)
		return () => observer.disconnect()
	}, [elementRef, threshold, root, rootMargin])

	return entry
}

export default useIntersectionObserver
