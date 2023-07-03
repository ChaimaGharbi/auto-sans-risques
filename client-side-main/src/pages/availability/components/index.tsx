import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useCallback } from 'react'
import { useGetUser } from 'app/store/hooks'

const localizer = momentLocalizer(moment)

export default function AvailabilityCalendar({ events, onSlotSelect }) {
  const onSelectSlot = useCallback((selected: SlotInfo) => {
    const payload = {
      date: selected.start,
      start: Number(new Date(selected.start)),
      end: Number(new Date(selected.end)),
      startHour: new Date(selected.start).getHours(),
      endHour: new Date(selected.end).getHours(),
      dayNumber: new Date(selected.start).getDay(),
    }

    onSlotSelect(payload)
  }, [])

  const { me } = useGetUser()

  return (
    <Calendar
      localizer={localizer}
      events={events}
      views={{
        week: true,
      }}
      selectable
      onSelectSlot={onSelectSlot}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      defaultView="week"
      min={new Date(2017, 10, 0, 6, 0, 0)}
      max={new Date(2017, 10, 0, 20, 0, 0)}
      toolbar={me.data?.recurrentAvailability ? false : true}
    />
  )
}

const today = new Date()

// const events = [
//   {
//     allDay: false,
//     title: 'Entretien de John Doe',
//     start: today,
//     end: new Date(Number(today) + 3600000),
//   },
// ]
