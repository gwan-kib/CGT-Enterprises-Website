export function getInitialActiveServiceIndex(serviceCount: number) {
  return serviceCount >= 2 ? 1 : 0
}

export function getVisibleServiceIndexes(
  serviceCount: number,
  activeIndex: number,
) {
  if (serviceCount <= 0) {
    return []
  }

  const normalizedActiveIndex =
    ((activeIndex % serviceCount) + serviceCount) % serviceCount
  const visibleCount = Math.min(4, serviceCount)

  if (visibleCount === 1) {
    return [normalizedActiveIndex]
  }

  return Array.from({ length: visibleCount }, (_, position) => {
    const offsetFromActive = position - 1

    return (
      (normalizedActiveIndex + offsetFromActive + serviceCount) % serviceCount
    )
  })
}

export function getWrappedServiceIndex(
  activeIndex: number,
  direction: 'next' | 'previous',
  serviceCount: number,
) {
  if (serviceCount <= 1) {
    return 0
  }

  const offset = direction === 'next' ? 1 : -1

  return (activeIndex + offset + serviceCount) % serviceCount
}
