import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useCallback } from 'react'
import { useGetUser } from 'app/store/hooks'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import fr from 'date-fns/locale/fr'

const messages = {
  allDay: 'Tous les jours',
  previous: 'Précédent',
  next: 'Suivant',
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
}

const locales = {
  fr: fr,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export default function AvailabilityCalendar({
  events,
  onSlotSelect,
  onDoubleClick,
}) {
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

  const deleteTimeSlot = useCallback((event, e) => {
    console.log('Double-clicked on event:', event)
    onDoubleClick(event.id)
  }, [])

  const { me } = useGetUser()

  const formats = {
    weekdayFormat: (date, culture, localizer) => localizer.format(date, 'd', culture),
  }

  return (
    <Calendar
      localizer={localizer}
      culture="fr"
      events={events}
      views={{
        week: true,
      }}
      selectable
      onSelectSlot={onSelectSlot}
      onDoubleClickEvent={deleteTimeSlot}
      startAccessor="start"
      endAccessor="end"
      style={{ minHeight: 500, width: 'full' }}
      messages={messages}
      defaultView="week"
      min={new Date(2017, 10, 0, 6, 0, 0)}
      max={new Date(2017, 10, 0, 20, 0, 0)}
      toolbar={me.data?.recurrentAvailability ? false : true}
      formats={formats}
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

// const events = [
//   {
//     allDay: false,
//     title: 'Entretien de John Doe',
//     start: today,
//     end: new Date(Number(today) + 3600000),
//   },
// ]
