import Container from 'app/shared/components/Container'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import Calendar from './components'
import Switch from 'react-switch'
import { useState } from 'react'
import { Toggle } from './components/Toggle'
import { useAvailability } from 'app/store/hooks'

function createEvents(data) {
  return data.map(d => ({
    allDay: false,
    title: '',
    start: new Date(d.start),
    end: new Date(d.end),
  }))
}

const OngoingMissions = () => {
  const {
    data,
    repos,
    recurrent,
    loading,
    setRepos,
    setRecurrent,
    resetAvailability,
    createAvailability,
  } = useAvailability()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <div className="py-20">
        <div className="py-4">
          <Breadcrumb
            path={[
              {
                label: 'Accueil',
                path: '',
              },
              {
                label: 'Ma disponibilté',
                path: '/availability',
              },
            ]}
          />
        </div>

        <div className="col-span-2 bg-white  rounded-sm pb-10">
          <div className="uppercase bg-primary p-4 lg:px-6 md:px-6 block  text-white font-medium ">
            Ma disponibilté
          </div>

          <Container>
            <div className="">
              <div className="flex items-center justify-between w-full py-4 space-x-4">
                <button
                  className="button"
                  disabled={resetAvailability.loading}
                  onClick={resetAvailability.resetAvailability}
                >
                  Reinitialiser
                </button>
                <div className="flex-1"></div>
                <Toggle
                  value={repos}
                  label="Repos"
                  onChange={setRepos.setRepos}
                  disabled={loading || setRepos.loading}
                />
                <Toggle
                  value={recurrent}
                  label="Récurrent"
                  onChange={setRecurrent.setRecurrent}
                  disabled={loading || setRecurrent.loading}
                />
              </div>
              <div className="p-10">
                <Calendar
                  events={createEvents(data || [])}
                  onSlotSelect={createAvailability.createAvailability}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default OngoingMissions
