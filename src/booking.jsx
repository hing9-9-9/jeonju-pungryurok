import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * Booking context — any component can open the reservation sheet.
 *   const { openBooking } = useBooking();  openBooking('t2')
 */
const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [isOpen, setOpen] = useState(false)
  const [tierId, setTierId] = useState('t2')

  const openBooking = useCallback((id) => {
    if (id) setTierId(id)
    setOpen(true)
  }, [])
  const closeBooking = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, tierId, setTierId, openBooking, closeBooking }),
    [isOpen, tierId, openBooking, closeBooking]
  )
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
